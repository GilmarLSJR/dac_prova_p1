import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [maxVolunteers, setMaxVolunteers] = useState("");
  const [eventDate, setEventDate] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Você precisa estar logado como admin.");
      return;
    }

    try {
      await api.post(
        "/events/protected/post",
        {
          event_name: eventName,
          event_description: eventDescription,
          max_volunteers: parseInt(maxVolunteers),
          event_date: eventDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Evento criado com sucesso!");
      setEventName("");
      setEventDescription("");
      setMaxVolunteers("");
      setEventDate("");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || "Erro ao criar evento.";
      alert(message);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Cadastrar Novo Evento</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nome do Evento</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Descrição</label>
        <textarea
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          style={styles.textarea}
          required
        />

        <label style={styles.label}>Número Máximo de Voluntários</label>
        <input
          type="number"
          value={maxVolunteers}
          onChange={(e) => setMaxVolunteers(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Data e Hora</label>
        <input
          type="datetime-local"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.createButton}>
          Salvar Evento
        </button>
        
        <button style={styles.backButton} onClick={() => navigate("/dashboard")}>
          Voltar para o Dashboard
          </button>
      </form>
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
    color: "#000",

    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    color:"#000000ff"
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  textarea: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    minHeight: "80px",
  },
  createButton: {
    ...baseButton,
    backgroundColor: "#007bff",
    color: "#fff",
  },
  backButton: {
    ...baseButton,
    backgroundColor: "#6c757d",
    color: "#fff",
}
};
