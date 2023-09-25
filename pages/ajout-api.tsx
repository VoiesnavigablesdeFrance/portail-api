import React from 'react';
import Page from '../layouts/page';
import { HEADER_PAGE } from '../components';
import UploadFile from '../uiComponents/upload'; 

const Addapi: React.FC = () => {
  const handleFileUpload = (file : File) => {
    // Traitez le fichier téléchargé ici, par exemple en l'envoyant au serveur.
    console.log('Fichier téléchargé :', file.name);
  };

  return (
    <Page
      headerKey={HEADER_PAGE.ADDAPI}
      title="Ajouter Api"
      description="Permet l'ajout d'une Api"
    >
      <div className="text-wrapper text-style">
        <h1 className="layout-center">Ajouter une Api</h1>
        <div className='layout-center'>
          <UploadFile onUpload={handleFileUpload} /> 
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

export default Addapi;
