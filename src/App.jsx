import Header from "./components/Header";
import { useState } from "react";
import './App.css';
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <div className={`app-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        {/* Sticky full-width header */}
        <div className="header-wrapper">
          <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
        {/* Main content */}
        <div className="main-content">
          <Dashboard darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;