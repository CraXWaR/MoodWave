import { type ChangeEvent, type FormEvent, useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;

export function useAuthForm<T extends Record<string, string>>(
  initialValues: T,
  validate: (values: T) => Errors<T>,
  onSubmit: (values: T) => Promise<void>,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}
