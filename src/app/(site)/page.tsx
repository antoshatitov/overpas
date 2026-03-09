import Link from 'next/link'

import { LeadForm } from '@/components/site/LeadForm'
import { SectionHeading } from '@/components/site/SectionHeading'
import {
  getCases,
  getCredentials,
  getFaq,
  getServices,
  getSiteSettings,
  getTestimonials,
} from '@/lib/content'
import { buildMetadata } from '@/lib/seo'
import { absoluteUrl, formatAudienceLabel } from '@/lib/utils'

import styles from './site.module.scss'

export const metadata = buildMetadata({
  title: 'Ремонт квартир, домов и коммерческих помещений в Калининграде',
  description:
    'Оверпас выполняет ремонт жилых и коммерческих помещений под ключ, с прозрачной сметой, инженерным контролем и понятным графиком.',
  pathname: '/',
})

const processSteps = [
  'Выезд, замеры и технический разбор объекта.',
  'Смета, календарный график и карта рисков до запуска.',
  'Производство с фотофиксацией этапов и точками приемки.',
  'Финальная сдача, дефектный лист и гарантийное сопровождение.',
]

export default async function HomePage() {
  const [settings, services, cases, testimonials, faq, credentials] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getCases(),
    getTestimonials(),
    getFaq(),
    getCredentials(),
  ])

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: settings.companyName,
    areaServed: [settings.city, settings.region],
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address,
      addressLocality: settings.city,
      addressRegion: settings.region,
      addressCountry: 'RU',
    },
    email: settings.email,
    telephone: settings.phone,
    url: absoluteUrl('/'),
  }

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <span className={styles.heroKicker}>{settings.heroEyebrow}</span>
            <h1 className={styles.heroTitle}>{settings.heroTitle}</h1>
            <p className={styles.heroText}>{settings.heroBody}</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryButton} href="/contacts#lead-form">
                Обсудить объект
              </Link>
              <Link className={styles.secondaryButton} href="/cases">
                Смотреть кейсы
              </Link>
            </div>
          </div>

          <aside className={styles.heroSide}>
            <div className={styles.audienceCard}>
              <span className={styles.smallLabel}>Частным клиентам</span>
              <strong>Квартиры, дома, таунхаусы</strong>
              <p className={styles.cardText}>
                От технического обследования до отделки и подготовки к меблировке.
              </p>
              <Link className={styles.linkArrow} href="/services">
                Открыть сценарий ремонта
              </Link>
            </div>

            <div className={styles.audienceCard}>
              <span className={styles.smallLabel}>Коммерческим объектам</span>
              <strong>Офисы, fit-out, сервисные точки</strong>
              <p className={styles.cardText}>
                Работаем под дату запуска, стандарты бренда и реальную эксплуатацию.
              </p>
              <Link
                className={styles.linkArrow}
                href="/services/fit-out-kommercheskih-pomeschenij"
              >
                Открыть fit-out
              </Link>
            </div>
          </aside>
        </div>

        <div className={styles.heroBand}>
          <div className={styles.bandGrid}>
            <div className={styles.bandItem}>
              <span>Телефон</span>
              <strong>{settings.phone}</strong>
            </div>
            <div className={styles.bandItem}>
              <span>Email</span>
              <strong>{settings.email}</strong>
            </div>
            <div className={styles.bandItem}>
              <span>География</span>
              <strong>{settings.coverage.join(', ')}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Доверие"
          title="Цифры, которые показывают реальную управляемость."
          body="Мы не продаем “ремонт мечты”. Мы показываем, сколько объектов ведем, как быстро заходим в производство и где именно держим контроль."
        />
        <div className={styles.statsGrid}>
          {settings.stats.map((stat) => (
            <article className={styles.statCard} key={stat.label}>
              <div className={styles.statValue}>{stat.value}</div>
              <h2 className={styles.statLabel}>{stat.label}</h2>
              <p className={styles.muted}>{stat.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionHeading
          eyebrow="Услуги"
          title="Собираем проект по блокам, но держим ответственность как одна команда."
          body="Каждая услуга может быть отдельным входом в проект, но сильнее всего система работает, когда мы видим объект целиком."
        />
        <div className={styles.serviceGrid}>
          {services.map((service) => (
            <article className={styles.serviceCard} key={service.slug}>
              <span className={styles.smallLabel}>{formatAudienceLabel(service.audience)}</span>
              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardText}>{service.teaser}</p>
              <div className={styles.metricValue}>{service.metricValue}</div>
              <p className={styles.muted}>{service.metricLabel}</p>
              <ul className={styles.cardList}>
                {service.bullets.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className={styles.linkArrow} href={`/services/${service.slug}`}>
                Подробнее об услуге
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionDark}>
        <SectionHeading
          eyebrow="Процесс"
          title="У ремонта должен быть ритм. Мы задаем его заранее."
          body="На каждом объекте фиксируем не только объем работ, но и контрольные точки принятия решений, закупок и проверки качества."
        />
        <div className={styles.processGrid}>
          {processSteps.map((step, index) => (
            <article className={styles.processCard} key={step}>
              <div className={styles.processIndex}>{`0${index + 1}`}</div>
              <h2 className={styles.processTitle}>Этап {index + 1}</h2>
              <p className={styles.cardText}>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Кейсы"
          title="Показываем не рендеры, а готовые объекты и производственные решения."
          body="Для каждого кейса фиксируем тип объекта, сроки, логику решения задачи и показатели, которые важны заказчику."
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

      <section className={styles.sectionAlt}>
        <SectionHeading
          eyebrow="Система качества"
          title="Подтверждаем компетенцию не словами, а устройством процесса."
          body="В проекте важны не только мастера, но и то, как выстроены закупки, проверка узлов, акты и коммуникация с заказчиком."
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

      <section className={styles.section}>
        <SectionHeading
          eyebrow="Отзывы"
          title="Нас выбирают не за эффектную презентацию, а за предсказуемый результат."
        />
        <div className={styles.testimonialGrid}>
          {testimonials.map((item) => (
            <article className={styles.testimonial} key={item.author}>
              <p className={styles.quote}>“{item.quote}”</p>
              <div className={styles.quoteMeta}>
                <strong>{item.author}</strong>
                <span>
                  {item.role} · {item.company}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <SectionHeading
          eyebrow="FAQ"
          title="Закрываем вопросы до того, как они становятся рисками проекта."
        />
        <div className={styles.faqGrid}>
          {faq.map((item) => (
            <article className={styles.faqCard} key={item.question}>
              <h2 className={styles.faqQuestion}>{item.question}</h2>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.ctaPanel}>
          <div>
            <span className={styles.heroKicker}>Старт проекта</span>
            <h2 className={styles.displayTitle}>
              Сначала фиксируем задачу. Потом беремся за работы.
            </h2>
            <p className={styles.muted}>
              Оставьте заявку, если хотите понять сроки, бюджет, входные риски и
              ближайшее окно запуска по вашему объекту.
            </p>
          </div>
          <LeadForm />
        </div>
      </section>
    </main>
  )
}
