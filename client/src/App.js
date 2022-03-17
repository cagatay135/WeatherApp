import logo from './logo.svg';

import Search from './components/Search';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

import useLocalStorage from 'use-local-storage'

import { useState } from 'react';
import axios from 'axios';

import { useTranslation } from 'react-i18next';

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  
  const switchTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <div data-theme={theme}>
    <div className="container py-3" >
      <Navbar theme={theme} switchTheme={switchTheme}/>
      <Search />
      <Footer />
    </div>
    </div>
  );
}

export default App;
