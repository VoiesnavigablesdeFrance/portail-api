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
  onSubmit: (formData: Record<string, string>) => void;
  apiEndpoint: string; // Nouvelle prop pour spécifier l'URL de l'API
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation : Vérifiez si les champs requis sont vides
    const requiredFields = ['title', 'is_open', 'partners', 'producer', 'keywords'];
    const emptyFields: string[] = [];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        emptyFields.push(field);
      }
    });

    if (emptyFields.length > 0) {
      // Il y a des champs vides, vous pouvez afficher un message d'erreur ou prendre une autre action si nécessaire
      console.log('Champs vides détectés :', emptyFields);
      setAlert(<Alert variant="outlined" severity="error">{`Champs vides détectés : ${emptyFields}`}</Alert>);
    } else {
      // Tous les champs requis sont remplis, vous pouvez soumettre le formulaire
      console.log('Formulaire soumis :', formData);
      // Effectuez l'envoi du formulaire
      setSubmitting(true); // Désactivez le bouton de soumission pendant la requête
      fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setSubmitting(false); // Réactivez le bouton de soumission
          console.log('Réponse du serveur :', data);
          onSubmit(formData); // Appelez la fonction de rappel onSubmit si nécessaire
          setAlert(<Alert variant="outlined" severity="success">{data.message}</Alert>);
        })
        .catch((error) => {
          setSubmitting(false); // Réactivez le bouton de soumission en cas d'erreur
          console.error('Erreur lors de l\'envoi des données :', error);
          setAlert(<Alert variant="outlined" severity="error">Erreur lors de l'envoi des données : {error.message}</Alert>);
        });
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
