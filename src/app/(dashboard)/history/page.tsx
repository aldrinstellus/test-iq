'use client';

import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Zap,
  Bug,
  Target,
} from 'lucide-react';
import MetricCard from '@/components/dtq/MetricCard';
import TrendChart from '@/components/dtq/TrendChart';
import LiveIndicator from '@/components/dtq/LiveIndicator';
import { useRealTimeSimulation } from '@/hooks/useRealTimeSimulation';

export default function HistoryPage() {
  const { dailyMetrics, lastUpdate, isLive, toggleLive } = useRealTimeSimulation(true);

  // Calculate 30-day averages
  const avgPassRate = Math.round(
    dailyMetrics.reduce((sum, m) => sum + m.passRate, 0) / dailyMetrics.length * 10
  ) / 10;

  const avgFirstPassRate = Math.round(
    dailyMetrics.reduce((sum, m) => sum + m.firstRunPassRate, 0) / dailyMetrics.length * 10
  ) / 10;

  const avgDefectDetection = Math.round(
    dailyMetrics.reduce((sum, m) => sum + m.defectDetection, 0) / dailyMetrics.length * 10
  ) / 10;

  const avgEffectiveness = Math.round(
    dailyMetrics.reduce((sum, m) => sum + m.effectiveness, 0) / dailyMetrics.length * 10
  ) / 10;

  // Chart data
  const passRateData = dailyMetrics.map(m => ({ date: m.date, value: m.passRate }));
  const firstPassData = dailyMetrics.map(m => ({ date: m.date, value: m.firstRunPassRate }));
  const defectData = dailyMetrics.map(m => ({ date: m.date, value: m.defectDetection }));
  const effectivenessData = dailyMetrics.map(m => ({ date: m.date, value: m.effectiveness }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold gradient-text">Team Performance Metrics</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            Monitor team effectiveness and quality trends over the past 30 days
          </p>
        </motion.div>
        <LiveIndicator lastUpdate={lastUpdate} isLive={isLive} onToggle={toggleLive} />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Average Pass Rate"
          value={`${avgPassRate}%`}
          icon={CheckCircle2}
          delay={0.1}
          accentColor="var(--status-success)"
          size="large"
        />
        <MetricCard
          label="First Pass Rate"
          value={`${avgFirstPassRate}%`}
          icon={Zap}
          delay={0.15}
          accentColor="var(--accent-primary)"
          size="large"
        />
        <MetricCard
          label="Defect Detection"
          value={`${avgDefectDetection}%`}
          icon={Bug}
          delay={0.2}
          accentColor="var(--risk-medium)"
          size="large"
        />
        <MetricCard
          label="Test Effectiveness"
          value={`${avgEffectiveness}%`}
          icon={Target}
          delay={0.25}
          accentColor="var(--chart-secondary)"
          size="large"
        />
      </div>

      {/* Trend Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart
          title="Test Pass Rate Trend"
          data={passRateData}
          type="line"
          color="var(--status-success)"
          delay={0.3}
        />
        <TrendChart
          title="First Run Pass Rate"
          data={firstPassData}
          type="line"
          color="var(--accent-primary)"
          delay={0.35}
        />
        <TrendChart
          title="Defect Detection Percentage"
          data={defectData}
          type="area"
          color="var(--risk-medium)"
          delay={0.4}
        />
        <TrendChart
          title="Test Case Effectiveness"
          data={effectivenessData}
          type="area"
          color="var(--chart-secondary)"
          delay={0.45}
        />
      </div>
    </div>
  );
}
