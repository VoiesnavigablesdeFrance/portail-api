import React, { useState } from 'react';
import styles from './myForm.module.css'; // Importez le module CSS
import MultiChoice from '../multiChoice';
import Alert from '@mui/material/Alert'; // Importez le composant d'alerte


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

    // Désactivez le bouton de soumission pendant la requête
    setSubmitting(true);

    // Envoyez les données au serveur
    fetch(apiEndpoint, { // Utilisez l'URL spécifiée dans la prop apiEndpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Réactivez le bouton de soumission
        setSubmitting(false);

        // Traitez la réponse du serveur si nécessaire
        console.log('Réponse du serveur :', data);

        // Appelez la fonction de rappel onSubmit si vous le souhaitez
        onSubmit(formData);

        // Affichez l'alerte de succès
        setAlert(<Alert variant="outlined" severity="success">{data.message}</Alert>);
      })
      .catch((error) => {
        // Réactivez le bouton de soumission en cas d'erreur
        setSubmitting(false);

        console.error('Erreur lors de l\'envoi des données :', error);

        // Affichez l'alerte d'erreur
        setAlert(<Alert variant="outlined" severity="error">Erreur lors de l'envoi des données : {error.message}</Alert>);
     
      });
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className={styles.myForm}>
      {fields.map((field) => (
        field.name !== 'apiEdit' && (
        <div key={field.name} className={styles.formField}>
          <label htmlFor={field.name} className={styles.label}>
            {field.label} :
          </label>
          {field.component ? (
            React.isValidElement(field.component) ? (
              <MultiChoice
                selected={formData[field.name]}
                onClick={(value) => handleMultiChoiceChange(field.name, value)}
                multiChoiceOptions={field.component.props.multiChoiceOptions}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={styles.input}
              />
            )
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className={styles.input}
            />
          )}
        </div>
        )
      ))}
      <button type="submit" className={styles.submitButton} disabled={submitting}>
        {submitting ? 'Envoi en cours...' : 'Soumettre'}
      </button>
    </form>
    {alert}
    </div>
  );
}

export default MyForm;
