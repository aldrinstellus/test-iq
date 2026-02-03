'use client';

import { motion } from 'framer-motion';
import { formatTimeAgo } from '@/hooks/useRealTimeSimulation';

interface LiveIndicatorProps {
  lastUpdate: Date;
  isLive: boolean;
  onToggle?: () => void;
}

export default function LiveIndicator({ lastUpdate, isLive, onToggle }: LiveIndicatorProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
        style={{
          background: isLive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
          color: isLive ? 'var(--status-success)' : 'var(--status-error)',
          border: `1px solid ${isLive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full"
          style={{ background: isLive ? 'var(--status-success)' : 'var(--status-error)' }}
          animate={isLive ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        {isLive ? 'Live' : 'Paused'}
      </button>
      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
        Updated {formatTimeAgo(lastUpdate)}
      </span>
    </div>
  );
}
