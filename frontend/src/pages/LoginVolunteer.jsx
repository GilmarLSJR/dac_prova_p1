import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function LoginVolunteer() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/volunteers/public/login", { email, password });
      const token = res.data.token;
      const role = res.data.role; // O backend deve retornar a role do usuário

      // Salva o token no localStorage
      localStorage.setItem("token", token);

      // Salva a role no localStorage
      localStorage.setItem("role", role);

      // Redireciona para a página de eventos ou um dashboard do voluntário
      navigate("/EventsSignUpPage");

    } catch (err) {
      console.error("Erro no login:", err.response?.data || err);
      alert("Falha no login!");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login do Voluntário</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.loginButton}>
          Entrar
        </button>
      </form>

      {/* Botão para voltar à Home */}
      <button onClick={() => navigate("/")} style={styles.backButton}>
        Voltar para o Home
      </button>
    </div>
  );
}

export default LoginVolunteer;

// ==================== ESTILOS ====================

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
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  loginButton: {
    ...baseButton,
    backgroundColor: "#007bff",
    color: "#fff",
  },
  backButton: {
    ...baseButton,
    backgroundColor: "#6c757d",
    color: "#fff",
  },
};
