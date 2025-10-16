import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1>Bem-vindo ao Sistema de Eventos!</h1>
      <p>Gerencie voluntários, usuários e eventos de forma simples e prática.</p>

      <Link to="/loginAdmin">
        <button style={styles.loginAdminButton}>Login Administrador</button>
      </Link>

      <Link to="/createVolunteer">
        <button style={styles.createVolunteerButton}>Criar Voluntário</button>
      </Link>
      
      <Link to="/loginVolunteer">
        <button style={styles.loginVolunteerButton}>Login Voluntário</button>
      </Link>
      
      <Link to="/EventsDashboardPublic">
      <button style={styles.eventsButton}>Ver Eventos</button>
      </Link>

    </div>
  );
};

export default Home;

const baseButton = {
  width: "200px",          // largura fixa uniforme
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.2s",
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gap: '15px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '0 10px',
  },
  loginAdminButton: {
    ...baseButton,
    backgroundColor: '#007bff',
    color: '#fff',
  },
  createVolunteerButton: {
    ...baseButton,
    backgroundColor: '#28a745',
    color: '#fff',
  },
  loginVolunteerButton: {
    ...baseButton,
    backgroundColor: '#28a745',
    color: '#fff',
  },
  eventsButton: {
  ...baseButton,
  backgroundColor: '#ff0728ff', // amarelo
  color: '#faf7f7ff',
},
};

