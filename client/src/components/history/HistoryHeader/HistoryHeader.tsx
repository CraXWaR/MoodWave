import styles from './HistoryHeader.module.css';

interface HistoryHeaderProps {
  total: number;
}

export function HistoryHeader({ total }: HistoryHeaderProps) {
  return (
    <header className={styles.header}>
      <h1>Your history</h1>
      <span className={styles.count}>
        {total} {total === 1 ? 'entry' : 'entries'}
      </span>
    </header>
  );
}