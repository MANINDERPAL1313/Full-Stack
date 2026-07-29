import { useState } from "react";
import "./PostComposer.css";

function PostComposer() {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [platform, setPlatform] = useState("Twitter");
  const [drafts, setDrafts] = useState([]);

  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const limit = limits[platform];
  const remaining = limit - post.length;

  let message = "";
  let color = "";

  if (remaining < 0) {
    message = "❌ Character Limit Exceeded!";
    color = "red";
  } else if (remaining <= 20) {
    message = "⚠️ Approaching Character Limit";
    color = "orange";
  } else {
    message = "✅ Looks Good";
    color = "green";
  }

  const saveDraft = () => {
    if (title.trim() === "" || post.trim() === "") {
      alert("Please enter both Draft Title and Post.");
      return;
    }

    setDrafts([
      ...drafts,
      {
        title,
        content: post,
      },
    ]);

    setTitle("");
    setPost("");
  };

  const deleteDraft = (index) => {
    setDrafts(drafts.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      <h1>🚀 Social Media Post Composer</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => setPlatform(e.target.value)}
      >
        <option>Twitter</option>
        <option>LinkedIn</option>
        <option>Instagram</option>
      </select>

      <label>Draft Title</label>

      <input
        type="text"
        placeholder="Enter draft title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <button className="save-btn" onClick={saveDraft}>
        💾 Save Draft
      </button>

      <div className="info-card">
        <p>
          <strong>Characters:</strong> {post.length} / {limit}
        </p>

        <p>
          <strong>Remaining:</strong> {remaining}
        </p>

        <p>
          <strong>Platform:</strong> {platform}
        </p>

        <p style={{ color }}>
          <strong>Status:</strong> {message}
        </p>
      </div>

      <h2 className="draft-heading">📂 Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p className="empty-text">No drafts available.</p>
      ) : (
        <ul className="draft-list">
          {drafts.map((draft, index) => (
            <li key={index} className="draft-item">
              <div className="draft-content">
                <strong>{draft.title}</strong>
                <p>{draft.content}</p>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteDraft(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostComposer;