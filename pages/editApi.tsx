import React, { useEffect, useState } from 'react';
import Page from '../layouts/page';
import { HEADER_PAGE } from '../components';
import MyForm from '../uiComponents/form';
import  MultiChoice from '../uiComponents/multiChoice';
import router, { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const Editapi: React.FC = () => {

  const [pageIsVisible,setPageIsVisible] = useState(false)

  useEffect(()=>{
    const token = sessionStorage.getItem('token')
  
    if(token){
      const decodedToken = jwt.decode(token)
      if(typeof decodedToken !== 'string' && decodedToken && 'role' in decodedToken){
        const role = decodedToken.role
        if(role === "admin"){
          setPageIsVisible(true)
        }
        else{
          setPageIsVisible(false)
        }
      }
    }
    else{
      setPageIsVisible(false)
    }
  },[])

  const router = useRouter();

  // Cette fonction est exécutée lorsque la page est en cours de rechargement
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    // N'oubliez pas d'ajouter un message personnalisé à la boîte de dialogue de confirmation
    e.preventDefault();
    e.returnValue = '';
  };

  // Écoute de l'événement beforeunload
  useEffect(() => {
    if (!router.query.apiJSON) {
      // Si apiJSON est vide, rediriger vers la page d'accueil
      router.push('/les-api/');
    }
  }, [router.query.apiJSON]);

  const [statut, setStatut] = useState(1)
  const option = [
    {
      value: 1,
      label: 'Oui'
    },
    {
      value: -1,
      label: 'Non'
    }
  ]
  const apiJSON = router.query.apiJSON ?? "";

  const {
    title = "",
    tagline = "",
    uptime = "",
    contact_link = "",
    doc_tech_link = "",
    rate_limiting_description = "",
    rate_limiting_resume = "",
    is_open = "",
    partners = [],
    content_intro = "",
    keywords = [],
    producer = "",
    external_site = "",
    visits_2019 = "",
    themes = "",
    last_update = "",
  } = typeof apiJSON === 'string' ? JSON.parse(apiJSON) : {};

  let dateInit:string = "";
  const themes2 = Array.isArray(themes) ? themes.join(' ') : themes.split(/\s+/);
  const partnerSlugs = partners.map((partner: { slug: any; }) => partner.slug);
  const partnersString = partnerSlugs.join(' ');
  function initDate(){
    const [jour, mois, annee] = last_update.split('/');
    dateInit = `${annee}-${mois}-${jour}`;
  }
  if(last_update !== "" && last_update !== null){
    initDate()
  }


  const fields = [
    {name : 'apiEdit',label: 'Titre', type: 'text', value: '' },
    { name: 'title', label: 'Titre', type: 'text', value: title || '' },
    { name: 'tagline', label: 'Sous-Titre', type: 'text', value: tagline || '' },
    { name: 'is_open', label: 'Ouvert à tous', type: 'multichoice', value: is_open || -1, component: <MultiChoice selected={statut} onClick={setStatut} multiChoiceOptions={option}/>}, // Exemple d'un champ multichoix
    { name: 'external_site', label: 'Site de l\'équipe de Dev', type: 'text', value: external_site || '' },
    { name: 'partners', label: 'Partenaire(s)', type: 'text', value: partnersString || '' },
    { name: 'producer', label: 'Nom de l\'équipe qui a développé l\'API*', type: 'text', value: producer || '' },
    { name: 'keywords', label: 'Liste des mots-clés*', type: 'text', value: keywords.join(' ') || '' },
    { name: 'rate_limiting_resume', label: 'Limite d\'utilisation de l\'API', type: 'text', value: rate_limiting_resume || '' },
    { name: 'rate_limiting_description', label: 'Description limite d\'utilisation', type: 'text', value: rate_limiting_description || '' },
    { name: 'themes', label: 'Thème(s)*', type: 'text', value: Array.isArray(themes) ? themes.join(' ') : themes || '' },
    { name: 'content_intro', label: 'Description détaillée de l\'API', type: 'textarea', value: content_intro || '' },
    { name: 'contact_link', label: 'Mail de l\'équipe de contact', type: 'mail', value: contact_link || '' },
    { name: 'doc_tech_link', label: 'Lien vers la documentation technique', type: 'text', value: doc_tech_link || '' },
    { name: 'uptime', label: 'Disponibilité de l\'API', type: 'number', value: uptime || 0 },
    { name: 'visits_2019', label: 'Nombre de visites depuis 2019', type: 'number', value: visits_2019 || 0 },
    { name: 'last_update', label: 'Date de la dernière mise à jour', type: 'date', value: dateInit || '' },
  ];
  
  

  const handleSubmit = (formData:any) =>{
    //console.log(formData)
    router.push('/les-api/');
  }

  return (
    <Page
      headerKey={HEADER_PAGE.ADDAPI}
      title="Modifier Api"
      description="Permet de modifier une Api"
    >
      <div className="text-wrapper text-style">
        <h1 className="layout-center">Modifier une Api</h1>
        <div >
          <MyForm fields={fields} onSubmit={handleSubmit} apiEndpoint='http://localhost:3001/api/crudApi/addApi' />
        </div>
        
      </div>
      <style jsx>{`
        .text-wrapper > div {
          position: relative;
        }
        a.hidden-anchor {
          display: block;
          position: absolute;
          top: -80px;
          visibility: hidden;
        }
      `}</style>
    </Page>
  );
};

export default Editapi;
