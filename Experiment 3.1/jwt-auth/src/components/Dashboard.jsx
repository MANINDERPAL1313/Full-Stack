import { Link } from "react-router-dom";

function Dashboard({ user, onLogout }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🎉 Dashboard</h1>

        <h3>Welcome {user.username}</h3>

        <p><strong>Token:</strong></p>

        <textarea
          value={JSON.stringify(user, null, 2)}
          readOnly
          rows="6"
          style={{
            width: "100%",
            marginBottom: "20px",
            padding: "10px",
          }}
        />

        <p><strong>Role:</strong> {user.role}</p>

        <p><strong>Login Time:</strong> {user.loginTime}</p>

        <hr />

        {user.role === "Admin" && (
          <Link to="/admin">
            <button>Admin Panel</button>
          </Link>
        )}

        {user.role === "Editor" && (
          <Link to="/editor">
            <button>Editor Panel</button>
          </Link>
        )}

        {user.role === "Viewer" && (
          <Link to="/viewer">
            <button>Viewer Panel</button>
          </Link>
        )}

        <br />
        <br />

        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;