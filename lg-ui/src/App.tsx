import { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './components/Dashboard';
import { WelcomeSurvey, SurveyData } from './components/WelcomeSurvey';
import { Moon, Sun } from 'lucide-react';

export type HealthModel = {
  age: number;
  sex: 'male' | 'female' | 'other';
  condition?: string;
  lifestyle: 'sedentary' | 'moderate' | 'active';
};

export type SimulationState = {
  mode: 'normal' | 'stress' | 'anomaly' | 'recovery';
  playing: boolean;
  speed: number;
  time: number;
};

export type User = {
  name: string;
  email: string;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [healthModel, setHealthModel] = useState<HealthModel | null>(null);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleLogin = (userData: User, isSignup: boolean) => {
    setUser(userData);
    setIsAuthenticated(true);
    setIsNewUser(isSignup);
    
    // If it's a login (not signup), skip survey entirely
    if (!isSignup) {
      setSurveyCompleted(true);
    } else {
      // For new signups, show the survey
      setSurveyCompleted(false);
    }
  };

  const handleSurveyComplete = (data: SurveyData) => {
    console.log('Survey completed:', data);
    
    // Convert survey data to health model
    let lifestyle: 'sedentary' | 'moderate' | 'active' = 'moderate';
    if (data.activityLevel === 'very-active' || data.activityLevel === 'active') {
      lifestyle = 'active';
    } else if (data.activityLevel === 'sedentary' || data.activityLevel === 'inactive') {
      lifestyle = 'sedentary';
    }
    
    // Store survey data for later use
    setSurveyCompleted(true);
    localStorage.setItem(`survey_${user!.email}`, 'true');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHealthModel(null);
    setSurveyCompleted(false);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        {!isAuthenticated ? (
          <AuthScreen onLogin={handleLogin} darkMode={darkMode} />
        ) : !surveyCompleted ? (
          <WelcomeSurvey user={user!} darkMode={darkMode} onComplete={handleSurveyComplete} />
        ) : (
          <Dashboard 
            user={user!}
            darkMode={darkMode}
            onLogout={handleLogout}
            healthModel={healthModel}
            setHealthModel={setHealthModel}
          />
        )}
        
        {/* Theme Toggle - Top Right */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 w-12 h-12 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:scale-110 transition-transform z-50"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>
      </div>
    </div>
  );
}