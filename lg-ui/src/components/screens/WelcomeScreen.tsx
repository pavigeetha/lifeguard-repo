import { motion } from 'motion/react';
import { Activity, Heart, Moon, Wifi, FileDown, RefreshCw } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
  darkMode: boolean;
}

export function WelcomeScreen({ onNext, darkMode }: WelcomeScreenProps) {
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900' : 'bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50'} flex items-center justify-center p-6`}>
      <div className="max-w-6xl w-full">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className={darkMode ? 'text-white' : 'text-teal-900'}>LifeGuard</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className={darkMode ? 'text-white mb-4' : 'text-slate-900 mb-4'}>
            Your Digital Health Twin
          </h1>
          <p className={`max-w-md mx-auto ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Simulate health trajectories. Detect risk early.
          </p>
        </motion.div>

        {/* Illustration */}
        <div className="relative w-full max-w-sm mx-auto mb-12 h-80 flex items-center justify-center">
          {/* Human silhouette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative w-32 h-64"
          >
            {/* Body */}
            <div className="absolute inset-0 flex flex-col items-center">
              {/* Head */}
              <div className={`w-16 h-16 rounded-full ${darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300'} mb-2`} />
              {/* Torso */}
              <div className={`w-20 h-28 rounded-2xl ${darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300'}`} />
              {/* Legs */}
              <div className="flex gap-2 mt-2">
                <div className={`w-8 h-20 rounded-xl ${darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300'}`} />
                <div className={`w-8 h-20 rounded-xl ${darkMode ? 'bg-gradient-to-br from-slate-700 to-slate-600' : 'bg-gradient-to-br from-slate-200 to-slate-300'}`} />
              </div>
            </div>
          </motion.div>

          {/* Animated waveform layers */}
          <WaveformLayer icon={Heart} color="teal" delay={0.6} radius={140} darkMode={darkMode} />
          <WaveformLayer icon={Moon} color="blue" delay={0.8} radius={180} darkMode={darkMode} />
          <WaveformLayer icon={Activity} color="cyan" delay={1.0} radius={220} darkMode={darkMode} />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <button className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700 hover:border-teal-500 text-white' 
                : 'bg-white border-slate-200 hover:border-teal-500 text-slate-900'
            }`}>
              <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-teal-600" />
              </div>
              <div className="text-left">
                <div className={darkMode ? 'text-white' : 'text-slate-900'}>Connect Devices</div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Link wearables</div>
              </div>
            </button>

            <button className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700 hover:border-teal-500 text-white' 
                : 'bg-white border-slate-200 hover:border-teal-500 text-slate-900'
            }`}>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileDown className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className={darkMode ? 'text-white' : 'text-slate-900'}>Export Report</div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Download data</div>
              </div>
            </button>

            <button className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-700 hover:border-teal-500 text-white' 
                : 'bg-white border-slate-200 hover:border-teal-500 text-slate-900'
            }`}>
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className={darkMode ? 'text-white' : 'text-slate-900'}>Sync Data</div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Update health twin</div>
              </div>
            </button>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center"
        >
          <button
            onClick={onNext}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors shadow-lg shadow-teal-500/30"
          >
            Create Health Model
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function WaveformLayer({ 
  icon: Icon, 
  color, 
  delay, 
  radius,
  darkMode
}: { 
  icon: any; 
  color: string; 
  delay: number; 
  radius: number;
  darkMode: boolean;
}) {
  const colorMap = darkMode ? {
    teal: 'rgba(20, 184, 166, 0.2)',
    blue: 'rgba(59, 130, 246, 0.2)',
    cyan: 'rgba(6, 182, 212, 0.2)',
  } : {
    teal: 'rgba(20, 184, 166, 0.15)',
    blue: 'rgba(59, 130, 246, 0.15)',
    cyan: 'rgba(6, 182, 212, 0.15)',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 1, repeat: Infinity, repeatDelay: 2 }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ width: radius * 2, height: radius * 2, margin: 'auto' }}
    >
      <div 
        className="absolute inset-0 rounded-full border-2 opacity-40"
        style={{ 
          borderColor: colorMap[color as keyof typeof colorMap],
          backgroundColor: colorMap[color as keyof typeof colorMap]
        }}
      />
      <div className={`absolute top-4 right-4 w-8 h-8 bg-${color}-500/20 rounded-full flex items-center justify-center`}>
        <Icon className={`w-4 h-4 text-${color}-600`} />
      </div>
    </motion.div>
  );
}