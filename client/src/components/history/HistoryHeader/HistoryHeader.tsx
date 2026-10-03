import styles from './HistoryHeader.module.css';

interface HistoryHeaderProps {
  total: number;
}

export function HistoryHeader({ total }: HistoryHeaderProps) {
  return (
    <header className={styles.header}>
      <h2>Your history</h2>
      <span className={styles.count}>
        {total} {total === 1 ? 'entry' : 'entries'}
      </span>
    </header>
  );
}