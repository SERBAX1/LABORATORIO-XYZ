import React, { useState } from 'react';
import styles from './Login.module.css';

export default function Login({ onLogin }) {
  // Inicializo con las credenciales correctas por defecto
  const [usuario, setUsuario] = useState('sdsoaresv@gmail.com'); 
  const [contrasena, setContrasena] = useState('$2a$12$/.Fp7GHYJ1OWQBR7Ajk6KOKpLuI42JWzYZEHwZvPT0PPiSL4MWJ2O'); 
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Sending login request with:');
    console.log('Correo:', usuario);
    console.log('Contrasena:', contrasena);

    try {
      const response = await fetch('http://localhost:8081/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: usuario, contrasena: contrasena }),
      });

      if (response.ok) {
        onLogin(); // ✅ Login exitoso
        setError(null);
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <>
      <div className={styles.loginBackground}></div>
      <div className={styles.loginContainer}>
        <h1 className={styles.loginTitle}>LABORATORIO XYZ</h1>
        <h2 className={styles.loginTitle}>Iniciar Sesión</h2>
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            className={styles.loginInput}
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            className={styles.loginInput}
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>
        </form>

        {error && (
          <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <a href="#" className={styles.loginLink}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </>
  );
}
