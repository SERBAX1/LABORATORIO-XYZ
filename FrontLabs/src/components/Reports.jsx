import React, { useState } from 'react';
import './Reports.css'; // Create a new CSS file for styling

export default function Reports({ onBack }) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleDownloadAllEmployees = async () => {
    setMessage('');
    setError('');
    try {
      // This will be a new API endpoint
      const response = await fetch('http://localhost:8081/api/reports/employees/pdf'); // Changed to PDF
      if (!response.ok) {
        throw new Error('Error al generar el reporte de empleados.');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_empleados.pdf'; // Changed filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage('Reporte de empleados generado y descargado exitosamente.');
    } catch (err) {
      console.error('Error generating employee report:', err);
      setError(err.message);
    }
  };

  const handleDownloadAllShifts = async () => {
    setMessage('');
    setError('');
    try {
      // This will be a new API endpoint
      const response = await fetch('http://localhost:8081/api/reports/shifts/pdf'); // Changed to PDF
      if (!response.ok) {
        throw new Error('Error al generar el reporte de registros de turno.');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_registros_turno.pdf'; // Changed filename
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage('Reporte de registros de turno generado y descargado exitosamente.');
    } catch (err) {
      console.error('Error generating shift report:', err);
      setError(err.message);
    }
  };

  return (
    <div className="reports-container">
      <div className="reports-header">
        <h1>Generar Reportes</h1>
        <button className="back-btn" onClick={onBack}>Volver</button>
      </div>

      <div className="report-options">
        <button className="report-btn" onClick={handleDownloadAllEmployees}>
          Descargar Reporte de Todos los Empleados (PDF)
        </button>
        <button className="report-btn" onClick={handleDownloadAllShifts}>
          Descargar Reporte de Todos los Registros de Turno (PDF)
        </button>
        {/* Individual employee shift history report will be in EmployeeShiftHistory.jsx */}
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
