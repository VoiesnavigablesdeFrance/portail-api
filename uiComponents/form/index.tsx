import React, { useState } from 'react';
import styles from './myForm.module.css'; // Importez le module CSS
import MultiChoice from '../multiChoice';
import { TextField, Button, Alert } from '@mui/material';
import { initial } from 'lodash';

interface Field {
  name: string;
  label: string;
  type: string;
  component?: React.ReactNode;
  value: string;
}

interface MyFormProps {
  fields: Field[];
  onSubmit: (formData: FormData) => void;
  apiEndpoint: string; // Pour spécifier l'URL de l'API
  
}

function MyForm({ fields, onSubmit, apiEndpoint }: MyFormProps) {
  const initialFormData: Record<string, string> = {};

  function initFormData(){
    if(fields[0].name !== "apiEdit"){
      fields.forEach((field) => {
        initialFormData[field.name] = '';
      });
    }
    else{
      fields.forEach((field) => {
        initialFormData[field.name] = field.value;
      });
    }
  }
  initFormData();
  

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState<React.ReactNode | null>(null); // État pour l'alerte


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMultiChoiceChange = (name: string, selectedValue: any) => {
    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
  
    try {
      let bodyToSend: any;
      let headers: Record<string, string> = {}
      if (!formData.file) {
        headers['Content-Type'] = 'application/json';
      }
      // Si formData contient un fichier (exemple basé sur un champ spécifique, ajustez selon votre cas)
      if (formData.fileApi) {
        bodyToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          bodyToSend.append(key, value);
        });
        const excelInput = document.getElementById('fileApi') as HTMLInputElement;
        if (excelInput && excelInput.files && excelInput.files[0]) {
          console.log(excelInput.files[0])
          bodyToSend.append('fileApi', excelInput.files[0]);
        }
        console.log(bodyToSend)
        // Avec FormData, le navigateur définira correctement le Content-Type, incluant le boundary
      } else {
        // Pour les données JSON
        bodyToSend = JSON.stringify(formData);
      }
  
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: bodyToSend,
      });
  
      if (!response.ok) throw new Error('Réponse du réseau non OK');
  
      const data = await response.json();
      setAlert(<Alert variant="outlined" severity="success">{data.message}</Alert>);
      onSubmit(data); // Assurez-vous que cette fonction gère correctement les données reçues
    } catch (error:any) {
      console.error('Erreur lors de l\'envoi des données :', error);
      setAlert(<Alert variant="outlined" severity="error">Erreur lors de l'envoi des données : {error.toString()}</Alert>);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div> 
    <form 
     //onSubmit={handleSubmit} 
     className={styles.myForm}
     >
      {fields.map((field) => (
        field.name !== 'apiEdit' && (
        <div key={field.name} className={styles.formField}>
          {field.component ? (
            React.isValidElement(field.component) ? (
              <MultiChoice
                selected={formData[field.name]}
                onClick={(value) => handleMultiChoiceChange(field.name, value)}
                multiChoiceOptions={field.component.props.multiChoiceOptions}
              />
            ) : (
              <TextField
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={styles.input}
                    label={field.label}
                    variant="outlined"
                    fullWidth
                />
            )
          ) : (
            <TextField
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={styles.input}
                  label={field.label}
                  variant="outlined"
                  fullWidth
              />
          )}
        </div>
        )
      ))}
      <Button type="button" variant="contained" color="primary" onClick={handleSubmit} className={styles.submitButton} disabled={submitting}>
        {submitting ? 'Envoi en cours...' : 'Soumettre'}
      </Button>
    </form>
    {alert}
    </div>
  );
}

export default MyForm;
