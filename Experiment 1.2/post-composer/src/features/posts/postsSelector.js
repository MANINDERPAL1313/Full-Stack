import { createSelector } from "reselect";

// Base Selectors
const selectPostsState = (state) => state.posts;

export const selectPost = createSelector(
  [selectPostsState],
  (posts) => posts.post
);

export const selectPlatform = createSelector(
  [selectPostsState],
  (posts) => posts.platform
);

export const selectDrafts = createSelector(
  [selectPostsState],
  (posts) => posts.drafts
);

export const selectTotalDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.length
);export const selectLongDrafts = createSelector(
  [selectDrafts],
  (drafts) => drafts.filter((draft) => draft.length > 10)
);