import { type ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      isLoading,
      fullWidth,
      disabled,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={[
          styles.button,
          styles[variant],
          fullWidth ? styles.fullWidth : "",
          className ?? "",
        ].join(" ")}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        {...rest}
      >
        {isLoading && <span className={styles.spinner} aria-hidden="true" />}
        <span className={isLoading ? styles.hiddenLabel : undefined}>
          {children}
        </span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
