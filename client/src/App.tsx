import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";

import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";

import { RootLayout } from "./components/layout/RootLayout/RootLayout";

import "./App.css";

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
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
