import Link from 'next/link'

import { SectionHeading } from '@/components/site/SectionHeading'
import { getServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { formatAudienceLabel } from '@/lib/utils'

import styles from '../site.module.scss'

export const metadata = buildMetadata({
  title: 'Услуги',
  description:
    'Капитальный ремонт квартир, домов, fit-out коммерческих помещений, инженерные сети, отделка под ключ и технадзор.',
  pathname: '/services',
})

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <SectionHeading
          eyebrow="Услуги"
          title="Производственные блоки, из которых собирается понятный ремонт."
          body="Можем подключиться на весь цикл или закрыть отдельный участок. Но в любом случае работаем так, будто отвечаем за объект целиком."
        />
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.slug}>
              <span className={styles.smallLabel}>{formatAudienceLabel(service.audience)}</span>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardText}>{service.intro}</p>
              <div className={styles.metricValue}>{service.metricValue}</div>
              <p className={styles.muted}>{service.metricLabel}</p>
              <ul className={styles.cardList}>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className={styles.linkArrow} href={`/services/${service.slug}`}>
                Подробнее
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
