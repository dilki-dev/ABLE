import { siteContent } from "@/data/landing-page";
import styles from "./testimonial-section.module.css";

export function TestimonialSection() {
  return (
    <section className={styles.section} aria-label="Client testimonial">
      <div className={`site-shell ${styles.inner}`}>
        <span className={styles.quoteMark} aria-hidden="true">
          “
        </span>
        <blockquote>
          <p>{siteContent.testimonial.quote}</p>
          <footer>
            <span className={styles.avatar} aria-hidden="true">
              MP
            </span>
            <div>
              <strong>{siteContent.testimonial.author}</strong>
              <span>{siteContent.testimonial.role}</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
