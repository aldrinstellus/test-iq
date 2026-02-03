'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Search,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Bug,
} from 'lucide-react';
import { Category, Feature } from '@/lib/dtq/types';
import { cn } from '@/lib/utils';

interface FeatureCoverageProps {
  categories: Category[];
}

export default function FeatureCoverage({ categories }: FeatureCoverageProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalFeatures = categories.reduce((sum, c) => sum + c.features.length, 0);

  const filteredCategories = categories.map(category => ({
    ...category,
    features: category.features.filter(f =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(c => c.features.length > 0);

  const getRiskColor = (score: number) => {
    if (score >= 40) return 'var(--risk-high)';
    if (score >= 20) return 'var(--risk-medium)';
    return 'var(--risk-low)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="rounded-xl overflow-hidden"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              Feature Coverage
            </h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              {totalFeatures} features with test coverage
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ background: 'var(--status-success)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Fully Automated</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ background: 'var(--chart-secondary)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Partial</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          />
        </div>
      </div>

      {/* Categories */}
      <div className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
        {filteredCategories.map((category) => (
          <div key={category.id}>
            {/* Category Header */}
            <button
              onClick={() => setExpandedCategory(
                expandedCategory === category.id ? null : category.id
              )}
              className="w-full flex items-center justify-between p-4 hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <div className="flex items-center gap-3">
                {expandedCategory === category.id ? (
                  <ChevronDown className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                ) : (
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                )}
                <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                  {category.name}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: 'var(--bg-elevated)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {category.features.length}
                </span>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <span style={{ color: 'var(--text-muted)' }}>Avg Coverage: </span>
                  <span style={{ color: 'var(--text-primary)' }}>{category.avgCoverage}%</span>
                </div>
                {category.highRiskCount > 0 && (
                  <div className="flex items-center gap-1.5 badge-warning px-2 py-1 rounded-full text-xs">
                    <AlertTriangle className="w-3 h-3" />
                    <span>{category.highRiskCount} High Risk</span>
                  </div>
                )}
                {category.totalDefects > 0 && (
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Bug className="w-4 h-4" />
                    <span>{category.totalDefects} Open</span>
                  </div>
                )}
              </div>
            </button>

            {/* Expanded Features Table */}
            <AnimatePresence>
              {expandedCategory === category.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <table className="w-full text-sm">
                      <thead>
                        <tr style={{ color: 'var(--text-muted)' }}>
                          <th className="text-left py-2 px-3 font-medium">Feature</th>
                          <th className="text-left py-2 px-3 font-medium">Coverage</th>
                          <th className="text-left py-2 px-3 font-medium">Status</th>
                          <th className="text-left py-2 px-3 font-medium">Defects</th>
                          <th className="text-left py-2 px-3 font-medium">Risk</th>
                          <th className="text-left py-2 px-3 font-medium">Pass Rate</th>
                          <th className="text-left py-2 px-3 font-medium">Impact</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.features.map((feature, idx) => (
                          <motion.tr
                            key={feature.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="border-t"
                            style={{ borderColor: 'var(--border-subtle)' }}
                          >
                            <td className="py-3 px-3" style={{ color: 'var(--text-primary)' }}>
                              {feature.name}
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2">
                                <div className="progress-bar w-20 h-2">
                                  <div
                                    className="progress-bar-fill"
                                    style={{ width: `${feature.coverage}%` }}
                                  />
                                </div>
                                <span style={{ color: 'var(--text-secondary)' }}>
                                  {feature.coverage}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1.5">
                                {feature.status === 'fully_automated' ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--status-success)' }} />
                                    <span style={{ color: 'var(--status-success)' }}>Fully Automated</span>
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="w-4 h-4" style={{ color: 'var(--chart-secondary)' }} />
                                    <span style={{ color: 'var(--chart-secondary)' }}>Partial</span>
                                  </>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>
                              {feature.openDefects} / {feature.closedDefects} closed
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className="font-medium"
                                style={{ color: getRiskColor(feature.riskScore) }}
                              >
                                {feature.riskScore}
                              </span>
                            </td>
                            <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>
                              {feature.passRate}%
                            </td>
                            <td className="py-3 px-3" style={{ color: 'var(--text-secondary)' }}>
                              {feature.impactScore}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
