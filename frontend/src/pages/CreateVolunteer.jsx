// src/pages/CreateVolunteer.jsx
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateVolunteer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
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
        "/volunteers/public/create",
        {
          name,
          email,
          password,
          phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Voluntário criado com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || "Erro ao criar voluntário.";
      alert(message);
    }
  }

  return (
    <div style={styles.container}>
      <h2>Cadastrar Novo Voluntário</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>E-mail</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <label style={styles.label}>Telefone</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.createButton}>
          Salvar Voluntário
        </button>

        <button style={styles.backButton} onClick={() => navigate("/")}>
          Voltar para o Home
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
    color: "#000000ff",
  },
  input: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  createButton: {
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
