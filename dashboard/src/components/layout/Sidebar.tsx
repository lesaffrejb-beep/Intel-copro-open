'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BookOpen, Users, Activity } from 'lucide-react'

const nav = [
  { label: 'Cockpit',  href: '/',        icon: LayoutDashboard, hint: "Vue d'ensemble" },
  { label: 'Wiki',     href: '/wiki',     icon: BookOpen,        hint: 'Base de connaissance' },
  { label: 'Orbite',   href: '/contacts', icon: Users,           hint: 'Contacts & DISC' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        width: '200px',
        minWidth: '200px',
        background: 'var(--bg-0)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
      }}
    >
      {/* ── Logo ── */}
      <div
        style={{
          padding: '24px 18px 20px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <Activity size={13} strokeWidth={1.5} color="var(--tx-hi)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--tx-hi)',
            }}
          >
            Le Présent
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--tx-muted)',
            paddingLeft: '21px',
          }}
        >
          wiki-copro
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: '10px 8px' }}>
        {nav.map(({ label, href, icon: Icon, hint }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              title={hint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '9px',
                padding: '8px 10px',
                borderRadius: '2px',
                marginBottom: '1px',
                textDecoration: 'none',
                background: active ? 'var(--bg-2)' : 'transparent',
                borderLeft: active
                  ? '2px solid var(--tx-hi)'
                  : '2px solid transparent',
                transition: 'background 0.1s ease, border-color 0.1s ease',
              }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLAnchorElement).style.background = 'var(--bg-1)'
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              }}
            >
              <Icon
                size={13}
                strokeWidth={1.5}
                color={active ? 'var(--tx-hi)' : 'var(--tx-lo)'}
              />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  fontWeight: active ? 500 : 400,
                  color: active ? 'var(--tx-hi)' : 'var(--tx-lo)',
                  flex: 1,
                }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* ── Section divider ── */}
      <div
        style={{
          margin: '0 8px',
          height: '1px',
          background: 'var(--border)',
        }}
      />

      {/* ── Quick legend ── */}
      <div
        style={{
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
        }}
      >
        <div className="font-meta" style={{ marginBottom: '2px' }}>
          Statuts
        </div>
        {[
          { dot: 'var(--ok)',   label: 'Validé' },
          { dot: 'var(--warn)', label: 'En révision' },
          { dot: 'var(--tx-muted)', label: 'Brouillon' },
        ].map(({ dot, label }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
            }}
          >
            <span
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: dot,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: 'var(--tx-muted)',
                letterSpacing: '0.04em',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* ── Footer ── */}
      <div
        style={{
          padding: '12px 18px',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.4375rem',
            letterSpacing: '0.08em',
            color: 'var(--border-hi)',
            textTransform: 'uppercase',
          }}
        >
          Angers · 2026
        </div>
      </div>
    </aside>
  )
}
