import styles from "./spinner.module.scss";

interface LoadingSpinnerProps {
  show?: boolean;
  backdrop?: boolean;
}

const LoadingSpinner = ({
  show = true,
  backdrop = false,
}: LoadingSpinnerProps) => {
  if (!show) return null;

  if (backdrop) {
    <div className={styles.backdrop}>
      <div className={styles.loader} />
    </div>;
  }

  return <div className={styles.loader} />;
};

export default LoadingSpinner;
