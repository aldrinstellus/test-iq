'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Crown,
  Users,
  Code,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PersonaType } from '@/lib/dtq/types';

interface SidebarProps {
  persona: PersonaType;
  onPersonaChange: (persona: PersonaType) => void;
}

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Metrics History', href: '/history', icon: TrendingUp },
  { name: 'Test Reports', href: '/reports', icon: FileText },
];

const personaConfig = {
  csuite: { name: 'C-Suite', icon: Crown, color: 'var(--chart-tertiary)' },
  manager: { name: 'Manager', icon: Users, color: 'var(--accent-primary)' },
  techlead: { name: 'Tech Lead', icon: Code, color: 'var(--chart-secondary)' },
};

export default function Sidebar({ persona, onPersonaChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className="w-64 flex flex-col border-r"
      style={{
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      {/* Logo */}
      <div className="p-6 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <Link href="/dashboard" className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-primary)' }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Test IQ
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Testing Intelligence
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <div className="mb-4">
          <p className="text-xs font-medium uppercase tracking-wider mb-2 px-3" style={{ color: 'var(--text-muted)' }}>
            Navigation
          </p>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all relative',
                  isActive ? 'text-white' : ''
                )}
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 rounded-r-full"
                    style={{ background: 'var(--accent-primary)' }}
                  />
                )}
                <item.icon className="w-5 h-5" style={{ color: isActive ? 'var(--accent-primary)' : 'inherit' }} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Personas */}
        <div className="pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <p className="text-xs font-medium uppercase tracking-wider mb-3 px-3" style={{ color: 'var(--text-muted)' }}>
            Demo Personas
          </p>
          {(Object.keys(personaConfig) as PersonaType[]).map((key) => {
            const config = personaConfig[key];
            const isActive = persona === key;
            const Icon = config.icon;

            return (
              <button
                key={key}
                onClick={() => onPersonaChange(key)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left'
                )}
                style={{
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--bg-elevated)' : 'transparent',
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: isActive ? config.color : 'var(--bg-tertiary)',
                    opacity: isActive ? 1 : 0.6,
                  }}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-medium block">{config.name}</span>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      Active
                    </motion.span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div
          className="px-3 py-2 rounded-lg text-xs"
          style={{ background: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--status-success)' }}
            />
            <span>Live Dashboard</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
