import { motion } from 'motion/react';
import { Wifi, FileDown, RefreshCw, Heart, Moon, Activity, TrendingUp, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { ReportPreviewModal } from '../ReportPreviewModal';
import { ConnectDevicesModal } from '../ConnectDevicesModal';

interface OverviewScreenProps {
  darkMode: boolean;
  onNavigate: (tab: string) => void;
  user: { name: string; email: string };
}

export function OverviewScreen({ darkMode, onNavigate, user }: OverviewScreenProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [showDevicesModal, setShowDevicesModal] = useState(false);

  const quickActions = [
    { icon: Wifi, label: 'Connect Devices', sublabel: 'Link wearables', action: () => setShowDevicesModal(true) },
    { icon: FileDown, label: 'Export Report', sublabel: 'Download data', action: () => setShowReportModal(true) },
    { icon: RefreshCw, label: 'Sync Data', sublabel: 'Update health twin', action: () => {} },
  ];

  const healthMetrics = [
    { icon: Heart, label: 'Heart Rate', value: '72 bpm', status: 'normal', color: 'teal' },
    { icon: Moon, label: 'Sleep Quality', value: '78%', status: 'good', color: 'blue' },
    { icon: Activity, label: 'Activity', value: '65%', status: 'active', color: 'cyan' },
    { icon: TrendingUp, label: 'Risk Score', value: '18/100', status: 'low', color: 'green' },
  ];

  const recentAlerts = [
    { title: 'Sleep pattern improvement', time: '2 hours ago', type: 'positive' },
    { title: 'Activity level stable', time: '5 hours ago', type: 'neutral' },
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
          <h1 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
            Welcome to LifeGuard, {user.name}
          </h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Your Digital Health Twin Dashboard
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={action.action}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                  darkMode 
                    ? 'bg-slate-800/50 border-slate-700 hover:border-teal-500' 
                    : 'bg-white border-slate-200 hover:border-teal-500'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  action.icon === Wifi ? 'bg-teal-100' :
                  action.icon === FileDown ? 'bg-blue-100' :
                  'bg-purple-100'
                }`}>
                  <action.icon className={`w-6 h-6 ${
                    action.icon === Wifi ? 'text-teal-600' :
                    action.icon === FileDown ? 'text-blue-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <div>
                  <div className={darkMode ? 'text-white' : 'text-slate-900'}>{action.label}</div>
                  <div className={darkMode ? 'text-slate-400' : 'text-slate-500'}>{action.sublabel}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Health Metrics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Health Metrics</h3>
          <div className="grid md:grid-cols-4 gap-4">
            {healthMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl p-6 border`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    metric.color === 'teal' ? 'bg-teal-100' :
                    metric.color === 'blue' ? 'bg-blue-100' :
                    metric.color === 'cyan' ? 'bg-cyan-100' :
                    'bg-green-100'
                  }`}>
                    <metric.icon className={`w-5 h-5 ${
                      metric.color === 'teal' ? 'text-teal-600' :
                      metric.color === 'blue' ? 'text-blue-600' :
                      metric.color === 'cyan' ? 'text-cyan-600' :
                      'text-green-600'
                    }`} />
                  </div>
                </div>
                <div className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-1`}>
                  {metric.label}
                </div>
                <div className={`${darkMode ? 'text-white' : 'text-slate-900'} text-2xl font-bold`}>
                  {metric.value}
                </div>
                <div className={`mt-2 inline-block px-2 py-1 rounded-full text-xs ${
                  metric.status === 'normal' || metric.status === 'low' ? 'bg-green-100 text-green-700' :
                  metric.status === 'good' ? 'bg-blue-100 text-blue-700' :
                  'bg-cyan-100 text-cyan-700'
                }`}>
                  {metric.status}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-xl p-6 border`}
          >
            <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Recent Activity</h3>
            <div className="space-y-3">
              {recentAlerts.map((alert, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    darkMode ? 'bg-slate-900' : 'bg-slate-50'
                  }`}
                >
                  <div className={darkMode ? 'text-white' : 'text-slate-900'}>
                    {alert.title}
                  </div>
                  <div className={`${darkMode ? 'text-slate-500' : 'text-slate-500'} text-sm mt-1`}>
                    {alert.time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Get Started */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`${darkMode ? 'bg-gradient-to-br from-teal-900/50 to-blue-900/50 border-teal-700' : 'bg-gradient-to-br from-teal-50 to-blue-50 border-teal-300'} rounded-xl p-6 border`}
          >
            <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-4`}>Get Started</h3>
            <p className={`${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-6`}>
              Set up your digital health twin to start receiving personalized health insights and early warnings.
            </p>
            <button
              onClick={() => onNavigate('setup')}
              className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors"
            >
              Create Digital Twin
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      </div>
      <ReportPreviewModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        darkMode={darkMode}
        user={user}
      />
      <ConnectDevicesModal
        isOpen={showDevicesModal}
        onClose={() => setShowDevicesModal(false)}
        darkMode={darkMode}
      />
    </div>
  );
}