import React, { useState, useEffect } from 'react';
import styles from './RegisterShiftForm.module.css';
import { fetchEmployees, createRegistro } from '../api'; // Assuming fetchEmployees is available

export default function RegisterShiftForm({ onSave, onCancel }) {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [tipoRegistro, setTipoRegistro] = useState('ENTRADA'); // 'ENTRADA' o 'SALIDA'
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Fetch existing users (employees) to associate shifts with
    fetchEmployees()
      .then(data => {
        setUsers(data);
        if (data.length > 0) {
          setSelectedUserId(data[0].id); // Select first user by default
        }
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setError('Error al cargar la lista de usuarios.');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedUserId || !tipoRegistro) {
      setError('Por favor, selecciona un usuario y un tipo de registro.');
      return;
    }

    try {
      const registroData = {
        employeeId: selectedUserId,
        tipo: tipoRegistro,
        fechaHora: new Date().toISOString(), // Current timestamp
      };
      
      await createRegistro(registroData);
      setSuccess('Registro de turno guardado exitosamente.');
      // Optionally clear form or navigate back
      // onSave(); 
    } catch (err) {
      console.error('Error al registrar turno:', err);
      setError('Error al registrar el turno. Intenta de nuevo.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Registrar Turno</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="userSelect" className={styles.label}>Seleccionar Usuario:</label>
        <select
          id="userSelect"
          name="selectedUserId"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          required
          className={styles.select}
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.nombre} {user.apellido} ({user.identificacion})
            </option>
          ))}
        </select>

        <label htmlFor="tipoRegistro" className={styles.label}>Tipo de Registro:</label>
        <select
          id="tipoRegistro"
          name="tipoRegistro"
          value={tipoRegistro}
          onChange={(e) => setTipoRegistro(e.target.value)}
          required
          className={styles.select}
        >
          <option value="ENTRADA">Entrada</option>
          <option value="SALIDA">Salida</option>
        </select>

        {error && <p className={styles.errorMessage}>{error}</p>}
        {success && <p className={styles.successMessage}>{success}</p>}

        <div className={styles.buttons}>
          <button type="submit" className={styles.buttonSave}>Registrar Turno</button>
          <button type="button" className={styles.buttonCancel} onClick={onCancel}>Volver</button>
        </div>
      </form>
    </div>
  );
}
