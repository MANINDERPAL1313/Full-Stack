import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🚫 Access Denied</h1>

        <p>You are not authorized to access this page.</p>

        <Link to="/">
          <button>Go to Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Unauthorized;