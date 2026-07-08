import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  rightElement?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, rightElement, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={[styles.field, className ?? ""].join(" ")}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <div
          className={[
            styles.inputWrap,
            error ? styles.inputWrapError : "",
          ].join(" ")}
        >
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            aria-invalid={Boolean(error) || undefined}
            aria-describedby={
              [hintId, errorId].filter(Boolean).join(" ") || undefined
            }
            {...rest}
          />
          {rightElement && (
            <div className={styles.rightElement}>{rightElement}</div>
          )}
        </div>
        {hint && !error && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
