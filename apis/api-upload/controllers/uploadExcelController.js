const exceljs = require('exceljs');
const fs = require('fs');
const path = require('path');

// Spécifiez le chemin du dossier contenant les fichiers Excel
const folderPath = path.join(__dirname, '../uploads');

// Fonction pour regrouper les informations
const groupInfo = (informations) => {
    return informations.reduce((result, current) => {
        const existingObject = result.find(obj =>
            Object.keys(obj).some(field => current[field] !== undefined)
        );

        if (existingObject) {
            // Fusionnez les valeurs des champs
            Object.keys(current).forEach(field => {
                if (current[field] && !existingObject[field]) {
                    existingObject[field] = current[field];
                } else if (current[field] && !existingObject[field].includes(current[field])) {
                    existingObject[field] += ` ${current[field]}`;
                }
            });
        } else {
            // Ajoutez l'objet courant au résultat
            result.push({ ...current });
        }

        return result;
    }, []);
};

// Lire la liste des fichiers dans le dossier
function fileExcel(cheminFichierExcel){
    fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('Erreur de lecture du dossier:', err);
        return;
    }

    // Filtrer les fichiers avec l'extension .xlsx
    const excelFiles = files.filter(file => path.extname(file) === '.xlsx');

    // Traiter chaque fichier Excel
    excelFiles.forEach(excelFile => {
        const excelFilePath = path.join(folderPath, excelFile);

        // Utiliser exceljs pour lire le fichier Excel
        const workbook = new exceljs.Workbook();
        workbook.xlsx.readFile(excelFilePath)
            .then(() => {
                // Créer un objet pour stocker les données par feuille
                const dataBySheet = {};

                // Convertir la feuille de calcul en tableau de JSON
                workbook.eachSheet((worksheet, sheetId) => {
                    const jsonDataWorksheet = [];
                    worksheet.eachRow((row, rowNumber) => {
                        if (rowNumber !== 1) { // Ignorer l'en-tête
                            const rowObject = {};
                            row.eachCell((cell, colNumber) => {
                                rowObject[worksheet.getCell(1, colNumber).value] = cell.value;
                            });
                            jsonDataWorksheet.push(rowObject);
                        }
                    });

                    // Ajouter les données au tableau correspondant à la feuille
                    if (!dataBySheet[worksheet.name]) {
                        dataBySheet[worksheet.name] = [];
                    }
                    dataBySheet[worksheet.name].push(...jsonDataWorksheet);
                });

                // Regrouper les informations
                const groupedInfo = groupInfo(dataBySheet.InformationsApi);
                dataBySheet.InformationsApi = groupedInfo;
                buildMdFile(dataBySheet);
                fs.unlink(cheminFichierExcel, (err) => {});
                
            })
            .catch((err) => {
                console.error(`Erreur lors de la lecture du fichier ${excelFile}:`, err);
            });
    });
    
})};

