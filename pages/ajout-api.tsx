import React, { useState, useEffect } from 'react';
import Page from '../layouts/page';
import { HEADER_PAGE } from '../components';
import MyForm from '../uiComponents/form';
import  MultiChoice from '../uiComponents/multiChoice';
import jwt from 'jsonwebtoken'

const Addapi: React.FC = () => {

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
})


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
  const fields = [
    { name: "title", label: 'Titre', type: 'text', value: ""},
    { name: "tagline", label: 'Sous-Titre', type: 'text', value: ""},
    { name: "is_open", label: 'Ouvert à tous', type: 'multichoice', value: "",component: <MultiChoice selected={statut} onClick={setStatut} multiChoiceOptions={option}/> },
    { name: "external_site", label: "Site de l'équipe de Dev", type: 'text', value: ""},
    { name: "partners", label: 'Partenaire(s)', type: 'text', value: ""},
    { name: "producer", label: "Nom de l'équipe qui a développé l'API", type: 'text', value: ""},
    { name: "keywords", label: "Liste des mots-clés pour faciliter la recherche de l'API", type: 'text', value: ""},
    { name: "rate_limiting_resume", label: "Limite d'utilsation de l'API", type: 'text', value: ""},
    { name: "rate_limiting_description", label: "Description limite d'utilisation", type: "text", value: ""},
    { name: "themes", label: "Thème(s)", type: 'text', value: ""},
    { name: "content_intro", label: "Description détaillée de l'API", type: 'textarea', value: ""},
    { name: "contact_link", label: "Mail de l'équipe à contacter pour des questions ou des problèmes liés à l'API", type: 'mail', value: ""},
    { name: "doc_tech_link", label: "Lien vers la documentation technique de l'API", type: 'text', value: ""},
    { name: "uptime", label: "Disponibilité de l'API en pourcentage", type: 'number', value: ""},
    { name: "visits_2019", label: "Nombre de visites de l'API depuis l'année 2019", type: 'number', value: ""},
    { name: "last_update", label: "Date de la dernière mise à jour de l'API", type: "date", value: ""}
  ];
  

  const handleSubmit = (formData:any) =>{
  }

  return pageIsVisible ? (
    <Page
      headerKey={HEADER_PAGE.ADDAPI}
      title="Ajouter Api"
      description="Permet l'ajout d'une Api"
    >
      <div className="text-wrapper text-style">
        <h1 className="layout-center">Ajouter une Api</h1>
        <div className='layout-center'>
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
  ) : null;
};

export default Addapi;
