'use client';

import { motion } from 'framer-motion';
import { Crown, Users, Code, Radio } from 'lucide-react';
import { PersonaType } from '@/lib/dtq/types';

interface PersonaCardProps {
  persona: PersonaType;
}

const personaData = {
  csuite: {
    name: 'C-Suite Executive',
    description: 'Strategic business metrics and ROI insights',
    icon: Crown,
    gradient: 'from-violet-500/20 to-purple-600/20',
    iconBg: 'var(--chart-tertiary)',
  },
  manager: {
    name: 'QA Manager',
    description: 'Team performance and operational effectiveness',
    icon: Users,
    gradient: 'from-pink-500/20 to-rose-600/20',
    iconBg: 'var(--accent-primary)',
  },
  techlead: {
    name: 'Tech Lead',
    description: 'Technical deep dive and engineering metrics',
    icon: Code,
    gradient: 'from-cyan-500/20 to-teal-600/20',
    iconBg: 'var(--chart-secondary)',
  },
};

export default function PersonaCard({ persona }: PersonaCardProps) {
  const data = personaData[persona];
  const Icon = data.icon;

  return (
    <motion.div
      key={persona}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative overflow-hidden rounded-xl p-5"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Gradient background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${data.gradient} opacity-50`}
      />

      <div className="relative flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: data.iconBg }}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              Active Persona View
            </p>
          </div>
          <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {data.name}
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {data.description}
          </p>
        </div>

        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
          style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
          }}
        >
          <Radio className="w-3 h-3" style={{ color: 'var(--status-success)' }} />
          <span className="text-xs font-medium" style={{ color: 'var(--status-success)' }}>
            Live Dashboard
          </span>
        </div>
      </div>
    </motion.div>
  );
}
