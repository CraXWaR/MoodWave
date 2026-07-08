import { Link } from "react-router-dom";

import { authService } from "../../../services/auth.service";
import { validateLogin, type LoginValues } from "../../../helpers/auth.validation";
import { useAuthForm } from "../../../hooks/useAuthForm";

import AuthLayout from "../../../components/auth/AuthLayout/AuthLayout";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";

import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const { values, errors, serverError, isSubmitting, handleChange, handleSubmit } =
    useAuthForm<LoginValues>({ email: '', password: '' }, validateLogin, async (values) => {
      await authService.login(values);
      // TODO: redirect to the check-in / dashboard route once it exists
    });

  return (
    <AuthLayout eyebrow="Welcome back" title="Sign in">
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange("password")}
          error={errors.password}
        />

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
