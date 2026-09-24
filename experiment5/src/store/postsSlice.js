import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Design review",
    date: "2026-09-28",
    time: "10:00",
    category: "Meeting",
  },
  {
    id: 2,
    title: "Ship v2.3",
    date: "2026-09-28",
    time: "16:00",
    category: "Deadline",
  },
  {
    id: 3,
    title: "1:1 with Sam",
    date: "2026-09-29",
    time: "09:30",
    category: "Meeting",
  },
  {
    id: 4,
    title: "Write proposal",
    date: "2026-09-30",
    time: "13:00",
    category: "Focus block",
  },
  {
    id: 5,
    title: "Client demo",
    date: "2026-10-01",
    time: "15:00",
    category: "Meeting",
  },
  {
    id: 6,
    title: "Portfolio review",
    date: "2026-10-01",
    time: "18:00",
    category: "Focus block",
  },
  {
    id: 7,
    title: "Grocery run",
    date: "2026-10-03",
    time: "10:00",
    category: "Personal",
  },
  {
    id: 8,
    title: "Sprint planning",
    date: "2026-10-04",
    time: "11:00",
    category: "Meeting",
  },
];

const postsSlice = createSlice({
  name: "posts",

  initialState,

  reducers: {
    addPost: (state, action) => {
      state.push(action.payload);
    },

    updatePost: (state, action) => {
      const index = state.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) {
        state[index] = action.payload;
      }
    },

    deletePost: (state, action) => {
      return state.filter(
        (post) => post.id !== action.payload
      );
    },
  },
});

export const {
  addPost,
  updatePost,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;