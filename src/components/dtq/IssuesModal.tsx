'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { TestIssue } from '@/lib/dtq/types';

interface IssuesModalProps {
  isOpen: boolean;
  onClose: () => void;
  issues: TestIssue[];
  featureName: string;
}

export default function IssuesModal({ isOpen, onClose, issues, featureName }: IssuesModalProps) {
  const getSeverityConfig = (severity: TestIssue['severity']) => {
    switch (severity) {
      case 'high':
        return { icon: AlertTriangle, color: 'var(--risk-high)', bg: 'rgba(239, 68, 68, 0.15)' };
      case 'medium':
        return { icon: AlertCircle, color: 'var(--risk-medium)', bg: 'rgba(245, 158, 11, 0.15)' };
      case 'low':
        return { icon: Info, color: 'var(--risk-low)', bg: 'rgba(16, 185, 129, 0.15)' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
            style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[80vh] z-50 rounded-xl overflow-hidden flex flex-col"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5 border-b"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Test Issues
                </h2>
                <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
                  Detailed information about test failures for {featureName}
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-elevated)]"
                style={{ color: 'var(--text-muted)' }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {issues.map((issue, index) => {
                const config = getSeverityConfig(issue.severity);
                const SeverityIcon = config.icon;

                return (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-lg overflow-hidden"
                    style={{
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {/* Issue Header */}
                    <div className="p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-start justify-between">
                        <h3 className="font-medium" style={{ color: 'var(--text-primary)' }}>
                          {issue.testCaseName}
                        </h3>
                        <div
                          className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: config.bg,
                            color: config.color,
                          }}
                        >
                          <SeverityIcon className="w-3 h-3" />
                          <span className="capitalize">{issue.severity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Error Message */}
                    <div className="p-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                      <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                        Error
                      </p>
                      <p className="text-sm" style={{ color: 'var(--status-error)' }}>
                        {issue.errorMessage}
                      </p>
                    </div>

                    {/* Stack Trace */}
                    <div className="p-4">
                      <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                        Stack Trace
                      </p>
                      <pre
                        className="p-3 rounded-lg text-xs overflow-x-auto font-mono"
                        style={{
                          background: 'var(--bg-elevated)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {issue.stackTrace}
                      </pre>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
