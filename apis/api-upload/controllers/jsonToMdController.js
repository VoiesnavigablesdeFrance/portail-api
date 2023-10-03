const fs = require('fs');
const path = require('path');

exports.changeJsonToMd = (req, res) => {
  const json = req.body
  const keywords = json.keywords.split(/\s+/)
  const themes = Array.isArray(json.themes) ? json.themes.join(' ') : json.themes.split(/\s+/);
  const partners = json.partners.split(/\s+/)
  const title = json.title.replace(/\s+/g, '');
  // Formatage de la date au format "jj/mm/aaaa"
  const dateParts = json.last_update.split('-');
  const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

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
title: ${json.title}
tagline: ${json.tagline}
is_open: ${json.is_open}
external_site: ${json.external_site}
partners: 
  ${partnersMarkdown}
producer: ${json.producer}
keywords: 
  ${keywordsMarkdown}
rate_limiting_resume: ${json.rate_limiting_resume}
rate_limiting_description: |
  ${json.rate_limiting_description}
themes: 
  ${themesMarkdown}
content_intro: |
  ${json.content_intro}
contact_link: ${json.contact_link}
doc_tech_link: ${json.doc_tech_link}
uptime: ${json.uptime}
visits_2019: ${json.visits_2019}
last_update: ${formattedDate}
---
    `;
    const nomFichierMd = `api-${title}.md`;
    const cheminFichierMd = path.join('./_data/api', nomFichierMd);
    fs.writeFile(cheminFichierMd, contenuMarkdown, (err) => {
      if (err) {
        return res.status(400).json({message : `Une erreur s'est produite lors de la création du fichier Markdown ${nomFichierMd} :`, error : err});
      } else {
        return res.status(200).json({message : `Le fichier Markdown ${nomFichierMd} a été créé avec succès.`});
      }
    }
    )
  }

  exports.deleteApi = (req, res) => {
    const nameFile = `api-${req.body.title.replace(/\s+/g, '')}.md`;
    const cheminFichierMd = path.join('./_data/api', nameFile);
  
    // Utilisez la méthode 'fs.unlink' pour supprimer le fichier.
    fs.unlink(cheminFichierMd, (err) => {
      if (err) {
        return res.status(400).json({
          message: `Une erreur s'est produite lors de la suppression du fichier Markdown ${nameFile} :`,
          error: err,
        });
      } else {
        return res.status(200).json({
          message: `Le fichier Markdown a été supprimé avec succès.`,
        });
      }
    });
  };
