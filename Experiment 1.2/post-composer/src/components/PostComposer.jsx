import React, { useMemo } from "react";
import "./PostComposer.css";
import { useSelector, useDispatch } from "react-redux";

import {
  setPost,
  setPlatform,
  saveDraft,
  deleteDraft,
} from "../features/posts/postSlice";

import {
  selectPost,
  selectPlatform,
  selectDrafts,
  selectTotalDrafts,
  selectLongDrafts,
} from "../features/posts/postsSelector";

function PostComposer() {
  const dispatch = useDispatch();

  const post = useSelector(selectPost);
  const platform = useSelector(selectPlatform);
  const drafts = useSelector(selectDrafts);
  const totalDrafts = useSelector(selectTotalDrafts);
  const longDrafts = useSelector(selectLongDrafts);

  const limits = {
    Twitter: 280,
    LinkedIn: 3000,
    Instagram: 2200,
  };

  const limit = useMemo(() => limits[platform], [platform]);

  const remaining = useMemo(() => {
    return limit - post.length;
  }, [limit, post]);

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

  return (
    <div className="container">
      <h1>🚀 Social Media Post Composer</h1>

      <label>Select Platform</label>

      <select
        value={platform}
        onChange={(e) => dispatch(setPlatform(e.target.value))}
      >
        <option>Twitter</option>
        <option>LinkedIn</option>
        <option>Instagram</option>
      </select>

      <textarea
        placeholder="Write your post here..."
        value={post}
        onChange={(e) => dispatch(setPost(e.target.value))}
      />

      <button
        className="save-btn"
        onClick={() => dispatch(saveDraft())}
      >
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

      <div className="stats-card">
        <h2>📊 Statistics</h2>

        <div className="stat-box">
          <span>Total Drafts</span>
          <strong>{totalDrafts}</strong>
        </div>

        <div className="stat-box">
          <span>Long Drafts</span>
          <strong>{longDrafts.length}</strong>
        </div>
      </div>

      <h2 className="draft-heading">📂 Saved Drafts</h2>

      {drafts.length === 0 ? (
        <p className="empty-text">No drafts available.</p>
      ) : (
        <ul className="draft-list">
          {drafts.map((draft, index) => (
            <li key={index} className="draft-item">
              <span>{draft}</span>

              <button
                className="delete-btn"
                onClick={() => dispatch(deleteDraft(index))}
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

export default React.memo(PostComposer);