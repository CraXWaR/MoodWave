import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";

import { RootLayout } from "./components/layout/RootLayout/RootLayout";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { GuestOnlyRoute } from "./components/routing/GuestOnlyRoute";

{
  /*GuestOnlyPages*/
}
import GuestHomePage from "./pages/Guest/GuestHomePage";
import LoginPage from "./pages/Auth/LoginPage/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage/RegisterPage";

{
  /*ProtectedPages*/
}
import ProfilePage from "./pages/Profile/ProfilePage";
import PlaylistGeneratorPage from "./pages/GeneratePlaylist/GeneratePlaylistPage";

import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<GuestHomePage />} />
            {/* GuestOnlyRoute */}
            <Route element={<GuestOnlyRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            {/* ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/generate-playlist" element={<PlaylistGeneratorPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
