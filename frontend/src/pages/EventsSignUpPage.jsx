import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function RegisterVolunteerEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  // Aqui você pode pegar o voluntário logado do localStorage ou contexto
  const volunteer = JSON.parse(localStorage.getItem("volunteer") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setErro("Usuário não autenticado!");
      return;
    }

    // Busca todos os eventos
    api
      .get("/events/protected/getAll", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error("Erro ao carregar eventos:", err.response || err);
        setErro("Falha ao carregar eventos.");
      });
  }, []);

  async function handleRegister() {
    const token = localStorage.getItem("token");

    if (!selectedEvent) {
      alert("Selecione um evento para se inscrever!");
      return;
    }

    try {
      await api.post(
        `/events_volunteers/protected/register`,
        {
          event_id: parseInt(selectedEvent),
          volunteer_id: volunteer.id, // ajusta conforme seu modelo
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setErro("");
      setMensagem("Inscrição realizada com sucesso!");
      setSelectedEvent(""); // reseta seleção
    } catch (err) {
      console.error("Erro ao registrar voluntário:", err.response || err);
      setMensagem("");
      setErro("Erro ao se inscrever no evento.");
    }
  }

  return (
    <div style={styles.container}>
      <h2>Inscrever-se em um Evento</h2>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

      <label style={styles.label}>Selecione o evento:</label>
      <select
        style={styles.select}
        value={selectedEvent}
        onChange={(e) => setSelectedEvent(e.target.value)}
      >
        <option value="">-- Escolha um evento --</option>
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.event_name}
          </option>
        ))}
      </select>

      <button style={styles.registerButton} onClick={handleRegister}>
        Participar do Evento
      </button>

      <button style={styles.backButton} onClick={() => navigate("/")}>
        Voltar para o Home
      </button>
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
    maxWidth: "500px",
    margin: "40px auto",
    backgroundColor: "#f7f7f7",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    color: "#000",
  },
  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "10px",
  },
  select: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  registerButton: {
    ...baseButton,
    backgroundColor: "#28a745",
    color: "#fff",
  },
  backButton: {
    ...baseButton,
    backgroundColor: "#6c757d",
    color: "#fff",
  },
};
