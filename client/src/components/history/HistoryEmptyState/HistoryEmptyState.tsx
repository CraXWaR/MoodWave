import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button/Button';

import styles from './HistoryEmptyState.module.css';

export function HistoryEmptyState() {
  const navigate = useNavigate();

  return (
    <div className={styles.state}>
      <span className={styles.emoji} aria-hidden="true">🌱</span>
      <p className={styles.title}>No check-ins yet</p>
      <p className={styles.subtitle}>
        Your mood history will show up here once you start logging.
      </p>
      <Button variant="primary" onClick={() => navigate('/check-in')}>
        Log your first mood
      </Button>
    </div>
  );
}