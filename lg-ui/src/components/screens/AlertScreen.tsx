import { motion } from 'motion/react';
import { AlertTriangle, Heart, Moon, TrendingUp, Clock } from 'lucide-react';

interface AlertScreenProps {
  onNext: () => void;
  darkMode: boolean;
}

export function AlertScreen({ onNext, darkMode }: AlertScreenProps) {
  const timelinePhases = [
    { label: 'Pre-Anomaly', time: '-24h', status: 'normal', color: 'teal' },
    { label: 'Early Detection', time: '-6h', status: 'warning', color: 'amber' },
    { label: 'Alert Triggered', time: 'now', status: 'alert', color: 'red' },
    { label: 'Projected Recovery', time: '+12h', status: 'recovery', color: 'green' },
  ];

  const correlatedSignals = [
    { icon: Heart, label: 'Heart Rate Variability', trend: 'Decreasing', severity: 'high' },
    { icon: Moon, label: 'Sleep Quality', trend: 'Declining', severity: 'high' },
    { icon: TrendingUp, label: 'Resting HR', trend: 'Elevated', severity: 'medium' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-red-50 via-amber-50 to-slate-50'} p-6 lg:p-12`}>
      <div className="max-w-4xl mx-auto">
        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-2xl shadow-2xl p-8 mb-8"
        >
          <div className="flex items-start gap-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <AlertTriangle className="w-12 h-12" />
            </motion.div>
            <div className="flex-1">
              <h2 className="text-white mb-3">Early Warning Alert</h2>
              <p className="text-white/90 leading-relaxed">
                Rising heart instability combined with declining sleep quality indicates elevated cardiac stress risk.
              </p>
              <div className="mt-4 flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4" />
                <span>Detected 6 hours before peak risk</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-lg border p-8 mb-8`}
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-6`}>Risk Progression Timeline</h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-8 h-1 bg-gradient-to-r from-teal-200 via-amber-300 to-red-400" />
            
            <div className="relative grid grid-cols-4 gap-4">
              {timelinePhases.map((phase, index) => (
                <motion.div
                  key={phase.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="text-center"
                >
                  {/* Node */}
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center border-4 border-white shadow-lg ${
                    phase.color === 'teal' ? 'bg-teal-400' :
                    phase.color === 'amber' ? 'bg-amber-400' :
                    phase.color === 'red' ? 'bg-red-500' :
                    'bg-green-400'
                  }`}>
                    <div className="text-white">{phase.time}</div>
                  </div>
                  
                  {/* Label */}
                  <div className="text-slate-700">{phase.label}</div>
                  <div className={`text-slate-500 capitalize mt-1`}>
                    {phase.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Correlated Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-lg border p-8 mb-8`}
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-6`}>Correlated Health Signals</h3>
          
          <div className="space-y-4">
            {correlatedSignals.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
                  signal.severity === 'high' 
                    ? 'bg-red-50 border-red-200' 
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  signal.severity === 'high' ? 'bg-red-100' : 'bg-amber-100'
                }`}>
                  <signal.icon className={`w-6 h-6 ${
                    signal.severity === 'high' ? 'text-red-600' : 'text-amber-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="text-slate-900">{signal.label}</div>
                  <div className="text-slate-600">{signal.trend}</div>
                </div>
                <div className={`px-3 py-1 rounded-full capitalize ${
                  signal.severity === 'high' 
                    ? 'bg-red-200 text-red-700' 
                    : 'bg-amber-200 text-amber-700'
                }`}>
                  {signal.severity}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Continue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors shadow-lg shadow-teal-500/30"
          >
            View AI Explanation
          </button>
        </motion.div>
      </div>
    </div>
  );
}