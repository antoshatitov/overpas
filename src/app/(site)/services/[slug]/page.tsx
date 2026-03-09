import Link from 'next/link'
import { notFound } from 'next/navigation'

import { LeadForm } from '@/components/site/LeadForm'
import { SectionHeading } from '@/components/site/SectionHeading'
import { servicesSeed } from '@/content/seed'
import { getCases, getServiceBySlug } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { formatAudienceLabel } from '@/lib/utils'

import styles from '../../site.module.scss'

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return servicesSeed.map((service) => ({
    slug: service.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)

  if (!service) {
    return buildMetadata({
      title: 'Услуга не найдена',
      description: 'Запрашиваемая услуга не найдена.',
    })
  }

  return buildMetadata({
    title: service.title,
    description: service.intro,
    pathname: `/services/${service.slug}`,
  })
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params
  const [service, cases] = await Promise.all([getServiceBySlug(slug), getCases()])

  if (!service) {
    notFound()
  }

  const relatedCases = cases.filter((item) => item.serviceSlugs.includes(service.slug))

  return (
    <main className={styles.page}>
      <section className={styles.detailHero}>
        <span className={styles.heroKicker}>Услуга · {formatAudienceLabel(service.audience)}</span>
        <div className={styles.detailGrid}>
          <div className={styles.detailMeta}>
            <h1 className={styles.detailTitle}>{service.title}</h1>
            <p className={styles.detailIntro}>{service.intro}</p>
            <div className={styles.detailMetaRow}>
              <span className={styles.pill}>{service.metricValue}</span>
              <span className={styles.pill}>{service.metricLabel}</span>
            </div>
          </div>
          <aside className={`${styles.detailPanel} ${styles.detailPanelAccent}`}>
            <span className={styles.smallLabel}>Что берем на себя</span>
            <ul className={styles.detailList}>
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Работы"
          title="Ключевые задачи внутри блока"
          body={service.teaser}
        />
        <div className={styles.metricsGrid}>
          {service.bullets.map((item) => (
            <article className={styles.detailPanel} key={item}>
              <h2 className={styles.detailLabel}>{item}</h2>
            </article>
          ))}
        </div>
      </section>

      {relatedCases.length > 0 ? (
        <section className={styles.sectionAlt}>
          <SectionHeading
            eyebrow="Связанные кейсы"
            title="Похожие объекты, где этот блок уже сработал в системе."
          />
          <div className={styles.caseGrid}>
            {relatedCases.map((item) => (
              <article className={styles.caseCard} key={item.slug}>
                <div className={styles.caseTop}>
                  <span className={styles.caseRibbon}>{item.objectType}</span>
                  <h2 className={styles.cardTitle}>{item.title}</h2>
                  <p className={styles.cardText}>{item.summary}</p>
                </div>
                <div className={styles.caseMetrics}>
                  <Link className={styles.linkArrow} href={`/cases/${item.slug}`}>
                    Открыть кейс
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div>
            <span className={styles.heroKicker}>Обсуждение задачи</span>
            <h2 className={styles.displayTitle}>
              Подключим этот блок отдельно или встроим в полный цикл.
            </h2>
            <p className={styles.muted}>
              Если у вас уже идет ремонт, можем зайти на проблемный этап. Если
              объекта еще нет в производстве, соберем стартовый сценарий целиком.
            </p>
          </div>
          <LeadForm defaultServiceSlug={service.slug} />
        </div>
      </section>
    </main>
  )
}
