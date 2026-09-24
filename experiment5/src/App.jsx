import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { useSelector } from "react-redux";
import Calendar from "./components/Calendar";
import "./App.css";

function App() {
  const posts = useSelector((state) => state.posts);

  // Optimization switches
  const [reactMemoEnabled, setReactMemoEnabled] =
    useState(true);

  const [callbackEnabled, setCallbackEnabled] =
    useState(true);

  const [memoEnabled, setMemoEnabled] =
    useState(true);

  const [liveClock, setLiveClock] =
    useState(false);

  const [currentTime, setCurrentTime] =
    useState(new Date());

  const [calendarRenders, setCalendarRenders] =
    useState(0);

  const [cardRenders, setCardRenders] =
    useState({});

  // Live clock
  useEffect(() => {
    if (!liveClock) return;

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [liveClock]);

  // Calendar render counter
  const handleCalendarRender = useCallback(() => {
    setCalendarRenders((count) => count + 1);
  }, []);

  // Individual card render counter
  const handleCardRender = useCallback(
    (id, count) => {
      setCardRenders((current) => ({
        ...current,
        [id]: count,
      }));
    },
    []
  );

  // Reset counters
  const resetCounters = () => {
    setCalendarRenders(0);
    setCardRenders({});
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="header">

        <div>
          <h1>Interactive Calendar</h1>

          <p>
            Drag events between days, then flip the
            switches below to see, in real time,
            what React.memo, useCallback, and useMemo
            actually do to re-renders.
          </p>
        </div>

        {/* CONTROLS */}
        <div className="controls">

          <label>
            <input
              type="checkbox"
              checked={reactMemoEnabled}
              onChange={(e) =>
                setReactMemoEnabled(e.target.checked)
              }
            />

            React.memo
          </label>

          <label>
            <input
              type="checkbox"
              checked={callbackEnabled}
              onChange={(e) =>
                setCallbackEnabled(e.target.checked)
              }
            />

            useCallback
          </label>

          <label>
            <input
              type="checkbox"
              checked={memoEnabled}
              onChange={(e) =>
                setMemoEnabled(e.target.checked)
              }
            />

            useMemo
          </label>

          <label>
            <input
              type="checkbox"
              checked={liveClock}
              onChange={(e) =>
                setLiveClock(e.target.checked)
              }
            />

            Live Clock
          </label>

        </div>
      </header>

      {/* MAIN */}
      <main className="main-layout">

        {/* CALENDAR */}
        <section className="calendar-section">

          <Calendar
            onRender={handleCalendarRender}
            onCardRender={handleCardRender}
          />

        </section>

        {/* RENDER MONITOR */}
        <aside className="monitor">

          <h2>RENDER MONITOR</h2>

          {/* SUMMARY */}
          <div className="monitor-summary">

            <div>
              <strong>
                {calendarRenders}
              </strong>

              <span>
                Total renders logged
              </span>
            </div>

            <div>
              <strong>
                {Object.keys(cardRenders).length}
                /{posts.length}
              </strong>

              <span>
                Cards that have rendered
              </span>
            </div>

          </div>

          {/* CARD RENDER COUNTS */}
          <div className="render-list">

            {posts.map((post) => {

              const count =
                cardRenders[post.id] || 0;

              const progress =
                Math.min(count * 20, 100);

              return (
                <div
                  className="render-row"
                  key={post.id}
                >

                  <div className="render-row-top">

                    <span>
                      {post.title}
                    </span>

                    <strong>
                      {count}
                    </strong>

                  </div>

                  <div className="render-bar">

                    <div
                      className="render-bar-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

          {/* LIVE CLOCK */}
          <div className="monitor-card">

            <span>
              Live Clock
            </span>

            <strong>
              {liveClock
                ? currentTime.toLocaleTimeString()
                : "OFF"}
            </strong>

          </div>

          {/* RESET */}
          <button
            className="reset-button"
            onClick={resetCounters}
          >
            Reset Counters
          </button>

        </aside>

      </main>

    </div>
  );
}

export default App;