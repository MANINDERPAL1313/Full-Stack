import {
  memo,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../store/postsSlice";

const weekDays = [
  { name: "Mon", date: "2026-09-28" },
  { name: "Tue", date: "2026-09-29" },
  { name: "Wed", date: "2026-09-30" },
  { name: "Thu", date: "2026-10-01" },
  { name: "Fri", date: "2026-10-02" },
  { name: "Sat", date: "2026-10-03" },
  { name: "Sun", date: "2026-10-04" },
];

const categoryClass = {
  Meeting: "event-meeting",
  Deadline: "event-deadline",
  "Focus block": "event-focus",
  Personal: "event-personal",
};

const noop = () => {};

const EventCard = memo(function EventCard({
  post,
  onDragStart,
  onRender = noop,
}) {
  const renderCount = useRef(0);

  renderCount.current += 1;

  useEffect(() => {
    onRender(post.id, renderCount.current);
  }, [post.id, onRender]);

  return (
    <div
      className={`calendar-event ${
        categoryClass[post.category] || "event-meeting"
      }`}
      draggable
      onDragStart={(event) =>
        onDragStart(event, post)
      }
      onClick={() =>
        alert(`Selected Post: ${post.title}`)
      }
    >
      <div className="event-time">
        {post.time}
      </div>

      <div className="event-title">
        {post.title}
      </div>
    </div>
  );
});

const Calendar = memo(function Calendar({
  onRender = noop,
  onCardRender = noop,
}) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    onRender();
  }, [posts, onRender]);

  const eventsByDay = useMemo(() => {
    const result = {};

    weekDays.forEach((day) => {
      result[day.date] = posts.filter(
        (post) => post.date === day.date
      );
    });

    return result;
  }, [posts]);

  const handleDragStart = (event, post) => {
    event.dataTransfer.setData(
      "postId",
      String(post.id)
    );
  };

  const handleDrop = (event, date) => {
    event.preventDefault();

    const postId = Number(
      event.dataTransfer.getData("postId")
    );

    const post = posts.find(
      (item) => item.id === postId
    );

    if (!post) return;

    dispatch(
      updatePost({
        ...post,
        date,
      })
    );
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="custom-calendar">

      <div className="week-header">
        <div className="week-title">
          WEEK VIEW
        </div>

        <div className="category-tags">
          <span className="tag meeting-tag">
            Meeting
          </span>

          <span className="tag deadline-tag">
            Deadline
          </span>

          <span className="tag focus-tag">
            Focus block
          </span>

          <span className="tag personal-tag">
            Personal
          </span>
        </div>
      </div>

      <div className="week-grid">
        {weekDays.map((day) => (
          <div
            className="day-column"
            key={day.date}
            onDragOver={handleDragOver}
            onDrop={(event) =>
              handleDrop(event, day.date)
            }
          >
            <div className="day-name">
              {day.name}
            </div>

            <div className="day-events">
              {eventsByDay[day.date]?.map((post) => (
                <EventCard
                  key={post.id}
                  post={post}
                  onDragStart={handleDragStart}
                  onRender={onCardRender}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
});

export default Calendar;