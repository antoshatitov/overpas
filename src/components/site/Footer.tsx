import Link from 'next/link'

import type { SiteSettingsData } from '@/content/seed'

import styles from './Footer.module.scss'

type FooterProps = {
  settings: SiteSettingsData
}

export function Footer({ settings }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>Overpas</span>
          <p className={styles.copy}>
            Ремонт жилых и коммерческих помещений в Калининграде и области. Работаем
            как инженерный подрядчик: прозрачная смета, график, контроль этапов и
            аккуратная сдача объекта.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.label}>Связь</div>
            <a className={styles.value} href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>
              {settings.phone}
            </a>
            <div className={styles.links}>
              <a href={`tel:${settings.secondaryPhone.replace(/[^\d+]/g, '')}`}>
                {settings.secondaryPhone}
              </a>
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.label}>Адрес</div>
            <div className={styles.value}>{settings.address}</div>
            <div className={styles.links}>
              <span>{settings.city}</span>
              <span>{settings.workingHours}</span>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.label}>Навигация</div>
            <div className={styles.links}>
              <Link href="/services">Услуги</Link>
              <Link href="/cases">Кейсы</Link>
              <Link href="/about">О компании</Link>
              <Link href="/contacts">Контакты</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} {settings.companyName}</span>
          <span>{settings.city} · {settings.region}</span>
        </div>
      </div>
    </footer>
  )
}
