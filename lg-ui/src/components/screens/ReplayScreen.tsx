import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';

interface ReplayScreenProps {
  onNext: () => void;
  darkMode: boolean;
}

export function ReplayScreen({ onNext, darkMode }: ReplayScreenProps) {
  // Generate scenario data
  const generateScenarioData = (scenario: 'healthy' | 'stressed' | 'critical') => {
    const baseData = Array.from({ length: 100 }, (_, i) => {
      let hr = 70;
      let risk = 10;

      if (scenario === 'healthy') {
        hr = 68 + Math.sin(i / 10) * 5;
        risk = 8 + Math.random() * 4;
      } else if (scenario === 'stressed') {
        hr = 75 + Math.sin(i / 10) * 8 + (i > 60 ? (i - 60) * 0.3 : 0);
        risk = 15 + (i > 60 ? (i - 60) * 0.5 : 0);
      } else {
        hr = 72 + (i > 40 ? (i - 40) * 0.6 : 0);
        risk = 12 + (i > 40 ? (i - 40) * 0.8 : 0);
      }

      return { time: i, hr, risk };
    });
    return baseData;
  };

  const scenarios = [
    {
      name: 'Healthy Baseline',
      color: 'teal',
      data: generateScenarioData('healthy'),
      warningTime: null,
      peakRisk: 12,
    },
    {
      name: 'Stress Pattern',
      color: 'amber',
      data: generateScenarioData('stressed'),
      warningTime: 62,
      peakRisk: 45,
    },
    {
      name: 'Critical Pattern',
      color: 'red',
      data: generateScenarioData('critical'),
      warningTime: 45,
      peakRisk: 72,
    },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} p-6 lg:p-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Historical Replay & Scenario Comparison</h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Review how LifeGuard detects risk patterns early across different scenarios
          </p>
        </motion.div>

        {/* Split Screen Scenarios */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-6 border`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={darkMode ? 'text-white' : 'text-slate-900'}>{scenario.name}</h3>
                <div className={`px-3 py-1 rounded-full ${
                  scenario.color === 'teal' ? 'bg-teal-500/20 text-teal-400' :
                  scenario.color === 'amber' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  Peak: {scenario.peakRisk}
                </div>
              </div>

              {/* Chart */}
              <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scenario.data}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#e2e8f0'} />
                    <XAxis dataKey="time" stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    <YAxis stroke={darkMode ? '#64748b' : '#94a3b8'} />
                    {scenario.warningTime && (
                      <>
                        <ReferenceLine 
                          x={scenario.warningTime} 
                          stroke="#f59e0b" 
                          strokeDasharray="3 3"
                          label={{ value: 'Alert', fill: '#f59e0b', position: 'top' }}
                        />
                        <ReferenceDot 
                          x={scenario.warningTime} 
                          y={scenario.data[scenario.warningTime].risk} 
                          r={6} 
                          fill="#f59e0b" 
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      </>
                    )}
                    <Line 
                      type="monotone" 
                      dataKey="risk" 
                      stroke={
                        scenario.color === 'teal' ? '#14b8a6' :
                        scenario.color === 'amber' ? '#f59e0b' :
                        '#ef4444'
                      }
                      strokeWidth={2} 
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Warning Info */}
              {scenario.warningTime && (
                <div className="flex items-center gap-2 text-amber-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Warned at {scenario.warningTime}h</span>
                </div>
              )}
              {!scenario.warningTime && (
                <div className="flex items-center gap-2 text-teal-400">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>No warning needed</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${darkMode ? 'bg-teal-900/30 border-teal-700/50' : 'bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200'} rounded-2xl p-8 border mb-8`}
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Early Warning Prevented Peak Risk</h3>
          <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} leading-relaxed mb-6`}>
            In the stress and critical scenarios, LifeGuard detected pattern deviations an average of 15 hours before peak risk, 
            providing a crucial intervention window. The healthy baseline shows stable patterns with no alerts triggered.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`${darkMode ? 'bg-slate-800/50' : 'bg-white'} rounded-xl p-4`}>
              <div className="text-teal-400 mb-1">Average Lead Time</div>
              <div className={darkMode ? 'text-white' : 'text-slate-900'}>15 hours</div>
            </div>
            <div className={`${darkMode ? 'bg-slate-800/50' : 'bg-white'} rounded-xl p-4`}>
              <div className="text-teal-400 mb-1">Detection Accuracy</div>
              <div className={darkMode ? 'text-white' : 'text-slate-900'}>92%</div>
            </div>
            <div className={`${darkMode ? 'bg-slate-800/50' : 'bg-white'} rounded-xl p-4`}>
              <div className="text-teal-400 mb-1">False Positives</div>
              <div className={darkMode ? 'text-white' : 'text-slate-900'}>8%</div>
            </div>
          </div>
        </motion.div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors shadow-lg shadow-teal-500/30"
          >
            View Final Summary
          </button>
        </motion.div>
      </div>
    </div>
  );
}