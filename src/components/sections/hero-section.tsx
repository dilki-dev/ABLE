import { ButtonLink } from "@/components/ui/button-link";
import { siteContent } from "@/data/landing-page";
import styles from "./hero-section.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{siteContent.hero.eyebrow}</p>
          <h1>{siteContent.hero.title}</h1>
          <p className={styles.description}>{siteContent.hero.description}</p>

          <div className={styles.actions}>
            <ButtonLink href={siteContent.hero.primaryAction.href}>
              {siteContent.hero.primaryAction.label}
            </ButtonLink>
            <ButtonLink
              href={siteContent.hero.secondaryAction.href}
              variant="secondary"
            >
              {siteContent.hero.secondaryAction.label}
            </ButtonLink>
          </div>

          <p className={styles.availability}>
            <span aria-hidden="true" />
            {siteContent.hero.availability}
          </p>
        </div>

        <div className={styles.visual} aria-label="Sample project dashboard preview">
          <div className={styles.orbit} aria-hidden="true" />
          <div className={styles.dashboard}>
            <div className={styles.dashboardHeader}>
              <div className={styles.windowDots} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <span>ABLE / Project pulse</span>
              <span className={styles.live}>Live</span>
            </div>

            <div className={styles.dashboardBody}>
              <div className={styles.scoreCard}>
                <span>Launch readiness</span>
                <strong>86%</strong>
                <div className={styles.progressTrack}>
                  <div />
                </div>
                <small>↑ 14% this week</small>
              </div>

              <div className={styles.activityCard}>
                <span>Momentum</span>
                <div className={styles.chart} aria-hidden="true">
                  {[32, 49, 42, 68, 61, 84, 92].map((height, index) => (
                    <i key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>

              <div className={styles.taskCard}>
                <span className={styles.taskIcon}>✓</span>
                <div>
                  <strong>Design system ready</strong>
                  <small>42 reusable components</small>
                </div>
              </div>

              <div className={styles.teamCard}>
                <div className={styles.avatars} aria-hidden="true">
                  <span>A</span>
                  <span>M</span>
                  <span>K</span>
                </div>
                <p>One focused team</p>
              </div>
            </div>
          </div>
          <div className={styles.note}>Clear thinking. Sharp execution.</div>
        </div>
      </div>

      <div className={`site-shell ${styles.stats}`}>
        {siteContent.stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
