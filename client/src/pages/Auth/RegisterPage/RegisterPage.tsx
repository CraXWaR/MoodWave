import { Link, useNavigate } from "react-router-dom";

import { authService } from "../../../services/auth.service";
import { validateRegister } from "../../../helpers/auth.validation";
import { useAuthForm } from "../../../hooks/useAuthForm";

import type { RegisterValues } from "../../../types/auth.type";

import { AuthLayout } from "../../../components/auth/AuthLayout/AuthLayout";
import { Input } from "../../../components/ui/Input/Input";
import { Button } from "../../../components/ui/Button/Button";

import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { values, errors, allErrors, isSubmitting, handleChange, handleSubmit } = useAuthForm<RegisterValues>(
    { email: "", password: "", confirmPassword: "" },
    validateRegister,
    async (values) => {
      const response = await authService.register(values);
      navigate("/login", { state: { successMessage: response.message } });
    },
  );

  return (
    <AuthLayout eyebrow="Start tracking" title="Create your account">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange("password")}
          invalid={!!errors.password}
          describedBy={allErrors.length > 0 ? "form-errors" : undefined}
        />

        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.confirmPassword}
          onChange={handleChange("confirmPassword")}
          invalid={!!errors.confirmPassword}
          describedBy={allErrors.length > 0 ? "form-errors" : undefined}
        />

        {allErrors.length > 0 && (
          <div className={styles.errors}>
            {allErrors.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Create account
        </Button>

        <p className={styles.footer}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
