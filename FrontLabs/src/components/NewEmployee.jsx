import React, { useState } from 'react';
import styles from './NewEmployee.module.css';

export default function NewEmployee({ onSave, onCancel }) {
  const [form, setForm] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    cargo: '',
    departamento: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.identificacion ||
      !form.nombre ||
      !form.apellido ||
      !form.cargo ||
      !form.departamento
    ) {
      alert('Por favor llena todos los campos obligatorios');
      return;
    }
    onSave(form);
  };

  return (
    <div className={styles.container}>
      <h2>Nuevo Empleado</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          name="identificacion"
          type="text"
          placeholder="Identificación"
          value={form.identificacion}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="nombre"
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="apellido"
          type="text"
          placeholder="Apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <input
          name="cargo"
          type="text"
          placeholder="Cargo"
          value={form.cargo}
          onChange={handleChange}
          required
          className={styles.input}
        />
      
        <input
          name="departamento"
          type="text"
          placeholder="Departamento"
          value={form.departamento}
          onChange={handleChange}
          required
          className={styles.input}
        />
        <div className={styles.buttons}>
          <button type="submit" className={styles.buttonSave}>Guardar</button>
          <button type="button" className={styles.buttonCancel} onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
