import { ButtonLink } from "@/components/ui/button-link";
import { siteContent } from "@/data/landing-page";
import styles from "./final-cta-section.module.css";

export function FinalCtaSection() {
  return (
    <section className={styles.section}>
      <div className={`site-shell ${styles.card}`}>
        <div className={styles.spark} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <p>{siteContent.finalCta.eyebrow}</p>
        <h2>{siteContent.finalCta.title}</h2>
        <ButtonLink href={siteContent.finalCta.action.href} variant="light">
          {siteContent.finalCta.action.label}
        </ButtonLink>
      </div>
    </section>
  );
}
