'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, TestTube2, AlertCircle } from 'lucide-react';
import { TestRun } from '@/lib/dtq/types';

interface ReportCardProps {
  report: TestRun;
  delay?: number;
  onViewIssues?: () => void;
}

export default function ReportCard({ report, delay = 0, onViewIssues }: ReportCardProps) {
  const daysAgo = Math.floor((Date.now() - report.executedAt.getTime()) / (1000 * 60 * 60 * 24));
  const timeAgo = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="rounded-xl p-5 card-hover"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            {report.featureName}
          </h3>
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-4 h-4" />
            <span>Executed {timeAgo}</span>
          </div>
        </div>

        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
            report.status === 'passed' ? 'badge-success' : 'badge-error'
          }`}
        >
          {report.status === 'passed' ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Passed</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4" />
              <span>Failed</span>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <TestTube2 className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--text-muted)' }} />
          <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {report.totalTests}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Total Tests</p>
        </div>

        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <CheckCircle2 className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--status-success)' }} />
          <p className="text-lg font-semibold" style={{ color: 'var(--status-success)' }}>
            {report.passedTests}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Passed</p>
        </div>

        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <XCircle className="w-5 h-5 mx-auto mb-1" style={{ color: report.failedTests > 0 ? 'var(--status-error)' : 'var(--text-muted)' }} />
          <p
            className="text-lg font-semibold"
            style={{ color: report.failedTests > 0 ? 'var(--status-error)' : 'var(--text-primary)' }}
          >
            {report.failedTests}
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Failed</p>
        </div>

        <div className="text-center p-3 rounded-lg" style={{ background: 'var(--bg-tertiary)' }}>
          <Clock className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--text-muted)' }} />
          <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
            {report.duration}s
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Duration</p>
        </div>
      </div>

      {report.status === 'failed' && report.issues && report.issues.length > 0 && (
        <button
          onClick={onViewIssues}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-90"
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            color: 'var(--status-error)',
          }}
        >
          <AlertCircle className="w-4 h-4" />
          View Issues ({report.issues.length})
        </button>
      )}
    </motion.div>
  );
}
