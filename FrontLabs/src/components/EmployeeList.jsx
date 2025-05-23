import React, { useState, useEffect } from 'react';
import { fetchEmployees } from '../api'; // Import fetchEmployees
import ImportEmployees from './ImportEmployees'; // Import the new component
import './EmployeeList.css';

export default function EmployeeList({ onLogout, onCreateNew, onRegisterShift, onViewShifts, onEditEmployee, onViewEmployeeHistory, onGenerateReports }) {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);
  const [refreshList, setRefreshList] = useState(false); // State to trigger refresh

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };
    getEmployees();
  }, [refreshList]); // Depend on refreshList

  const filteredEmployees = employees.filter((emp) =>
    Object.values(emp).some((val) =>
      val && val.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleDelete = (id) => {
    if (window.confirm('¿Deseas eliminar este empleado?')) {
      fetch(`/api/empleados/${id}`, { method: 'DELETE' })
        .then(() => {
          setEmployees(employees.filter(emp => emp.id !== id));
        })
        .catch(err => console.error('Error eliminando empleado:', err));
    }
  };

  return (
    <div className="employee-list-container">
      <div className="employee-header">
       
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <div className="Buttoms">
          <button className="new-employee-btn" onClick={onCreateNew}>Nuevo Empleado</button>
          <button className="import-employee-btn" onClick={() => setShowImportModal(true)}>Importar Empleados</button>
          <button className="register-shift-btn" onClick={onRegisterShift}>Registrar Turno</button>
          <button className="view-shifts-btn" onClick={onViewShifts}>Ver Registros</button>
          <button className="generate-reports-btn" onClick={onGenerateReports}>Generar Reportes</button>
          <button className="logout-btn" onClick={onLogout}>Salir</button>
        </div>
      </div>

      {showImportModal && (
        <ImportEmployees
          onClose={() => setShowImportModal(false)}
          onImportSuccess={() => {
            setShowImportModal(false);
            setRefreshList(prev => !prev); // Toggle to trigger useEffect
          }}
        />
      )}

      <input
        type="text"
        placeholder="Buscar empleados..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cédula</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Cargo</th>
            <th>Departamento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.identificacion}</td>
              <td>{emp.nombre}</td>
              <td>{emp.apellido}</td>
              <td>{emp.cargo}</td>
              <td>{emp.departamento}</td>
             
              <td>
                <button onClick={() => onEditEmployee(emp)}>Editar</button>
                <button onClick={() => handleDelete(emp.id)}>Eliminar</button>
                <button onClick={() => onViewEmployeeHistory(emp.id)} className="history-icon-btn">
                  &#128196;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
