'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Target,
  BarChart3,
  Settings,
  TrendingUp,
  Send,
  Bot,
  User,
} from 'lucide-react';
import { ChatMessage } from '@/lib/dtq/types';
import { aiResponses } from '@/lib/dtq/data';

const quickActions = [
  { id: 'high-risk', icon: Target, label: 'High-risk features', sublabel: 'Show features needing attention' },
  { id: 'feature-status', icon: BarChart3, label: 'Feature status', sublabel: 'Check specific feature metrics' },
  { id: 'automation-gaps', icon: Settings, label: 'Automation gaps', sublabel: 'Find coverage opportunities' },
  { id: 'quality-summary', icon: TrendingUp, label: 'Quality summary', sublabel: 'Get executive overview' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleQuickAction = async (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (!action) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: action.label,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const response = aiResponses[actionId] || "I don't have information about that yet.";
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: response,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate response
    await new Promise(resolve => setTimeout(resolve, 1000));

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: `I understand you're asking about "${input}". Based on current metrics, here are my insights:\n\n- Overall test coverage is healthy at 93.3%\n- No critical issues detected in related areas\n- Recommend reviewing the feature coverage section for detailed data\n\nWould you like me to dive deeper into any specific aspect?`,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="rounded-xl overflow-hidden flex flex-col h-[500px]"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      {/* Header */}
      <div className="p-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--accent-primary)' }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
              AI Insights Assistant
            </h3>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Powered by intelligent analysis
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'var(--bg-elevated)' }}
            >
              <Bot className="w-8 h-8" style={{ color: 'var(--accent-primary)' }} />
            </div>
            <p className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              Ask me about your testing metrics
            </p>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              I have access to all 46 features with real-time data
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="text-left p-3 rounded-lg transition-all hover:scale-[1.02]"
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <action.icon className="w-4 h-4" style={{ color: 'var(--accent-primary)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {action.label}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {action.sublabel}
                  </p>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--accent-primary)' }}
                    >
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-xl p-4 ${
                      message.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                    }`}
                    style={{
                      background: message.role === 'user'
                        ? 'var(--accent-primary)'
                        : 'var(--bg-tertiary)',
                      color: message.role === 'user'
                        ? 'white'
                        : 'var(--text-primary)',
                    }}
                  >
                    <div
                      className="text-sm whitespace-pre-wrap prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: message.content
                          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                          .replace(/## (.*?)$/gm, '<h4 class="text-base font-semibold mt-3 mb-2">$1</h4>')
                          .replace(/### (.*?)$/gm, '<h5 class="text-sm font-semibold mt-2 mb-1">$1</h5>')
                          .replace(/^- (.*?)$/gm, '<li class="ml-4">$1</li>')
                          .replace(/\n/g, '<br />')
                      }}
                    />
                  </div>
                  {message.role === 'user' && (
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: 'var(--bg-elevated)' }}
                    >
                      <User className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: 'var(--accent-primary)' }}
                >
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div
                  className="px-4 py-3 rounded-xl rounded-bl-sm"
                  style={{ background: 'var(--bg-tertiary)' }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ background: 'var(--text-muted)' }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about specific features, metrics, or trends..."
            className="flex-1 px-4 py-2.5 rounded-lg text-sm outline-none"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-primary)',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-all disabled:opacity-50"
            style={{
              background: input.trim() ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
            }}
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
