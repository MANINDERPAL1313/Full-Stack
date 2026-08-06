import { Link } from "react-router-dom";

function Viewer() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>👀 Viewer Panel</h1>

        <button>View Content</button>
        <br /><br />

        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Viewer;