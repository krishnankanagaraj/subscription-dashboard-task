import { createSlice } from '@reduxjs/toolkit';
const currentTheme = localStorage.getItem('theme')
const initialState = {
  mode: currentTheme || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      localStorage.setItem('theme', state.mode === 'light' ? 'dark' : 'light');
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
