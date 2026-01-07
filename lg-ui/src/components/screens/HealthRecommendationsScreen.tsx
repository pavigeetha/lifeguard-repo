import { motion } from 'motion/react';
import { Droplet, Moon, Heart, Activity, Smile, Bell, Clock, Check, Shield, Plus, X } from 'lucide-react';
import { useState } from 'react';
import { HealthModel } from '../../App';

interface HealthRecommendationsScreenProps {
  darkMode: boolean;
  healthModel: HealthModel | null;
}

interface Reminder {
  id: string;
  title: string;
  enabled: boolean;
  frequency: string;
  isCustom?: boolean;
}

export function HealthRecommendationsScreen({ darkMode, healthModel }: HealthRecommendationsScreenProps) {
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customTime, setCustomTime] = useState('09:00');
  const [customFrequency, setCustomFrequency] = useState('Daily');
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 'water', title: 'Remind me to Drink Water', enabled: false, frequency: 'Every 2 hours' },
    { id: 'sleep', title: 'Sleep Time Reminder', enabled: false, frequency: 'Daily at 10 PM' },
    { id: 'activity', title: 'Activity / Movement Reminder', enabled: false, frequency: 'Daily at 2 PM' },
    { id: 'health-check', title: 'Medication / Health Check Reminder', enabled: false, frequency: 'Daily at 9 AM' },
  ]);

  const recommendations = [
    {
      icon: Droplet,
      title: 'Stay Hydrated',
      description: 'Aim for 6–8 glasses of water today to maintain optimal hydration.',
      status: 'Recommended',
      statusColor: 'teal',
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Moon,
      title: 'Improve Sleep Quality',
      description: 'Try sleeping before 11 PM for better recovery and lower stress levels.',
      status: 'High Priority',
      statusColor: 'purple',
      gradient: 'from-indigo-400 to-purple-400',
    },
    {
      icon: Activity,
      title: 'Daily Activity Boost',
      description: 'Target at least 30 minutes of light to moderate exercise.',
      status: 'Recommended',
      statusColor: 'teal',
      gradient: 'from-green-400 to-emerald-400',
    },
    {
      icon: Heart,
      title: 'Heart Health Tip',
      description: 'Breathing exercises can help stabilize heart rate and stress.',
      status: 'Optional',
      statusColor: 'slate',
      gradient: 'from-pink-400 to-rose-400',
    },
    {
      icon: Smile,
      title: 'Stress Management',
      description: 'Try 5 minutes of relaxation or meditation to reduce tension.',
      status: 'Recommended',
      statusColor: 'teal',
      gradient: 'from-amber-400 to-orange-400',
    },
  ];

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const updateFrequency = (id: string, frequency: string) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, frequency } : r
    ));
  };

  const handleSaveReminders = () => {
    // Save reminders logic here
    console.log('Saving reminders:', reminders);
    
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3000);
  };

  const getStatusColor = (color: string) => {
    switch (color) {
      case 'teal':
        return 'bg-teal-100 text-teal-700 border-teal-200';
      case 'purple':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'slate':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-teal-100 text-teal-700 border-teal-200';
    }
  };

  const getStatusColorDark = (color: string) => {
    switch (color) {
      case 'teal':
        return 'bg-teal-900/30 text-teal-300 border-teal-700';
      case 'purple':
        return 'bg-purple-900/30 text-purple-300 border-purple-700';
      case 'slate':
        return 'bg-slate-700/30 text-slate-300 border-slate-600';
      default:
        return 'bg-teal-900/30 text-teal-300 border-teal-700';
    }
  };

  const addCustomReminder = () => {
    const newReminder: Reminder = {
      id: `custom-${Date.now()}`,
      title: customTitle,
      enabled: true,
      frequency: `${customFrequency} at ${customTime}`,
      isCustom: true,
    };
    setReminders([...reminders, newReminder]);
    setShowCustomModal(false);
    setCustomTitle('');
    setCustomTime('09:00');
    setCustomFrequency('Daily');
  };

  const removeCustomReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} p-6 lg:p-12`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
            Health Recommendations
          </h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Personalized tips to improve your health and reduce risk
          </p>
        </motion.div>

        {/* Recommendation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendations.map((rec, index) => {
            const Icon = rec.icon;
            return (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
                } rounded-2xl p-6 border hover:shadow-lg transition-all duration-300 hover:scale-[1.02]`}
              >
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${rec.gradient} flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Title */}
                <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
                  {rec.title}
                </h3>

                {/* Description */}
                <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm mb-4 leading-relaxed`}>
                  {rec.description}
                </p>

                {/* Status Tag */}
                <div className="flex">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                    darkMode ? getStatusColorDark(rec.statusColor) : getStatusColor(rec.statusColor)
                  }`}>
                    {rec.status}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reminders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`${
            darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
          } rounded-2xl p-8 border mb-8`}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={darkMode ? 'text-white' : 'text-slate-900'}>Set Health Reminders</h2>
              <p className={`${darkMode ? 'text-slate-400' : 'text-slate-600'} text-sm`}>
                Never miss important healthy habits
              </p>
            </div>
          </div>

          {/* Reminder Items */}
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`p-4 rounded-xl border ${
                  darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                } flex items-center justify-between flex-wrap gap-4`}
              >
                <div className="flex items-center gap-4 flex-1">
                  {/* Toggle Switch */}
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${
                      reminder.enabled
                        ? 'bg-teal-500'
                        : darkMode
                          ? 'bg-slate-700'
                          : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        reminder.enabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  {/* Reminder Title */}
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                      {reminder.title}
                    </div>
                    {reminder.enabled && (
                      <div className={`text-sm ${darkMode ? 'text-teal-400' : 'text-teal-600'}`}>
                        Active
                      </div>
                    )}
                  </div>
                </div>

                {/* Frequency Selector */}
                <div className="flex items-center gap-2">
                  <Clock className={`w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                  <select
                    value={reminder.frequency}
                    onChange={(e) => updateFrequency(reminder.id, e.target.value)}
                    disabled={!reminder.enabled}
                    className={`px-3 py-2 rounded-lg border transition-colors ${
                      darkMode
                        ? 'bg-slate-800 border-slate-600 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } ${!reminder.enabled && 'opacity-50 cursor-not-allowed'}`}
                  >
                    <option value="Every 2 hours">Every 2 hours</option>
                    <option value="Every 3 hours">Every 3 hours</option>
                    <option value="Every 4 hours">Every 4 hours</option>
                    <option value="Daily at 9 AM">Daily at 9 AM</option>
                    <option value="Daily at 2 PM">Daily at 2 PM</option>
                    <option value="Daily at 10 PM">Daily at 10 PM</option>
                    <option value="Once per day">Once per day</option>
                    {reminder.isCustom && <option value={reminder.frequency}>{reminder.frequency}</option>}
                  </select>
                  
                  {/* Remove custom reminder button */}
                  {reminder.isCustom && (
                    <button
                      onClick={() => removeCustomReminder(reminder.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                      title="Remove custom reminder"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Custom Reminder Button */}
          <div className="mt-4">
            <button
              onClick={() => setShowCustomModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg shadow-teal-500/30 flex items-center gap-2 font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add Custom Reminder
            </button>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={handleSaveReminders}
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl transition-all shadow-lg shadow-teal-500/30 flex items-center gap-2 font-semibold"
          >
            <Check className="w-5 h-5" />
            Save Reminders
          </button>
        </motion.div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 flex items-start gap-2 text-xs text-slate-400 justify-center"
        >
          <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed max-w-2xl text-center">
            Your data is securely protected. We follow encryption, consent, and minimal data storage principles.
          </p>
        </motion.div>
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <Check className="w-6 h-6" />
            <div>
              <div className="font-bold">Reminders Updated Successfully</div>
              <div className="text-sm text-green-100">Your health reminder preferences have been saved</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Custom Reminder Modal */}
      {showCustomModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add Custom Reminder</h2>
              <button
                onClick={() => setShowCustomModal(false)}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Title</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Frequency</label>
                  <select
                    value={customFrequency}
                    onChange={(e) => setCustomFrequency(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Time</label>
                  <input
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCustomModal(false)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl transition-all shadow-lg shadow-slate-200/30 flex items-center gap-2 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={addCustomReminder}
                disabled={!customTitle.trim()}
                className={`px-4 py-2 rounded-xl transition-all shadow-lg flex items-center gap-2 font-semibold ${
                  customTitle.trim()
                    ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-teal-500/30'
                    : 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                Add Reminder
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}