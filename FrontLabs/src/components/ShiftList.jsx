import React, { useState, useEffect } from 'react';
import { fetchRegistros } from '../api'; // Assuming fetchRegistros will be created
import './ShiftList.css'; // Create a new CSS file for styling

export default function ShiftList({ onBack }) {
  const [registros, setRegistros] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRegistros = async () => {
      try {
        setLoading(true);
        const data = await fetchRegistros();
        setRegistros(data);
      } catch (err) {
        console.error('Error fetching registros:', err);
        setError('Error al cargar la lista de registros de turno.');
      } finally {
        setLoading(false);
      }
    };
    getRegistros();
  }, []);

  if (loading) {
    return <div className="shift-list-container">Cargando registros...</div>;
  }

  if (error) {
    return <div className="shift-list-container error-message">{error}</div>;
  }

  return (
    <div className="shift-list-container">
      <div className="shift-header">
        <h1>Registros de Turno</h1>
        <button className="back-btn" onClick={onBack}>Volver</button>
      </div>

      {registros.length === 0 ? (
        <p>No hay registros de turno para mostrar.</p>
      ) : (
        <table className="shift-table">
          <thead>
            <tr>
              <th>ID Empleado</th>
              <th>Nombre Empleado</th>
              <th>Tipo de Registro</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.employee ? registro.employee.id : 'N/A'}</td>
                <td>{registro.employee ? `${registro.employee.nombre} ${registro.employee.apellido}` : 'N/A'}</td>
                <td>{registro.tipo}</td>
                <td>{new Date(registro.fechaHora).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
