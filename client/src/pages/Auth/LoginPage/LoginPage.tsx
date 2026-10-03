import { Link, useLocation, useNavigate } from "react-router-dom";

import { authService } from "../../../services/auth.service";
import { validateLogin } from "../../../helpers/auth.validation";
import { useAuthForm } from "../../../hooks/useAuthForm";
import { useAuth } from "../../../context/auth.context";

import type { LoginValues } from "../../../types/auth.type";

import { AuthLayout } from "../../../components/auth/AuthLayout/AuthLayout";
import { Input } from "../../../components/ui/Input/Input";
import { Button } from "../../../components/ui/Button/Button";
import { SpotifyButton } from "../../../components/ui/SpotifyButton/SpotifyButton";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = (location.state as { successMessage?: string } | null)?.successMessage;

  const { values, errors, allErrors, isSubmitting, handleChange, handleSubmit } = useAuthForm<LoginValues>(
    { email: "", password: "" },
    validateLogin,
    async (values) => {
      const res = await authService.login(values);
      setAuthUser({
        token: res.token,
        user: { id: res.id, email: res.email, hashedPassword: res.hashedPassword, createdAt: res.createdAt },
      });
      navigate("/profile");
    },
  );

  return (
    <AuthLayout eyebrow="Welcome back" title="Sign in">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {successMessage && (
          <div className={styles.success}>
            <p className={styles.successMessage}>{successMessage}</p>
          </div>
        )}

        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange("email")}
          invalid={!!errors.email}
          describedBy={allErrors.length > 0 ? "form-errors" : undefined}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange("password")}
          invalid={!!errors.password}
          describedBy={allErrors.length > 0 ? "form-errors" : undefined}
        />

        {allErrors.length > 0 && (
          <div className={styles.errors}>
            {allErrors.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        )}

        <SpotifyButton />

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Sign in
        </Button>

        <p className={styles.footer}>
          New to MoodWave? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
