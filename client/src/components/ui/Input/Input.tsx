import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  invalid?: boolean;
  hint?: string;
  rightElement?: ReactNode;
  describedBy?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, invalid, hint, rightElement, describedBy, id, className, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className={[styles.field, className ?? ""].join(" ")}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        <div className={[styles.inputWrap, invalid ? styles.inputWrapError : ""].join(" ")}>
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            aria-invalid={invalid || undefined}
            aria-describedby={[hintId, describedBy].filter(Boolean).join(" ") || undefined}
            {...rest}
          />
          {rightElement && <div className={styles.rightElement}>{rightElement}</div>}
        </div>
        {hint && (
          <p id={hintId} className={styles.hint}>
            {hint}
          </p>
        )}
      </div>
    );
  },
);

export default Input;
