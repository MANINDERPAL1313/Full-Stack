import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080";

function App() {
  const [activeTab, setActiveTab] = useState("posts");

  const [posts, setPosts] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [message, setMessage] = useState("");

  // ---------------- POSTS ----------------

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const result = await response.json();
      setPosts(result.data || []);
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  const createPost = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Post created successfully");
        setTitle("");
        setContent("");
        fetchPosts();
      } else {
        setMessage(result.message || "Failed to create post");
      }
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Post deleted successfully");
        fetchPosts();
      } else {
        setMessage(result.message || "Failed to delete post");
      }
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  // ---------------- SCHEDULES ----------------

  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${API_URL}/schedules`);
      const result = await response.json();
      setSchedules(result.data || []);
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  const createSchedule = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task,
          date,
          time,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Schedule created successfully");
        setTask("");
        setDate("");
        setTime("");
        fetchSchedules();
      } else {
        setMessage(result.message || "Failed to create schedule");
      }
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  const deleteSchedule = async (id) => {
    try {
      const response = await fetch(`${API_URL}/schedules/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Schedule deleted successfully");
        fetchSchedules();
      } else {
        setMessage(result.message || "Failed to delete schedule");
      }
    } catch (error) {
      setMessage("Backend server is not running");
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchSchedules();
  }, []);

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>REST API Dashboard</h1>
          <p>Manage your posts and schedules</p>
        </div>

        <div className="status">
          <span></span>
          Backend Connected
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="nav">
        <button
          className={activeTab === "posts" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("posts")}
        >
          Posts
        </button>

        <button
          className={activeTab === "schedules" ? "nav-btn active" : "nav-btn"}
          onClick={() => setActiveTab("schedules")}
        >
          Schedules
        </button>
      </nav>

      {/* MESSAGE */}
      {message && (
        <div className="message">
          {message}
          <button onClick={() => setMessage("")}>×</button>
        </div>
      )}

      {/* POSTS */}
      {activeTab === "posts" && (
        <main>

          <section className="hero">
            <h2>Posts</h2>
            <p>Create, view and manage your REST API posts.</p>
          </section>

          <section className="form-card">
            <h3>Create New Post</h3>

            <form onSubmit={createPost}>

              <label>Title</label>
              <input
                type="text"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <label>Content</label>
              <textarea
                placeholder="Write your post content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              <button className="primary-btn" type="submit">
                + Create Post
              </button>

            </form>
          </section>

          <section className="list-section">
            <div className="section-title">
              <div>
                <h3>Your Posts</h3>
                <p>{posts.length} post(s)</p>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="empty">
                <h3>No posts yet</h3>
                <p>Create your first post using the form above.</p>
              </div>
            ) : (
              <div className="cards">

                {posts.map((post) => (
                  <article className="card" key={post.id}>

                    <div className="card-content">
                      <span className="badge">POST #{post.id}</span>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </button>

                  </article>
                ))}

              </div>
            )}
          </section>

        </main>
      )}

      {/* SCHEDULES */}
      {activeTab === "schedules" && (
        <main>

          <section className="hero">
            <h2>Schedules</h2>
            <p>Create and manage your scheduled tasks.</p>
          </section>

          <section className="form-card">
            <h3>Create New Schedule</h3>

            <form onSubmit={createSchedule}>

              <label>Task</label>
              <input
                type="text"
                placeholder="Enter task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                required
              />

              <div className="form-row">

                <div>
                  <label>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label>Time</label>
                  <input
                    type="text"
                    placeholder="10:00 AM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </div>

              </div>

              <button className="primary-btn" type="submit">
                + Add Schedule
              </button>

            </form>
          </section>

          <section className="list-section">

            <div className="section-title">
              <div>
                <h3>Your Schedules</h3>
                <p>{schedules.length} schedule(s)</p>
              </div>
            </div>

            {schedules.length === 0 ? (
              <div className="empty">
                <h3>No schedules yet</h3>
                <p>Add your first schedule using the form above.</p>
              </div>
            ) : (
              <div className="cards">

                {schedules.map((schedule) => (
                  <article className="card" key={schedule.id}>

                    <div className="card-content">
                      <span className="badge schedule-badge">
                        SCHEDULE #{schedule.id}
                      </span>

                      <h3>{schedule.task}</h3>

                      <div className="schedule-info">
                        <span>📅 {schedule.date}</span>
                        <span>⏰ {schedule.time}</span>
                      </div>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => deleteSchedule(schedule.id)}
                    >
                      Delete
                    </button>

                  </article>
                ))}

              </div>
            )}

          </section>

        </main>
      )}

      <footer>
        Experiment 4 • RESTful APIs & Structured Logging
      </footer>

    </div>
  );
}

export default App;