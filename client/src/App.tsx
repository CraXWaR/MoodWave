import { Routes, Route, Link, useLocation } from 'react-router-dom';

import LoginPage from './pages/Auth/LoginPage/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage/RegisterPage';

import './App.css';

function Nav() {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/login', label: 'Login' },
    { to: '/register', label: 'Register' },
  ];

  return (
    <nav className="nav">
      <span className="wordmark">MoodWave</span>
      <div className="links">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={['link', location.pathname === link.to ? 'active' : ''].join(' ')}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function HomePage() {


  return (
    <div style={{ padding: 20 }}>
      <h1>MoodWave 🎧</h1>

      <p>Loading...</p>
    </div>
  );
}

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;