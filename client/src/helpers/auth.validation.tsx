export type LoginValues = {
  email: string;
  password: string;
};

export type RegisterValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors<T> = Partial<Record<keyof T, string>>;

export function validateLogin(values: LoginValues): Errors<LoginValues> {
  const errors: Errors<LoginValues> = {};
  if (!values.email.trim()) errors.email = "Email is required";
  if (!values.password) errors.password = "Password is required";
  return errors;
}

export function validateRegister(
  values: RegisterValues,
): Errors<RegisterValues> {
  const errors: Errors<RegisterValues> = {};
  if (!values.email.trim()) errors.email = "Email is required";
  if (values.password.length < 8)
    errors.password = "Must be at least 8 characters";
  if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords don't match";
  }
  return errors;
}
