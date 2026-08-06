import { Link } from "react-router-dom";

function Editor() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>✍️ Editor Panel</h1>

        <button>Edit Post</button>
        <br /><br />

        <button>Publish Post</button>
        <br /><br />

        <Link to="/dashboard">
          <button>Back to Dashboard</button>
        </Link>
      </div>
    </div>
  );
}

export default Editor;