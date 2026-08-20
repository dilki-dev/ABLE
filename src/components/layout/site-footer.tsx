import { BrandMark } from "@/components/ui/brand-mark";
import { siteContent } from "@/data/landing-page";
import styles from "./site-footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} id="about">
      <div className={`site-shell ${styles.inner}`}>
        <div className={styles.brandColumn}>
          <BrandMark inverted />
          <p>{siteContent.brand.tagline}</p>
        </div>

        <div className={styles.contactColumn}>
          <p className={styles.label}>Contact</p>
          <a href={`mailto:${siteContent.footer.email}`}>
            {siteContent.footer.email}
          </a>
          <p>{siteContent.footer.location}</p>
        </div>

        <div className={styles.socialColumn}>
          <p className={styles.label}>Follow</p>
          {siteContent.footer.socialLinks.map((link) => (
            <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
              {link.label} <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <p>© {new Date().getFullYear()} ABLE Studio</p>
          <p>Made with care in Sri Lanka</p>
        </div>
      </div>
    </footer>
  );
}
