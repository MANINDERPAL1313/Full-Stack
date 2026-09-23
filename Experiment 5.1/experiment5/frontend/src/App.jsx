import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080";

function App() {
  const [posts, setPosts] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");

  const [editingPost, setEditingPost] = useState(null);
  const [message, setMessage] = useState("");

  // GET POSTS
  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API}/api/posts`);
      const result = await response.json();

      if (result.success) {
        setPosts(result.data || []);
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to Posts API");
    }
  };

  // GET SCHEDULES
  const fetchSchedules = async () => {
    try {
      const response = await fetch(`${API}/api/schedules`);
      const result = await response.json();

      if (result.success) {
        setSchedules(result.data || []);
      }
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to Schedule API");
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchSchedules();
  }, []);

  // CREATE POST
  const createPost = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setMessage("Please enter title and content");
      return;
    }

    try {
      const response = await fetch(`${API}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
        }),
      });

      const result = await response.json();

      console.log("POST RESPONSE:", result);

      setMessage(result.message);

      if (result.success) {
        setTitle("");
        setContent("");
        await fetchPosts();
      }
    } catch (error) {
      console.error("POST ERROR:", error);
      setMessage("Unable to create post");
    }
  };

  // UPDATE POST
  const updatePost = async () => {
    if (!editingPost) return;

    try {
      const response = await fetch(
        `${API}/api/posts/${editingPost.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: editingPost.title,
            content: editingPost.content,
          }),
        }
      );

      const result = await response.json();

      setMessage(result.message);

      if (result.success) {
        setEditingPost(null);
        await fetchPosts();
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to update post");
    }
  };

  // DELETE POST
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${API}/api/posts/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      setMessage(result.message);

      if (result.success) {
        await fetchPosts();
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete post");
    }
  };

  // CREATE SCHEDULE
  const createSchedule = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postTitle: postTitle.trim(),
          scheduledDate,
          scheduledTime,
        }),
      });

      const result = await response.json();

      setMessage(result.message);

      if (result.success) {
        setPostTitle("");
        setScheduledDate("");
        setScheduledTime("");
        await fetchSchedules();
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to create schedule");
    }
  };

  // DELETE SCHEDULE
  const deleteSchedule = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/schedules/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      setMessage(result.message);

      if (result.success) {
        await fetchSchedules();
      }
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete schedule");
    }
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">
        <div>
          <h1>REST API Dashboard</h1>
          <p>Spring Boot • React • H2 Database</p>
        </div>

        <div className="status">
          <span></span>
          API Connected
        </div>
      </header>

      {/* MESSAGE */}
      {message && (
        <div className="message">
          {message}
        </div>
      )}

      <main>

        {/* STATS */}
        <section className="stats">

          <div className="stat-card">
            <h3>{posts.length}</h3>
            <p>Total Posts</p>
          </div>

          <div className="stat-card">
            <h3>{schedules.length}</h3>
            <p>Schedules</p>
          </div>

          <div className="stat-card">
            <h3>REST</h3>
            <p>API Architecture</p>
          </div>

        </section>

        {/* CREATE FORMS */}
        <section className="grid">

          {/* POST FORM */}
          <div className="card">
            <h2>Create Post</h2>

            <form onSubmit={createPost}>

              <input
                type="text"
                placeholder="Post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />

              <button type="submit">
                Create Post
              </button>

            </form>
          </div>

          {/* SCHEDULE FORM */}
          <div className="card">
            <h2>Create Schedule</h2>

            <form onSubmit={createSchedule}>

              <input
                type="text"
                placeholder="Post title"
                value={postTitle}
                onChange={(e) =>
                  setPostTitle(e.target.value)
                }
                required
              />

              <input
                type="date"
                value={scheduledDate}
                onChange={(e) =>
                  setScheduledDate(e.target.value)
                }
                required
              />

              <input
                type="time"
                value={scheduledTime}
                onChange={(e) =>
                  setScheduledTime(e.target.value)
                }
                required
              />

              <button type="submit">
                Schedule Post
              </button>

            </form>
          </div>

        </section>

        {/* POSTS */}
        <section className="card">

          <div className="section-title">

            <div>
              <h2>Posts</h2>
              <p>Manage your REST API posts</p>
            </div>

            <button onClick={fetchPosts}>
              Refresh
            </button>

          </div>

          {/* EDIT POST */}
          {editingPost && (
            <div className="edit-box">

              <h3>Edit Post</h3>

              <input
                type="text"
                value={editingPost.title}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                value={editingPost.content}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    content: e.target.value,
                  })
                }
              />

              <div className="actions">

                <button onClick={updatePost}>
                  Save Changes
                </button>

                <button
                  className="cancel"
                  onClick={() => setEditingPost(null)}
                >
                  Cancel
                </button>

              </div>

            </div>
          )}

          {/* POST LIST */}
          {posts.length === 0 ? (

            <div className="empty">
              No posts available
            </div>

          ) : (

            <div className="items">

              {posts.map((post) => (

                <div
                  className="item"
                  key={post.id}
                >

                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>

                  <div className="actions">

                    <button
                      onClick={() =>
                        setEditingPost({
                          id: post.id,
                          title: post.title,
                          content: post.content,
                        })
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() =>
                        deletePost(post.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* SCHEDULES */}
        <section className="card">

          <div className="section-title">

            <div>
              <h2>Schedules</h2>
              <p>Manage scheduled posts</p>
            </div>

            <button onClick={fetchSchedules}>
              Refresh
            </button>

          </div>

          {schedules.length === 0 ? (

            <div className="empty">
              No schedules available
            </div>

          ) : (

            <div className="items">

              {schedules.map((schedule) => (

                <div
                  className="item"
                  key={schedule.id}
                >

                  <div>
                    <h3>{schedule.postTitle}</h3>

                    <p>
                      {schedule.scheduledDate}
                      {" • "}
                      {schedule.scheduledTime}
                    </p>
                  </div>

                  <button
                    className="delete"
                    onClick={() =>
                      deleteSchedule(schedule.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </section>

      </main>
    </div>
  );
}

export default App;