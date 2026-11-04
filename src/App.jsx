import { useEffect, useState } from 'react';

import Icon from './components/Icon';
import MainContent from './components/MainContent';

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      /* storage unavailable, ignore */
    }
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <>
      <header>
        <button
          className="btn btn-ghost btn-icon theme-toggle"
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
          <Icon name={isDark ? 'sun' : 'moon'} />
        </button>
        <div id="logo-img">
          <Icon name="workflow" />
        </div>
        <h1>
          Learn & Master <span className="accent">Jenkins</span>
        </h1>
      </header>
      <MainContent />
      <footer>Built with React + Vite · Automated by Jenkins · Packaged with Docker</footer>
    </>
  );
}

export default App;
