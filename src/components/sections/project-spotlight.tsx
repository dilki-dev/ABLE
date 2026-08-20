import { siteContent } from "@/data/landing-page";
import styles from "./project-spotlight.module.css";

export function ProjectSpotlight() {
  return (
    <section className={styles.section} id="work">
      <div className="site-shell">
        <div className={styles.header}>
          <p>{siteContent.project.eyebrow}</p>
          <span>Case study / 2026</span>
        </div>

        <div className={styles.feature}>
          <div className={styles.visual} aria-label="Arcline product interface concept">
            <div className={styles.grid} aria-hidden="true" />
            <div className={styles.phone}>
              <div className={styles.phoneTop}>
                <span>9:41</span>
                <span>●●●</span>
              </div>
              <p>Good morning, Maya</p>
              <strong>$24,680.40</strong>
              <small>Total balance</small>
              <div className={styles.miniChart} aria-hidden="true">
                <svg viewBox="0 0 260 100" role="img">
                  <path d="M0 86 C35 79, 34 45, 70 57 S120 82, 145 38 S198 47, 260 5" />
                </svg>
              </div>
              <div className={styles.transaction}>
                <span>↗</span>
                <div>
                  <b>Growth portfolio</b>
                  <small>Updated just now</small>
                </div>
                <strong>+8.4%</strong>
              </div>
            </div>
            <div className={styles.floatingCard}>
              <span>Weekly progress</span>
              <strong>+12.8%</strong>
              <div><i /></div>
            </div>
          </div>

          <div className={styles.copy}>
            <div className={styles.tags}>
              {siteContent.project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <h2>{siteContent.project.title}</h2>
            <p>{siteContent.project.description}</p>

            <div className={styles.results}>
              {siteContent.project.results.map((result) => (
                <div key={result.label}>
                  <strong>{result.value}</strong>
                  <span>{result.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
