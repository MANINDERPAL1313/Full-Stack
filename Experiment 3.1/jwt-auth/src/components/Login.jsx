import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Viewer");

  const handleLogin = () => {
    if (username === "admin" && password === "admin123") {

      const token = {
        username: username,
        role: role,
        loginTime: new Date().toLocaleString(),
      };

      localStorage.setItem("token", JSON.stringify(token));

      onLogin(token);

      alert("✅ Login Successful");

     navigate("/dashboard");
    } else {
      alert("❌ Invalid Username or Password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🔐 JWT Authentication</h1>

        <p>Please login to continue</p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="Editor">Editor</option>
          <option value="Viewer">Viewer</option>
        </select>

        <br />
        <br />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;