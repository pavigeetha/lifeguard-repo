import { motion } from 'motion/react';
import { Activity, Brain, Shield, Zap, BarChart3, Users, ArrowRight } from 'lucide-react';

interface ValueScreenProps {
  onReset: () => void;
  darkMode: boolean;
}

export function ValueScreen({ onReset, darkMode }: ValueScreenProps) {
  const features = [
    {
      icon: Brain,
      title: 'Pattern-Based Alerts',
      description: 'Detects subtle changes across multiple physiological signals before they become critical.',
      color: 'teal',
    },
    {
      icon: Users,
      title: 'Digital Twin Personalization',
      description: 'Creates a unique simulation model based on your age, condition, and lifestyle factors.',
      color: 'blue',
    },
    {
      icon: Shield,
      title: 'Safe Emergency Simulation',
      description: 'Test how your health twin responds to stress scenarios without real-world risk.',
      color: 'purple',
    },
    {
      icon: Zap,
      title: 'Device-Agnostic Design',
      description: 'Works with simulated data today, ready to integrate real sensors tomorrow.',
      color: 'cyan',
    },
  ];

  const metrics = [
    { label: 'Average Warning Time', value: '6-15 hrs', sublabel: 'before peak risk' },
    { label: 'Pattern Accuracy', value: '92%', sublabel: 'detection rate' },
    { label: 'Signals Monitored', value: '12+', sublabel: 'physiological markers' },
    { label: 'Simulation Speed', value: '1-4x', sublabel: 'real-time acceleration' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-teal-900 to-blue-900' : 'bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50'} p-6 lg:p-12`}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-teal-500 rounded-2xl flex items-center justify-center">
              <Activity className="w-10 h-10 text-white" />
            </div>
            <h1 className={darkMode ? 'text-white' : 'text-slate-900'}>LifeGuard</h1>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>
              Health Flight Simulator for Early Risk Detection
            </h2>
            <p className={`${darkMode ? 'text-teal-200' : 'text-slate-600'} max-w-2xl mx-auto leading-relaxed`}>
              A simulation-first approach to digital health monitoring that detects risk patterns before they become emergencies.
            </p>
          </motion.div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`${darkMode ? 'bg-white/10 border-white/20' : 'bg-white border-slate-200'} backdrop-blur-sm rounded-2xl p-6 border`}
            >
              <div className="text-teal-400">{metric.value}</div>
              <div className={`${darkMode ? 'text-white' : 'text-slate-900'} mt-1`}>{metric.label}</div>
              <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} mt-1`}>{metric.sublabel}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-8 text-center`}>Core Capabilities</h3>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`${darkMode ? 'bg-white/10 border-white/20 hover:bg-white/15' : 'bg-white border-slate-200 hover:border-teal-300'} backdrop-blur-sm rounded-2xl p-8 border transition-colors`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  feature.color === 'teal' ? 'bg-teal-500/20' :
                  feature.color === 'blue' ? 'bg-blue-500/20' :
                  feature.color === 'purple' ? 'bg-purple-500/20' :
                  'bg-cyan-500/20'
                }`}>
                  <feature.icon className={`w-7 h-7 ${
                    feature.color === 'teal' ? 'text-teal-400' :
                    feature.color === 'blue' ? 'text-blue-400' :
                    feature.color === 'purple' ? 'text-purple-400' :
                    'text-cyan-400'
                  }`} />
                </div>
                <h4 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>{feature.title}</h4>
                <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} leading-relaxed`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className={`${darkMode ? 'bg-teal-500/20 border-teal-500/30' : 'bg-gradient-to-r from-teal-100 to-blue-100 border-teal-300'} backdrop-blur-sm rounded-2xl p-8 border mb-12`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-3`}>Future: Plug in Real Data</h3>
              <p className={`${darkMode ? 'text-teal-100' : 'text-slate-700'} leading-relaxed mb-4`}>
                Today, LifeGuard demonstrates early-warning capability through simulation. Tomorrow, it will connect to real wearables and health devices, 
                applying the same pattern-detection algorithms to live physiological data while maintaining privacy and security.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${darkMode ? 'bg-white/10' : 'bg-white'} rounded-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Wearable Integration
                </div>
                <div className={`px-4 py-2 ${darkMode ? 'bg-white/10' : 'bg-white'} rounded-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  Clinical Validation
                </div>
                <div className={`px-4 py-2 ${darkMode ? 'bg-white/10' : 'bg-white'} rounded-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                  FDA Pathway
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center"
        >
          <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} mt-4`}>
            Navigate between screens using the dots on the right
          </p>
        </motion.div>
      </div>
    </div>
  );
}