import { SectionHeading } from '@/components/site/SectionHeading'
import { getCredentials, getSiteSettings } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

import styles from '../site.module.scss'

export const metadata = buildMetadata({
  title: 'О компании',
  description:
    'Оверпас — команда по ремонту жилых и коммерческих помещений в Калининграде и Калининградской области.',
  pathname: '/about',
})

const principles = [
  'Сначала обследуем объект и собираем карту рисков, потом обещаем сроки.',
  'Не отделяем смету от графика: бюджет и календарь проверяются вместе.',
  'Фиксируем скрытые работы и не закрываем этап, пока его можно проверить.',
  'Держим коммуникацию короткой и предметной: статус, решения, отклонения, следующий шаг.',
]

export default async function AboutPage() {
  const [settings, credentials] = await Promise.all([getSiteSettings(), getCredentials()])

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <SectionHeading
          eyebrow="О компании"
          title="Оверпас — это не витрина про красивый ремонт, а управляемое производственное ядро."
          body="Мы работаем на стыке инженерного подхода и качественной отделки. Для заказчика это означает одно: объект двигается по понятному сценарию, а не по инерции подрядчиков."
        />
        <div className={styles.metricsGrid}>
          {principles.map((item) => (
            <article className={styles.detailPanel} key={item}>
              <h2 className={styles.detailLabel}>Принцип</h2>
              <p className={styles.cardText}>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionHeading
          eyebrow="Покрытие"
          title="Работаем в Калининграде и по всей области."
          body="Для объектов вне города заранее закладываем логистику, поставки и режим выездов. Это помогает не терять темп уже после старта."
        />
        <div className={styles.contactGrid}>
          {settings.coverage.map((city) => (
            <article className={styles.contactCard} key={city}>
              <h2 className={styles.contactTitle}>{city}</h2>
              <p className={styles.cardText}>Выезд, замеры, запуск и сопровождение объекта.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Подтверждение"
          title="То, что укрепляет качество процесса до сдачи объекта."
        />
        <div className={styles.credentialGrid}>
          {credentials.map((item) => (
            <article className={styles.credentialCard} key={item.title}>
              <span className={styles.smallLabel}>{item.kind}</span>
              <h2 className={styles.cardTitle}>{item.title}</h2>
              <p className={styles.cardText}>{item.subtitle}</p>
              <p className={styles.muted}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
