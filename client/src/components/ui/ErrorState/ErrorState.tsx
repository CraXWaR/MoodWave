import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message = "Something went wrong. Try refreshing.", onRetry }: ErrorStateProps) {
  return (
    <div className={styles.state} role="alert">
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
