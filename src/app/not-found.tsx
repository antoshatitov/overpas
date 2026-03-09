import Link from 'next/link'

import styles from '@/app/(site)/site.module.scss'

export default function NotFound() {
  return (
    <main className={styles.notFound}>
      <span className={styles.heroKicker}>404</span>
      <h1 className={styles.cardTitle}>Страница не найдена</h1>
      <p className={styles.cardText}>
        Возможно, адрес изменился или материал еще не опубликован.
      </p>
      <Link className={styles.linkArrow} href="/">
        Вернуться на главную
      </Link>
    </main>
  )
}
