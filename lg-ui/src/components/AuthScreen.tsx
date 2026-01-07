import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Mail, Lock, User as UserIcon } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (user: { name: string; email: string }, isSignup: boolean) => void;
  darkMode: boolean;
}

export function AuthScreen({ onLogin, darkMode }: AuthScreenProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!password.trim()) {
      alert('Please enter your password');
      return;
    }
    if (!isLogin && !name.trim()) {
      alert('Please enter your name');
      return;
    }
    
    onLogin({
      name: isLogin ? email.split('@')[0] : name,
      email: email
    }, !isLogin); // Pass true if it's signup, false if login
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900' 
        : 'bg-gradient-to-br from-slate-50 via-teal-50 to-blue-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              LifeGuard
            </span>
          </div>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Your Digital Health Twin
          </p>
        </div>

        {/* Form */}
        <div className={`${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        } rounded-2xl shadow-2xl border p-8`}>
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl transition-all ${
                isLogin
                  ? 'bg-teal-500 text-white'
                  : darkMode
                    ? 'bg-slate-900 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl transition-all ${
                !isLogin
                  ? 'bg-teal-500 text-white'
                  : darkMode
                    ? 'bg-slate-900 text-slate-400'
                    : 'bg-slate-100 text-slate-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                      darkMode
                        ? 'bg-slate-900 border-slate-600 text-white'
                        : 'bg-white border-slate-300 text-slate-900'
                    } focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                  />
                </div>
              </div>
            )}

            <div>
              <label className={`block mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    darkMode
                      ? 'bg-slate-900 border-slate-600 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  } focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                />
              </div>
            </div>

            <div>
              <label className={`block mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border ${
                    darkMode
                      ? 'bg-slate-900 border-slate-600 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  } focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20`}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl transition-colors shadow-lg shadow-teal-500/30 mt-6"
            >
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-teal-500 hover:text-teal-600 transition-colors">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        <p className={`text-center mt-6 ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
          
        </p>
      </motion.div>
    </div>
  );
}