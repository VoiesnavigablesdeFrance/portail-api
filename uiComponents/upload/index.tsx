import React, { useState } from 'react';

const UploadFile = ({ onUpload }: { onUpload: (file: File) => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async (e: any) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('http://localhost:3001/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          onUpload(selectedFile);
          setSelectedFile(null);
        } else {
          console.error('Erreur lors du téléchargement du fichier');
        }
      } catch (error) {
        console.error('Erreur lors du téléchargement du fichier :', error);
      }
    } else {
      console.error('Aucun fichier sélectionné');
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Télécharger</button>
    </div>
  );
};

export default UploadFile;
