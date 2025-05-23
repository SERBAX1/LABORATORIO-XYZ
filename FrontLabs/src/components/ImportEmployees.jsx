import React, { useState } from 'react';
import { uploadEmployeesCSV } from '../api'; // We will create this API call

export default function ImportEmployees({ onClose, onImportSuccess }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Por favor, selecciona un archivo CSV.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await uploadEmployeesCSV(formData);
      setMessage(response.message || 'Empleados importados exitosamente.');
      onImportSuccess();
      onClose();
    } catch (error) {
      console.error('Error al importar empleados:', error);
      setMessage(error.message || 'Error al importar empleados.');
    }
  };

  return (
    <div className="import-employees-modal">
      <div className="modal-content">
        <h2>Importar Empleados (CSV)</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={!selectedFile}>Importar</button>
        <button onClick={onClose}>Cancelar</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
