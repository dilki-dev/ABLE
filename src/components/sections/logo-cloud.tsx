import { siteContent } from "@/data/landing-page";
import styles from "./logo-cloud.module.css";

export function LogoCloud() {
  return (
    <section className={styles.section} aria-label="Selected clients">
      <div className={`site-shell ${styles.inner}`}>
        <p>Trusted by teams building what&apos;s next</p>
        <div className={styles.logos}>
          {siteContent.clientLogos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
