import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LeadForm } from '@/components/site/LeadForm'
import { SectionHeading } from '@/components/site/SectionHeading'
import { casesSeed } from '@/content/seed'
import { getCaseBySlug, getServices } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { formatAudienceLabel } from '@/lib/utils'

import styles from '../../site.module.scss'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return casesSeed.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const item = await getCaseBySlug(slug)

  if (!item) {
    return buildMetadata({
      title: 'Кейс не найден',
      description: 'Запрашиваемый кейс не найден.',
    })
  }

  return buildMetadata({
    title: item.title,
    description: item.summary,
    pathname: `/cases/${item.slug}`,
  })
}

export default async function CaseDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [item, services] = await Promise.all([getCaseBySlug(slug), getServices()])

  if (!item) {
    notFound()
  }

  const relatedServices = services.filter((service) => item.serviceSlugs.includes(service.slug))

  return (
    <main className={styles.page}>
      <section className={styles.detailHero}>
        <span className={styles.heroKicker}>
          Кейс · {item.objectType} · {formatAudienceLabel(item.audience)}
        </span>
        <div className={styles.detailGrid}>
          <div className={styles.detailMeta}>
            <h1 className={styles.detailTitle}>{item.title}</h1>
            <p className={styles.detailIntro}>{item.summary}</p>
            <div className={styles.detailMetaRow}>
              <span className={styles.pill}>{item.location}</span>
              <span className={styles.pill}>{item.area}</span>
              <span className={styles.pill}>{item.duration}</span>
              <span className={styles.pill}>{item.year}</span>
            </div>
          </div>
          <aside className={`${styles.detailPanel} ${styles.detailPanelAccent}`}>
            <span className={styles.smallLabel}>Показатели</span>
            <div className={styles.metricsGrid}>
              {item.metrics.map((metric) => (
                <div key={metric.label}>
                  <div className={styles.metricValue}>{metric.value}</div>
                  <div className={styles.muted}>{metric.label}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading eyebrow="Контекст" title="С чем зашел объект и как мы собирали решение." />
        <div className={styles.metricsGrid}>
          <article className={styles.detailPanel}>
            <h2 className={styles.detailLabel}>Задача</h2>
            <p className={styles.cardText}>{item.challenge}</p>
          </article>
          <article className={styles.detailPanel}>
            <h2 className={styles.detailLabel}>Подход</h2>
            <p className={styles.cardText}>{item.solution}</p>
          </article>
          <article className={styles.detailPanel}>
            <h2 className={styles.detailLabel}>Результат</h2>
            <p className={styles.cardText}>{item.result}</p>
          </article>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionHeading eyebrow="Услуги" title="Какие блоки были задействованы в этом проекте." />
        <div className={styles.serviceGrid}>
          {relatedServices.map((service) => (
            <article className={styles.serviceCard} key={service.slug}>
              <span className={styles.smallLabel}>{formatAudienceLabel(service.audience)}</span>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardText}>{service.teaser}</p>
              <Link className={styles.linkArrow} href={`/services/${service.slug}`}>
                Открыть услугу
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div>
            <span className={styles.heroKicker}>Похожие задачи</span>
            <h2 className={styles.displayTitle}>
              Если у вас похожий объект, начнем с разбора контекста и рисков.
            </h2>
            <p className={styles.muted}>
              Для частных и коммерческих объектов сценарий старта разный, но цель
              одна: быстро понять объем, ограничения и реальный горизонт запуска.
            </p>
          </div>
          <LeadForm defaultAudience={item.audience === 'business' ? 'business' : 'private'} />
        </div>
      </section>
    </main>
  )
}
