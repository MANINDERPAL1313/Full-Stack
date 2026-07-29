import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: "",
  platform: "Twitter",
  drafts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,

  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },

    setPlatform: (state, action) => {
      state.platform = action.payload;
    },

    saveDraft: (state) => {
      if (state.post.trim() !== "") {
        state.drafts.push(state.post);
        state.post = "";
      }
    },

    deleteDraft: (state, action) => {
      state.drafts.splice(action.payload, 1);
    },
  },
});

export const {
  setPost,
  setPlatform,
  saveDraft,
  deleteDraft,
} = postsSlice.actions;

export default postsSlice.reducer;