'use client'

import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/lib/utils'

import styles from './Header.module.scss'

const navigation = [
  { href: '/services', label: 'Услуги' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/about', label: 'О компании' },
  { href: '/contacts', label: 'Контакты' },
]

type HeaderProps = {
  phone: string
}

export function Header({ phone }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href="/" onClick={() => setIsOpen(false)}>
          <span className={styles.brandMark}>Overpas</span>
          <span className={styles.brandMeta}>Kaliningrad repair systems</span>
        </Link>

        <nav className={cn(styles.nav, !isOpen && styles.navClosed)}>
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <a className={styles.phone} href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
            {phone}
          </a>
          <Link className={styles.button} href="/contacts#lead-form">
            Обсудить проект
          </Link>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-label="Открыть меню"
          >
            Меню
          </button>
        </div>
      </div>
    </header>
  )
}
