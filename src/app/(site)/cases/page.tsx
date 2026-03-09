import Link from 'next/link'

import { SectionHeading } from '@/components/site/SectionHeading'
import { getCases } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

import styles from '../site.module.scss'

export const metadata = buildMetadata({
  title: 'Кейсы',
  description:
    'Подборка выполненных объектов Overpas: квартиры, таунхаусы, коммерческие пространства и fit-out проекты.',
  pathname: '/cases',
})

export default async function CasesPage() {
  const cases = await getCases()

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <SectionHeading
          eyebrow="Кейсы"
          title="Объекты, на которых видно не только визуальный результат, но и систему управления."
          body="Показываем тип объекта, контекст задачи, ключевое инженерное решение и то, что получили на выходе."
        />
        <div className={styles.caseGrid}>
          {cases.map((item) => (
            <article className={styles.caseCard} key={item.slug}>
              <div className={styles.caseTop}>
                <span className={styles.caseRibbon}>{item.objectType}</span>
                <h2 className={styles.cardTitle}>{item.title}</h2>
                <p className={styles.cardText}>{item.summary}</p>
              </div>
              <div className={styles.caseMetrics}>
                {item.metrics.map((metric) => (
                  <div className={styles.caseMetric} key={metric.label}>
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
                <Link className={styles.linkArrow} href={`/cases/${item.slug}`}>
                  Открыть кейс
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
