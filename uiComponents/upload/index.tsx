// UploadFile.js
import React, { useState, ChangeEvent } from 'react';

interface UploadFileProps {
  onUpload: (file: File) => void;
}

const UploadFile: React.FC<UploadFileProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Vous pouvez effectuer ici des vérifications sur le fichier, par exemple sa taille ou son type.
      // Ensuite, vous pouvez envoyer le fichier au serveur ou effectuer d'autres opérations avec lui.
      onUpload(selectedFile);
      setSelectedFile(null); // Réinitialisez le fichier sélectionné après l'upload.
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Uploader</button>
    </div>
  );
};

export default UploadFile;
