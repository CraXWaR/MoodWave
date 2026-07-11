import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";

import { RootLayout } from "./components/layout/RootLayout/RootLayout";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";

import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";
import CheckInPage from "./pages/CheckInPage/CheckInPage";

import "./App.css";

function HomePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>MoodWave 🎧</h1>

      <p>Hi There!</p>
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
            {/* TODO GuestOnlyRoute */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/check-in" element={<CheckInPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
