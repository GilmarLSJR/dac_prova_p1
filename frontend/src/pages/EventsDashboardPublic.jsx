import { useEffect, useState } from "react";
import api from "../services/api"; // sua instância do axios
import { useNavigate } from "react-router-dom";

function EventsDashboardPublic() {
  const [events, setEvents] = useState([]);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/events/protected/getAllPublic") // rota pública do backend
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Erro ao buscar eventos:", err.response || err);
        setErro("Falha ao carregar eventos.");
      });
  }, []);

  if (erro) return <p style={{ color: "red" }}>{erro}</p>;
  if (!events.length) return <p>Carregando eventos ou nenhum evento encontrado...</p>;

  return (
    <div style={styles.container}>
      <h1>Eventos</h1>

      {/* Botão para voltar à Home */}
      <button onClick={() => navigate("/")} style={styles.backButton}>
        Voltar para Home
      </button>

      <div style={styles.eventsList}>
        {events.map((event) => (
          <div key={event.id} style={styles.eventCard}>
            <h3>{event.event_name}</h3>
            <p><strong>Descrição:</strong> {event.event_description}</p>
            <p><strong>Data:</strong> {new Date(event.event_date).toLocaleString()}</p>
            <p><strong>Máx. Voluntários:</strong> {event.max_volunteers}</p>
          </div>
        ))}
      </div>
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
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  backButton: {
    ...baseButton,
    backgroundColor: "#6c757d",
    color: "#fff",
  },
  eventsList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    alignItems: "center",
    marginTop: "20px",
  },
  eventCard: {
    width: "100%",
    maxWidth: "400px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    textAlign: "left",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
};

export default EventsDashboardPublic;
