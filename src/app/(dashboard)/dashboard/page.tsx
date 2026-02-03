'use client';

import { motion } from 'framer-motion';
import {
  Layers,
  Cpu,
  AlertTriangle,
  Bug,
} from 'lucide-react';
import PersonaCard from '@/components/dtq/PersonaCard';
import MetricCard from '@/components/dtq/MetricCard';
import HighRiskBanner from '@/components/dtq/HighRiskBanner';
import TrendChart from '@/components/dtq/TrendChart';
import FeatureCoverage from '@/components/dtq/FeatureCoverage';
import AIAssistant from '@/components/dtq/AIAssistant';
import LiveIndicator from '@/components/dtq/LiveIndicator';
import { usePersona } from '../layout';
import { useRealTimeSimulation } from '@/hooks/useRealTimeSimulation';

export default function DashboardPage() {
  const { persona } = usePersona();
  const {
    summaryMetrics,
    highRiskFeatures,
    dailyMetrics,
    categories,
    personas,
    lastUpdate,
    isLive,
    toggleLive,
  } = useRealTimeSimulation(true);

  const currentPersona = personas.find(p => p.id === persona) || personas[1];

  // Chart data
  const passRateData = dailyMetrics.slice(-7).map(m => ({
    date: m.date,
    value: m.passRate,
  }));

  const coverageData = dailyMetrics.slice(-7).map(m => ({
    date: m.date,
    value: m.automationCoverage,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold gradient-text">Test IQ Dashboard</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            AI-Powered Testing Intelligence for Enterprise Quality
          </p>
        </motion.div>
        <LiveIndicator lastUpdate={lastUpdate} isLive={isLive} onToggle={toggleLive} />
      </div>

      {/* Persona Card */}
      <PersonaCard persona={persona} />

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Features"
          value={summaryMetrics.totalFeatures}
          subtitle={`${summaryMetrics.avgCoverage}% avg coverage`}
          icon={Layers}
          delay={0.1}
          accentColor="var(--chart-tertiary)"
        />
        <MetricCard
          label="Automation Rate"
          value={`${summaryMetrics.automationRate}%`}
          subtitle={`${summaryMetrics.fullyAutomated} fully automated`}
          icon={Cpu}
          delay={0.15}
          accentColor="var(--accent-primary)"
        />
        <MetricCard
          label="Risk Distribution"
          value={`${summaryMetrics.riskDistribution.high} High`}
          subtitle={`${summaryMetrics.riskDistribution.medium} Med / ${summaryMetrics.riskDistribution.low} Low`}
          icon={AlertTriangle}
          delay={0.2}
          accentColor="var(--risk-medium)"
        />
        <MetricCard
          label="Open Defects"
          value={summaryMetrics.openDefects}
          subtitle="Across all features"
          icon={Bug}
          delay={0.25}
          accentColor="var(--status-error)"
        />
      </div>

      {/* High Risk Banner */}
      {highRiskFeatures.length > 0 && (
        <HighRiskBanner features={highRiskFeatures} />
      )}

      {/* Persona Metrics Grid */}
      <motion.div
        key={persona}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          {currentPersona.title} Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentPersona.metrics.map((metric, index) => (
            <MetricCard
              key={metric.key}
              label={metric.label}
              value={`${metric.value}${metric.unit === '%' || metric.unit === '$' ? metric.unit : ''}`}
              subtitle={metric.description}
              trend={metric.trend}
              trendValue={metric.trendValue}
              delay={0.3 + index * 0.05}
            />
          ))}
        </div>
      </motion.div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart
          title="Test Pass Rate Trend (7 Days)"
          data={passRateData}
          type="line"
          color="var(--accent-primary)"
          delay={0.4}
        />
        <TrendChart
          title="Automation Coverage (7 Days)"
          data={coverageData}
          type="area"
          color="var(--chart-secondary)"
          delay={0.45}
        />
      </div>

      {/* Feature Coverage & AI Assistant */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <FeatureCoverage categories={categories} />
        </div>
        <div>
          <AIAssistant />
        </div>
      </div>
    </div>
  );
}
