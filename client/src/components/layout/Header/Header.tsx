import { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CalendarIcon } from "lucide-react";

import { useAuth } from "../../../context/auth.context";
import { MoodCalendar } from "../../calendar/MoodCalendar";


import styles from "./Header.module.css";

const navLinks = [
  { to: "/home", label: "Home", end: true },
  { to: "/check-in", label: "Check-in", end: false },
  {to: "/profile", label: "Profile", end: false },
  {to: "/generate-playlist", label: "Generate Playlist", end: false },
];

function linkClass({ isActive }: { isActive: boolean }) {
  return [styles.link, isActive ? styles.active : ""].join(" ");
}

function mobileLinkClass({ isActive }: { isActive: boolean }) {
  return [styles.mobileLink, isActive ? styles.active : ""].join(" ");
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isCalendarOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    navigate("/login");
  }

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.wordmark} end onClick={closeMenu}>
        MoodWave
      </NavLink>

      <nav className={styles.nav}>
        {navLinks.map(({ to, label, end }) => (
          <NavLink key={to} to={to} end={end} className={linkClass}>
            {label}
          </NavLink>
        ))}
      </nav>

      {!loading && (
        <div className={styles.actions}>
          {isLoggedIn ? (
            <>
              <div className={styles.calendarWrapper} ref={calendarRef}>
                <button
                  type="button"
                  className={styles.calendarToggle}
                  aria-label={isCalendarOpen ? "Close mood calendar" : "Open mood calendar"}
                  aria-expanded={isCalendarOpen}
                  onClick={() => setIsCalendarOpen((open) => !open)}
                >
                  <CalendarIcon size={18} strokeWidth={1.75} />
                </button>

                {isCalendarOpen && (
                  <div className={styles.calendarPopover}>
                    <MoodCalendar />
                  </div>
                )}
              </div>

              <span className={styles.userEmail}>{user?.email}</span>
              <button type="button" className={styles.logoutButton} onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={styles.loginLink}>
                Log in
              </NavLink>
              <NavLink to="/register" className={styles.signupButton}>
                Sign up
              </NavLink>
            </>
          )}
        </div>
      )}

      <button
        type="button"
        className={styles.menuToggle}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-drawer"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className={[styles.bar, styles.barTop, isMenuOpen ? styles.barTopOpen : ""].join(" ")} />
        <span className={[styles.bar, styles.barMid, isMenuOpen ? styles.barMidOpen : ""].join(" ")} />
        <span className={[styles.bar, styles.barBottom, isMenuOpen ? styles.barBottomOpen : ""].join(" ")} />
      </button>

      <div
        className={[styles.backdrop, isMenuOpen ? styles.backdropOpen : ""].join(" ")}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div id="mobile-drawer" className={[styles.drawer, isMenuOpen ? styles.drawerOpen : ""].join(" ")}>
        <nav className={styles.mobileNav}>
          {navLinks.map(({ to, label, end }, i) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={mobileLinkClass}
              onClick={closeMenu}
              style={{
                transitionDelay: isMenuOpen ? `${60 + i * 40}ms` : "0ms",
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {!loading && (
          <div className={styles.mobileActions}>
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className={styles.mobileCalendarToggle}
                  onClick={() => {
                    closeMenu();
                    setIsCalendarOpen(true);
                  }}
                >
                  <CalendarIcon /> Mood calendar
                </button>
                <span className={styles.mobileUserEmail}>{user?.email}</span>
                <button type="button" className={styles.mobileLogoutButton} onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={styles.mobileLoginLink} onClick={closeMenu}>
                  Log in
                </NavLink>
                <NavLink to="/register" className={styles.mobileSignupButton} onClick={closeMenu}>
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
