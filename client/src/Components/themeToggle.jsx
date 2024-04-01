import React, { useEffect, useState } from 'react';
import { FaCloudMoon } from "react-icons/fa";
import { FaCloudSun } from "react-icons/fa";


// toggle the theme
function ThemeToggle() {

  const [theme, setTheme] = useState(null);

  // check if user's theme is already defined. If not, default to dark mode.
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark'); // set dark state
      applyDarkTheme(); // apply the page theme is darak
    } else {
      setTheme('light'); // else light 
      applyLightTheme();
    }
  }, []);

  //theme dark method
  const applyDarkTheme = () => {
    document.documentElement.classList.add('dark');
    document.body.classList.add('dark');
    document.documentElement.style.backgroundColor = '#121212'; // Set  dark background color
  };

  //theme light method
  const applyLightTheme = () => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
    document.documentElement.style.backgroundColor = '#ffffff'; // Set your light background color
  };

  // toggle the theme
  useEffect(() => {
    if (theme === 'dark') {
      applyDarkTheme();
    } else {
      applyLightTheme();
    }
  }, [theme]);

  // theme switch method
  const themeSwitch = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div>
      {/**check theme and render task */}
      <button
        onClick={themeSwitch}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className=' py-1 lg:py-2'>
        {theme === 'dark' ? <FaCloudMoon className=' text-2xl dark:text-yellow-50' /> : <FaCloudSun className=' text-2xl dark:text-yellow-50 '/>}
      </button>
    </div>
  );
}

export default ThemeToggle;

