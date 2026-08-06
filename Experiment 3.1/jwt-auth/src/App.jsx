import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";

import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import Unauthorized from "./pages/Unauthorized";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setUser(JSON.parse(token));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Login onLogin={setUser} />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            user={user}
            allowedRoles={["Admin", "Editor", "Viewer"]}
          >
            <Dashboard user={user} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} allowedRoles={["Admin"]}>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editor"
        element={
          <ProtectedRoute user={user} allowedRoles={["Editor"]}>
            <Editor />
          </ProtectedRoute>
        }
      />

      <Route
        path="/viewer"
        element={
          <ProtectedRoute user={user} allowedRoles={["Viewer"]}>
            <Viewer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />
    </Routes>
  );
}

export default App;