'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, ChevronRight } from 'lucide-react';
import { Feature } from '@/lib/dtq/types';

interface HighRiskBannerProps {
  features: Feature[];
}

export default function HighRiskBanner({ features }: HighRiskBannerProps) {
  if (features.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-xl p-5"
      style={{
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(245, 158, 11, 0.05))',
        border: '1px solid rgba(239, 68, 68, 0.2)',
      }}
    >
      {/* Pulsing accent */}
      <div
        className="absolute top-0 left-0 w-1 h-full animate-pulse-glow"
        style={{ background: 'var(--risk-high)' }}
      />

      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: 'rgba(239, 68, 68, 0.2)' }}
        >
          <AlertTriangle className="w-5 h-5" style={{ color: 'var(--risk-high)' }} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            High Risk Features Requiring Attention
          </h3>

          <div className="space-y-2">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ background: 'rgba(0, 0, 0, 0.2)' }}
              >
                <div className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                    {feature.name}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Coverage: </span>
                    <span style={{ color: 'var(--text-primary)' }}>{feature.coverage}%</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Risk: </span>
                    <span style={{ color: 'var(--risk-high)' }}>{feature.riskScore}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Defects: </span>
                    <span style={{ color: 'var(--risk-high)' }}>{feature.openDefects}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