function buildMdFile(data){
  const keywords = Object(data.InformationsApi)[0]["Mots-clés"].split(/\s+/)
  const themes = Array.isArray(Object(data.InformationsApi)[0]["Thèmes de l'api"]) ? Object(data.InformationsApi)[0]["Thèmes de l'api"].join(' ') : Object(data.InformationsApi)[0]["Thèmes de l'api"].split(/\s+/);
  const partners = Object(data.InformationsApi)[0]["Partenaires de l'api"].split(/\s+/)
  const title = Object(data.InformationsApi)[0]["Titre de l'api"].normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
  const nbTableau = parseInt(Object(data.InformationsApi)[0]["Nombre tableaux"]);
  const nbImage = parseInt(Object(data.InformationsApi)[0]["Nombre images"]);
  
  // Formatage de la date au format "jj/mm/aaaa"
  //const dateParts = json.last_update.split('-');
  //const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

  const partnersMarkdown = partners.map(item => {
    if (item !== "") {
      return '- ' + item;
    } else {
      return ''; // Élément vide si la condition n'est pas satisfaite
    }
  }).filter(item => item !== '').join('\n  ');

  const keywordsMarkdown = keywords.map(item => {
    if (item !== "") {
      return '- ' + item;
    } else {
      return ''; // Élément vide si la condition n'est pas satisfaite
    }
  }).filter(item => item !== '').join('\n  ');

  const themesMarkdown = themes.map(item => {
    if (item !== "") {
      return '- ' + item;
    } else {
      return ''; // Élément vide si la condition n'est pas satisfaite
    }
  }).filter(item => item !== '').join('\n  ');
  const contenuMarkdown = `---
title: ${Object(data.InformationsApi)[0]["Titre de l'api"]}
tagline: ${Object(data.InformationsApi)[0]["Titre de l'api"]}
is_open: ${parseInt(Object(data.InformationsApi)[0]['Public(1) / Privé(0)'])}
external_site: 
partners: 
  ${partnersMarkdown}
producer: ${Object(data.InformationsApi)[0]["Équipe développeur de l'api"]}
keywords: 
  ${keywordsMarkdown}
rate_limiting_resume: ${Object(data.InformationsApi)[0]["Limite d'utilisation de l'api (titre)"]}
rate_limiting_description: |
  ${Object(data.InformationsApi)[0]["Limite d'utilisation de l'api (description)"]}
themes: 
  ${themesMarkdown}
content_intro: |
  ${Object(data.InformationsApi)[0]['Petite description']}
contact_link: ${Object(data.InformationsApi)[0]["Mail de l'équipe développeur"]}
doc_tech_link: ${Object(data.InformationsApi)[0]['Lien documentation']}
uptime: ${Object(data.InformationsApi)[0]["Disponibilité de l'api (en %)"]}
---
${data.Contenu.map(item => {
  for (let i = 1; i <= nbImage; i++) {
    if (item.Contenu === `image${i}`) {
      // Traitement spécifique pour 'image${i}'
      let buff = Buffer.from(item.null, 'base64');
    const randomName = `image_${Math.random().toString(36).substr(2, 9)}.jpg`;
    const dirPath = path.join(__dirname, '../../../public/images/divers', title);

    // Vérifie si le dossier existe, sinon le crée
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, randomName);
    fs.writeFileSync(filePath, buff);

    return `![test d'image](/images/divers/${title}/${randomName})`;
    }
  }

  for (let i = 1; i <= nbTableau; i++) {
    if (item.Contenu === `tableau${i}`) {
      // Traitement spécifique pour 'tableau${i}'
      if(data[`tableau${i}`]){
        return formatTableauToMarkdown(data[`tableau${i}`]);
      }
      
    }
  }

  // Traitement par défaut pour les autres types
  return item.Contenu;

}).join('\n\n')}
    `;
//visits_2019: ${json.visits_2019}
//last_update: ${formattedDate}

    const nomFichierMd = `api-${title}.md`;
    const cheminFichierMd = path.join('../../_data/api', nomFichierMd);
    fs.writeFile(cheminFichierMd, contenuMarkdown, (err) => {
      if (err) {
          console.error(`Une erreur s'est produite lors de la création du fichier Markdown ${nomFichierMd}:`, err);
          // Ici, vous pouvez appeler une fonction de rappel ou gérer l'erreur autrement
      } else {
          console.log(`Le fichier Markdown ${nomFichierMd} a été créé avec succès.`);
          // Ici, vous pouvez effectuer des actions supplémentaires en cas de succès
      }
  });
}

function formatTableauToMarkdown(tableauData) {
  let markdownTable = '';
  let headerAdded = false;

  tableauData.forEach((row, index) => {
    // Ajouter les en-têtes du tableau (une seule fois)
    if (!headerAdded) {
      markdownTable += `| ${Object.keys(row).join(' | ')} |\n`;
      markdownTable += `| ${Object.keys(row).map(() => '---').join(' | ')} |\n`;
      headerAdded = true;
    }
    // Ajouter les données de chaque ligne
    markdownTable += `| ${Object.values(row).join(' | ')} |\n`;
  });

  return markdownTable;
}



exports.createdMdFile = (req,res)=>{
  fileExcel(req);
}
