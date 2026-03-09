import { LeadForm } from '@/components/site/LeadForm'
import { SectionHeading } from '@/components/site/SectionHeading'
import { getSiteSettings } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

import styles from '../site.module.scss'

export const metadata = buildMetadata({
  title: 'Контакты',
  description:
    'Контакты компании Overpas: телефон, email, адрес в Калининграде и форма заявки на проект.',
  pathname: '/contacts',
})

export default async function ContactsPage() {
  const settings = await getSiteSettings()

  return (
    <main className={styles.page}>
      <section className={styles.section}>
        <SectionHeading
          eyebrow="Контакты"
          title="Быстрее всего двигаемся, когда понимаем объект и задачу с первого касания."
          body="Напишите или позвоните, если нужно оценить сроки ремонта, смету, fit-out сценарий или формат технадзора."
        />
        <div className={styles.contactGrid}>
          <article className={styles.contactCard}>
            <h2 className={styles.contactTitle}>Телефон</h2>
            <a href={`tel:${settings.phone.replace(/[^\d+]/g, '')}`}>{settings.phone}</a>
            <a href={`tel:${settings.secondaryPhone.replace(/[^\d+]/g, '')}`}>
              {settings.secondaryPhone}
            </a>
          </article>
          <article className={styles.contactCard}>
            <h2 className={styles.contactTitle}>Email</h2>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
            <span>{settings.workingHours}</span>
          </article>
          <article className={styles.contactCard}>
            <h2 className={styles.contactTitle}>Адрес</h2>
            <span>{settings.address}</span>
            <span>
              {settings.city}, {settings.region}
            </span>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <LeadForm
          title="Обсудить объект"
          description="Заполните короткую форму, и мы свяжемся с вами по жилому или коммерческому проекту."
        />
      </section>
    </main>
  )
}
