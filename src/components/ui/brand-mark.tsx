import styles from "./brand-mark.module.css";

type BrandMarkProps = {
  inverted?: boolean;
};

export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <span className={`${styles.brand} ${inverted ? styles.inverted : ""}`}>
      <span className={styles.symbol} aria-hidden="true">
        <span />
        <span />
      </span>
      <span className={styles.wordmark}>ABLE</span>
    </span>
  );
}
