import { siteContent } from "@/data/landing-page";
import { BrandMark } from "@/components/ui/brand-mark";
import styles from "./site-header.module.css";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <div className={`site-shell ${styles.inner}`}>
        <a className={styles.logo} href="#top" aria-label="ABLE home">
          <BrandMark />
        </a>

        <nav className={styles.navigation} aria-label="Primary navigation">
          {siteContent.navigation.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.contact} href="mailto:hello@able.studio">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  );
}
