import Search from "./components/Search";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import useLocalStorage from "use-local-storage";

function App() {
  // Theme settings
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Local storage settings for theme
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  // Theme switch function
  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div data-theme={theme}>
      <div className="container py-3">
        <Navbar theme={theme} switchTheme={switchTheme} />
        <Search />
        <Footer />
      </div>
    </div>
  );
}

export default App;
