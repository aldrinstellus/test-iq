'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  delay?: number;
  size?: 'default' | 'large';
  accentColor?: string;
}

export default function MetricCard({
  label,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendValue,
  delay = 0,
  size = 'default',
  accentColor,
}: MetricCardProps) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
  const trendColor = trend === 'up' ? 'var(--status-success)' : trend === 'down' ? 'var(--status-error)' : 'var(--text-muted)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'relative overflow-hidden rounded-xl p-5 card-hover',
        size === 'large' && 'p-6'
      )}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Accent gradient */}
      {accentColor && (
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          }}
        />
      )}

      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              'text-sm font-medium',
              size === 'large' && 'text-base'
            )}
            style={{ color: 'var(--text-secondary)' }}
          >
            {label}
          </p>
          <p
            className={cn(
              'text-2xl font-bold tracking-tight',
              size === 'large' && 'text-3xl'
            )}
            style={{ color: 'var(--text-primary)' }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {subtitle}
            </p>
          )}
        </div>

        {Icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: accentColor ? `${accentColor}20` : 'var(--bg-elevated)',
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: accentColor || 'var(--text-secondary)' }}
            />
          </div>
        )}
      </div>

      {trend && trendValue && (
        <div className="flex items-center gap-1.5 mt-3">
          <TrendIcon className="w-3.5 h-3.5" style={{ color: trendColor }} />
          <span className="text-xs font-medium" style={{ color: trendColor }}>
            {trendValue}
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            vs last period
          </span>
        </div>
      )}
    </motion.div>
  );
}
