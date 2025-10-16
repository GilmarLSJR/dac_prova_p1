import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DeleteEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

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

  async function handleDelete() {
    const token = localStorage.getItem("token");

    if (!selectedEvent) {
      alert("Selecione um evento para deletar!");
      return;
    }

    const confirmar = window.confirm("Tem certeza que deseja deletar este evento?");
    if (!confirmar) return;

try {
  await api.delete(`/events/protected/delete/${selectedEvent}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  // Limpa o erro e mostra a mensagem de sucesso
  setErro("");
  setMensagem("Evento deletado com sucesso!");

  // Atualiza a lista e reseta seleção
  setEvents(events.filter((e) => e.id !== parseInt(selectedEvent)));
  setSelectedEvent("");

} catch (err) {
  console.error("Erro ao deletar evento:", err.response || err);
  setMensagem(""); // Limpa mensagem de sucesso
  setErro("Erro ao deletar evento.");
}
  }

  return (
    <div style={styles.container}>
      <h2>Deletar Evento</h2>

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

      <button style={styles.deleteButton} onClick={handleDelete}>
        Deletar Evento
      </button>
      
      <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
        Voltar para o Dashboard
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
  deleteButton: {
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
