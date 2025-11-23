import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/themeSlice';
import { Sun, Moon } from 'lucide-react';
import Button from './Button';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => dispatch(toggleTheme())}
      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      aria-label="Toggle theme"
    >
      {mode === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
