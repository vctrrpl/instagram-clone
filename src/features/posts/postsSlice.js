// This file manages Instagram-like posts using Redux state management.
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    image: 'https://picsum.photos/id/123/500/500',
    description: 'Post 1 description',
    date: new Date().toISOString(),
    likes: 15,
    comments: 5,
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/124/500/500',
    description: 'Post 2 description',
    date: new Date().toISOString(),
    likes: 30,
    comments: 10,
  },
];

// When someone wants to add a new post, they call createPost.
// It takes some information about the post from user image, description.
// It creates a new post with:
// - a unique ID (like serial number for the post).
// - the image and description.
// - the current date and time.
// - Starts with 0 likes and 0 comments.

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    createPost: (state, action) => {
      const newPost = {
        id: Date.now(),
        image: action.payload.image,
        description: action.payload.description,
        date: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };
      state.push(newPost);
    },
  },
});

export const { createPost } = postsSlice.actions;

export default postsSlice.reducer;
