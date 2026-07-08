import { Link } from 'react-router-dom';

import { authService } from '../../../services/auth.service';
import { validateRegister, type RegisterValues } from '../../../helpers/auth.validation';
import { useAuthForm } from '../../../hooks/useAuthForm';

import AuthLayout from '../../../components/auth/AuthLayout/AuthLayout';
import Input from '../../../components/ui/Input/Input';
import Button from '../../../components/ui/Button/Button';

import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const { values, errors, serverError, isSubmitting, handleChange, handleSubmit } =
    useAuthForm<RegisterValues>(
      { email: '', password: '', confirmPassword: '' },
      validateRegister,
      async (values) => {
        await authService.register(values);
        // TODO: redirect to the check-in / dashboard route once it exists
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
          onChange={handleChange('email')}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.password}
          onChange={handleChange('password')}
          error={errors.password}
        />

        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
        />

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