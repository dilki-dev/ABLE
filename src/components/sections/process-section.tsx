import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/data/landing-page";
import styles from "./process-section.module.css";

export function ProcessSection() {
  return (
    <section className={styles.section} id="process">
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.intro}>
          <SectionHeading
            eyebrow="How we work"
            title="A simple path through complex work."
            description="Short feedback loops, visible progress, and clear decisions keep every project moving."
            light
          />
          <div className={styles.pulse} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>

        <ol className={styles.steps}>
          {siteContent.process.map((step) => (
            <li key={step.number}>
              <span className={styles.number}>{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <span className={styles.duration}>{step.duration}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
