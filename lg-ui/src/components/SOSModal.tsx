import { motion, AnimatePresence } from 'motion/react';
import { AlertOctagon, X, Clock, User, Mail } from 'lucide-react';

interface SOSModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  user: { name: string; email: string };
  darkMode: boolean;
}

export function SOSModal({ isOpen, onConfirm, onCancel, user, darkMode }: SOSModalProps) {
  if (!isOpen) return null;

  const timestamp = new Date().toLocaleString();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`${
                darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
              } rounded-2xl shadow-2xl border max-w-md w-full overflow-hidden`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 relative">
                <button
                  onClick={onCancel}
                  className="absolute top-4 right-4 p-2 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                    <AlertOctagon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-2xl font-bold mb-1">Emergency SOS</h2>
                    <p className="text-red-100">Confirm Emergency Alert</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className={`${
                  darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'
                } border rounded-xl p-4 mb-6`}>
                  <p className={`${darkMode ? 'text-red-200' : 'text-red-900'} font-semibold mb-2`}>
                    ⚠️ You are about to send an emergency alert
                  </p>
                  <p className={darkMode ? 'text-red-300' : 'text-red-700'}>
                    This will immediately notify the healthcare response team and emergency contacts.
                  </p>
                </div>

                {/* User Details */}
                <div className="space-y-3 mb-6">
                  <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} font-semibold mb-3`}>
                    Alert will include:
                  </h3>
                  
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-slate-900' : 'bg-slate-50'
                  }`}>
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Patient Name
                      </div>
                      <div className={darkMode ? 'text-white' : 'text-slate-900'}>
                        {user.name}
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-slate-900' : 'bg-slate-50'
                  }`}>
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Contact Email
                      </div>
                      <div className={darkMode ? 'text-white' : 'text-slate-900'}>
                        {user.email}
                      </div>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-slate-900' : 'bg-slate-50'
                  }`}>
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Timestamp
                      </div>
                      <div className={darkMode ? 'text-white' : 'text-slate-900'}>
                        {timestamp}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className={`flex-1 px-6 py-4 rounded-xl transition-colors ${
                      darkMode
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-colors shadow-lg shadow-red-500/30 font-bold"
                  >
                    Send SOS Alert
                  </button>
                </div>

                <p className={`text-center mt-4 text-sm ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  Response time: ~2-5 minutes
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
