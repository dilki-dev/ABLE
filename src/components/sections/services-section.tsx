import { SectionHeading } from "@/components/ui/section-heading";
import { siteContent } from "@/data/landing-page";
import styles from "./services-section.module.css";

export function ServicesSection() {
  return (
    <section className={styles.section} id="services">
      <div className="site-shell">
        <SectionHeading
          eyebrow="What we do"
          title="One team from first thought to final release."
          description="No handoffs between disconnected specialists. Strategy, design, and development move together from day one."
        />

        <div className={styles.grid}>
          {siteContent.services.map((service) => (
            <article className={styles.card} key={service.number}>
              <span className={styles.number}>{service.number}</span>
              <div className={styles.icon} aria-hidden="true">
                <span />
                <span />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
