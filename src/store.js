// This file configures the Redux store and connects the posts reducer.

import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postsSlice';

export default configureStore({
  reducer: {
    posts: postsReducer,
  },
});
