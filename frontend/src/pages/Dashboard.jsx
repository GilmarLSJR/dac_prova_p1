import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom"; // importa no topo
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [erro, setErro] = useState("");
   const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      setErro("Usuário não autenticado!");
      return;
    }

    api.get("/events/protected/getAll", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => setEvents(res.data))
      .catch(err => {
        console.error("Erro ao buscar eventos:", err.response || err);
        setErro("Falha ao carregar eventos.");
      });
  }, []);

return (
  <div>
    <h1>Dashboard</h1>
    
    <div style={{ marginBottom: "20px" }}>
      <Link to="/CreateEvent">
      <button style={styles.CreateEvent}>Criar Novo Evento</button>
      </Link>
    </div>

    <div style={{ marginBottom: "20px" }}>
    <Link to="/DeleteEvent">
      <button style={styles.DeleteEvent}>Deletar Evento</button>
    </Link>
    </div>
    
    {/* Botão para voltar à Home */}
    <button onClick={() => navigate("/")} style={styles.backButton}>
      Voltar para o Home
      </button>

    <ul>
      {events.map(event => (
        <li key={event.id}>
          <strong>{event.event_name}</strong> <br />
          Descrição: {event.event_description} <br />
          Data: {new Date(event.event_date).toLocaleString()} <br />
          Número Máximo de Voluntários: {event.max_volunteers}
        </li>
      ))}
    </ul>
  </div>
);
}

const baseButton = {
  width: "100%",
  maxWidth: "200px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "0.2s",
  display: "block",
  margin: "10px auto",
  };

const styles = {
  CreateEvent: {
    ...baseButton,
    backgroundColor: "#007bff",
    color: "#fff",
  },
  DeleteEvent: {
    ...baseButton,
    backgroundColor: "#fa0800ff",
    color: "#fff",
  },
    backButton: {
    ...baseButton,
    backgroundColor: "#6c757d",
    color: "#fff",
  },
  
};

export default Dashboard;
