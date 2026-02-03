'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import ReportCard from '@/components/dtq/ReportCard';
import IssuesModal from '@/components/dtq/IssuesModal';
import { testRuns } from '@/lib/dtq/data';
import { TestRun } from '@/lib/dtq/types';

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState<TestRun | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold gradient-text">Test Reports</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            View regression test execution history and issues
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export CSV
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-90"
            style={{
              background: 'var(--accent-primary)',
              color: 'white',
            }}
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </button>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {testRuns.length}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Total Runs
          </p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p className="text-2xl font-bold" style={{ color: 'var(--status-success)' }}>
            {testRuns.filter(r => r.status === 'passed').length}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Passed
          </p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p className="text-2xl font-bold" style={{ color: 'var(--status-error)' }}>
            {testRuns.filter(r => r.status === 'failed').length}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Failed
          </p>
        </div>
      </motion.div>

      {/* Report List */}
      <div className="space-y-4">
        {testRuns.map((report, index) => (
          <ReportCard
            key={report.id}
            report={report}
            delay={0.15 + index * 0.03}
            onViewIssues={() => setSelectedReport(report)}
          />
        ))}
      </div>

      {/* Issues Modal */}
      <IssuesModal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        issues={selectedReport?.issues || []}
        featureName={selectedReport?.featureName || ''}
      />
    </div>
  );
}
