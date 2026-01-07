import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Heart, TrendingUp, Moon } from 'lucide-react';
import { HealthModel } from '../../App';

interface SetupScreenProps {
  onNext: (model: HealthModel) => void;
  darkMode: boolean;
}

export function SetupScreen({ onNext, darkMode }: SetupScreenProps) {
  const [age, setAge] = useState(35);
  const [sex, setSex] = useState<'male' | 'female' | 'other'>('male');
  const [condition, setCondition] = useState('');
  const [lifestyle, setLifestyle] = useState<'sedentary' | 'moderate' | 'active'>('moderate');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ age, sex, condition: condition || undefined, lifestyle });
  };

  const baselineMetrics = [
    { label: 'Resting HR', value: `${60 + (lifestyle === 'active' ? -5 : lifestyle === 'sedentary' ? 10 : 0)} bpm`, icon: Heart },
    { label: 'Sleep Need', value: `${7 + (age > 50 ? 1 : 0)}h`, icon: Moon },
    { label: 'Activity', value: lifestyle === 'active' ? 'High' : lifestyle === 'moderate' ? 'Med' : 'Low', icon: Activity },
    { label: 'Risk Factor', value: age > 50 ? 'Elevated' : 'Normal', icon: TrendingUp },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50'} p-6 lg:p-12`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Digital Twin Creation</h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Configure your personalized health simulation baseline
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-lg border p-8 space-y-6`}>
              {/* Age */}
              <div>
                <label className={`block ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-600 text-white' : 'border-slate-300'} focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                  min="18"
                  max="100"
                />
              </div>

              {/* Sex */}
              <div>
                <label className={`block ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>Sex</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['male', 'female', 'other'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSex(option)}
                      className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                        sex === option
                          ? 'bg-teal-500 text-white border-teal-500'
                          : darkMode 
                            ? 'bg-slate-900 text-slate-300 border-slate-600 hover:border-teal-300'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-teal-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Known Condition */}
              <div>
                <label className={`block ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>
                  Known Condition <span className="text-slate-400">(optional)</span>
                </label>
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-600 text-white' : 'bg-white border-slate-300'} focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                >
                  <option value="">None</option>
                  <option value="hypertension">Hypertension</option>
                  <option value="diabetes">Diabetes</option>
                  <option value="sleep-apnea">Sleep Apnea</option>
                  <option value="arrhythmia">Arrhythmia</option>
                </select>
              </div>

              {/* Lifestyle */}
              <div>
                <label className={`block ${darkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>Lifestyle Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['sedentary', 'moderate', 'active'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setLifestyle(option)}
                      className={`px-4 py-3 rounded-xl border transition-all capitalize ${
                        lifestyle === option
                          ? 'bg-teal-500 text-white border-teal-500'
                          : darkMode
                            ? 'bg-slate-900 text-slate-300 border-slate-600 hover:border-teal-300'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-teal-300'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-6 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors shadow-lg shadow-teal-500/30"
              >
                Generate Simulation
              </button>
            </form>
          </motion.div>

          {/* Baseline Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-lg border p-8`}
          >
            <div className={`flex items-center gap-3 mb-6 pb-6 border-b ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className={darkMode ? 'text-white' : 'text-slate-900'}>Simulated Baseline Generated</h3>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Based on your inputs</p>
              </div>
            </div>

            <div className="space-y-4">
              {baselineMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className={`flex items-center justify-between p-4 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} rounded-xl`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${darkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg flex items-center justify-center shadow-sm`}>
                      <metric.icon className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className={darkMode ? 'text-slate-300' : 'text-slate-700'}>{metric.label}</span>
                  </div>
                  <span className={darkMode ? 'text-white' : 'text-slate-900'}>{metric.value}</span>
                </motion.div>
              ))}
            </div>

            <div className={`mt-8 p-4 ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border rounded-xl`}>
              <p className={darkMode ? 'text-blue-200' : 'text-blue-900'}>
                <strong>Note:</strong> This baseline is simulated based on population data and your inputs. It does not use real device data.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}