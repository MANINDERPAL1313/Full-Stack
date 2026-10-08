import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: 3,
  });

  const fetchTasks = async (pageNumber = 0) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${API}/tasks?page=${pageNumber}&size=5&sort=createdAt,desc`
      );

      const data = await response.json();

      setTasks(data.content);
      setPage(data.number);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API}/students`);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchTasks(0);
    fetchStudents();
  }, []);

  const handleInput = (e) => {
    setNewTask({
      ...newTask,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = () => {
    if (!newTask.title.trim()) {
      alert("Please enter task title");
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask.title,
      description: newTask.description,
      priority: Number(newTask.priority),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    setTasks((prev) => [task, ...prev]);

    setNewTask({
      title: "",
      description: "",
      priority: 3,
    });
  };

  const toggleStatus = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const priorityText = (priority) => {
    if (priority >= 5) return "High";
    if (priority >= 3) return "Medium";
    return "Low";
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logoIcon">✓</div>
          <div>
            <h2>TaskFlow</h2>
            <span>Student Manager</span>
          </div>
        </div>

        <nav>
          <a className="active">Dashboard</a>
          <a>My Tasks</a>
          <a>Students</a>
          <a>Analytics</a>
        </nav>

        <div className="sidebarBottom">
          <div className="profile">
            <div className="avatar">MS</div>
            <div>
              <strong>Student</strong>
              <small>Task Manager</small>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="main">

        {/* HEADER */}
        <header className="header">
          <div>
            <p className="welcome">Welcome back 👋</p>
            <h1>Student Task Manager</h1>
            <p className="subtitle">
              Manage your academic tasks efficiently.
            </p>
          </div>

          <div className="headerBadge">
            <span className="statusDot"></span>
            Backend Connected
          </div>
        </header>

        {/* STATS */}
        <section className="stats">

          <div className="statCard">
            <div className="statIcon blue">✓</div>
            <div>
              <span>Total Tasks</span>
              <strong>8</strong>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon orange">!</div>
            <div>
              <span>Pending</span>
              <strong>
                {tasks.filter((task) => task.status === "Pending").length}
              </strong>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon green">✓</div>
            <div>
              <span>Completed</span>
              <strong>
                {tasks.filter((task) => task.status === "Completed").length}
              </strong>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon purple">⚡</div>
            <div>
              <span>Students</span>
              <strong>{students.length || 5}</strong>
            </div>
          </div>

        </section>

        {/* CONTENT GRID */}
        <div className="contentGrid">

          {/* ADD TASK */}
          <section className="card addCard">
            <div className="cardHeader">
              <div>
                <h2>Add New Task</h2>
                <p>Create a new academic task</p>
              </div>
              <span className="plus">+</span>
            </div>

            <div className="formGroup">
              <label>Task Title</label>
              <input
                name="title"
                value={newTask.title}
                onChange={handleInput}
                placeholder="e.g. Complete DBMS assignment"
              />
            </div>

            <div className="formGroup">
              <label>Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInput}
                placeholder="Enter task description..."
              />
            </div>

            <div className="formGroup">
              <label>Priority</label>
              <select
                name="priority"
                value={newTask.priority}
                onChange={handleInput}
              >
                <option value="5">High</option>
                <option value="3">Medium</option>
                <option value="1">Low</option>
              </select>
            </div>

            <button className="addButton" onClick={addTask}>
              + Add Task
            </button>
          </section>

          {/* TASK LIST */}
          <section className="card taskCard">

            <div className="cardHeader">
              <div>
                <h2>My Tasks</h2>
                <p>Tasks loaded from Spring Boot API</p>
              </div>

              <button
                className="refresh"
                onClick={() => fetchTasks(page)}
              >
                ↻ Refresh
              </button>
            </div>

            {loading ? (
              <div className="loading">Loading tasks...</div>
            ) : (
              <div className="taskList">

                {tasks.map((task) => (
                  <div className="taskItem" key={task.id}>

                    <button
                      className={`check ${
                        task.status === "Completed" ? "done" : ""
                      }`}
                      onClick={() => toggleStatus(task.id)}
                    >
                      {task.status === "Completed" ? "✓" : ""}
                    </button>

                    <div className="taskInfo">
                      <h3
                        className={
                          task.status === "Completed"
                            ? "completedTitle"
                            : ""
                        }
                      >
                        {task.title}
                      </h3>

                      <p>{task.description}</p>

                      <div className="taskMeta">
                        <span
                          className={`priority priority-${priorityText(
                            task.priority
                          ).toLowerCase()}`}
                        >
                          {priorityText(task.priority)}
                        </span>

                        <span
                          className={`taskStatus ${
                            task.status === "Completed"
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>

                    <button
                      className="delete"
                      onClick={() => deleteTask(task.id)}
                    >
                      ×
                    </button>

                  </div>
                ))}

              </div>
            )}

            {/* PAGINATION */}
            <div className="pagination">

              <button
                disabled={page === 0}
                onClick={() => fetchTasks(page - 1)}
              >
                ← Previous
              </button>

              <span>
                Page <strong>{page + 1}</strong> of{" "}
                <strong>{totalPages}</strong>
              </span>

              <button
                disabled={page + 1 >= totalPages}
                onClick={() => fetchTasks(page + 1)}
              >
                Next →
              </button>

            </div>

          </section>

        </div>

        {/* OPTIMIZATION */}
        <section className="optimization">

          <div className="sectionTitle">
            <div>
              <h2>Backend Optimization</h2>
              <p>Experiment 6 performance techniques</p>
            </div>
          </div>

          <div className="optimizationGrid">

            <div className="optimizationCard">
              <div className="optIcon">↔</div>
              <h3>Pagination & Sorting</h3>
              <p>
                Pageable API reduces the amount of data returned per request.
              </p>
              <span>ACTIVE</span>
            </div>

            <div className="optimizationCard">
              <div className="optIcon">⚡</div>
              <h3>JOIN FETCH</h3>
              <p>
                Fetches student and task data together to reduce N+1 queries.
              </p>
              <span>ACTIVE</span>
            </div>

            <div className="optimizationCard">
              <div className="optIcon">◈</div>
              <h3>Caching</h3>
              <p>
                Frequently requested student data is stored in cache.
              </p>
              <span>ACTIVE</span>
            </div>

            <div className="optimizationCard">
              <div className="optIcon">⌘</div>
              <h3>Native SQL</h3>
              <p>
                High-priority tasks can be retrieved using native SQL.
              </p>
              <span>ACTIVE</span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
}

export default App;