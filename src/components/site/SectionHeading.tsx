import styles from './SectionHeading.module.scss'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  body?: string
}

export function SectionHeading({ eyebrow, title, body }: SectionHeadingProps) {
  return (
    <div className={styles.shell}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={styles.title}>{title}</h2>
      {body ? <p className={styles.body}>{body}</p> : null}
    </div>
  )
}
