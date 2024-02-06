import React, { useState, useEffect } from 'react';
import Page from '../layouts/page';
import { HEADER_PAGE } from '../components';
import jwt from 'jsonwebtoken'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MyForm from '../uiComponents/form';

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

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 50,
  whiteSpace: 'nowrap',
  width: 1,
});


  const [fileExcel, setFileExcel] = useState()

  const fields = [
    {name: "fileApi", label:"Fichier Api", type:"file", value:""}
  ]
  

  const handleSubmit = () =>{
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
        <div>
          <MyForm fields={fields} onSubmit={handleSubmit} apiEndpoint='http://localhost:3001/api/upload/' />
        </div>
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
