import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Heart,
  AlertTriangle,
  BarChart3,
  History,
  User,
  Menu,
  X,
  Sun,
  Moon,
  AlertCircle,
  Shield,
  AlertOctagon,
  LogOut,
  Lightbulb,
} from 'lucide-react';
import { OverviewScreen } from './screens/OverviewScreen';
import { SetupScreen } from './screens/SetupScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { AlertScreen } from './screens/AlertScreen';
import { ExplanationScreen } from './screens/ExplanationScreen';
import { ReplayScreen } from './screens/ReplayScreen';
import { ValueScreen } from './screens/ValueScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { HistoricalDashboard } from './screens/HistoricalDashboard';
import { HealthRecommendationsScreen } from './screens/HealthRecommendationsScreen';
import { SOSModal } from './SOSModal';
import { HealthModel } from '../App';

interface DashboardProps {
  user: { name: string; email: string };
  darkMode: boolean;
  onLogout: () => void;
  healthModel: HealthModel | null;
  setHealthModel: (model: HealthModel) => void;
}

type TabType = 'overview' | 'setup' | 'health-signals' | 'historical' | 'alerts' | 'ai-analysis' | 'replay' | 'summary' | 'profile' | 'recommendations' | 'wireframe' | 'complete-wireframe';

export function Dashboard({ user, darkMode, onLogout, healthModel, setHealthModel }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSOSModal, setShowSOSModal] = useState(false);
  const [sosAlertSent, setSOSAlertSent] = useState(false);

  const handleSOSClick = () => {
    setShowSOSModal(true);
  };

  const handleSOSConfirm = () => {
    // Send emergency alert
    const timestamp = new Date().toLocaleString();
    console.log('🚨 EMERGENCY ALERT SENT 🚨');
    console.log('User:', user.name);
    console.log('Email:', user.email);
    console.log('Timestamp:', timestamp);
    console.log('Health Model:', healthModel);
    
    setShowSOSModal(false);
    setSOSAlertSent(true);
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSOSAlertSent(false);
    }, 5000);
  };

  const handleSOSCancel = () => {
    setShowSOSModal(false);
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Home Page', icon: Activity },
    { id: 'setup' as TabType, label: 'Digital Twin Setup', icon: User },
    { id: 'health-signals' as TabType, label: 'Health Signals', icon: Heart },
    { id: 'historical' as TabType, label: 'Historical Dashboard', icon: History },
    { id: 'alerts' as TabType, label: 'Early Warnings', icon: AlertTriangle },
    { id: 'ai-analysis' as TabType, label: 'AI Analysis', icon: BarChart3 },
    { id: 'recommendations' as TabType, label: 'Health Recommendations', icon: Lightbulb },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  const renderContent = () => {
    const simulation = { mode: 'normal' as const, playing: false, speed: 1, time: 0 };

    switch (activeTab) {
      case 'overview':
        return <OverviewScreen darkMode={darkMode} onNavigate={setActiveTab} user={user} />;
      case 'setup':
        return <SetupScreen onNext={setHealthModel} darkMode={darkMode} />;
      case 'health-signals':
        return <DashboardScreen onNext={() => {}} darkMode={darkMode} />;
      case 'historical':
        return <HistoricalDashboard darkMode={darkMode} />;
      case 'alerts':
        return <AlertScreen onNext={() => {}} darkMode={darkMode} />;
      case 'ai-analysis':
        return <ExplanationScreen onNext={() => {}} darkMode={darkMode} />;
      case 'replay':
        return <ReplayScreen onNext={() => {}} darkMode={darkMode} />;
      case 'summary':
        return <ValueScreen onReset={() => {}} darkMode={darkMode} />;
      case 'profile':
        return <ProfileScreen user={user} healthModel={healthModel} darkMode={darkMode} onLogout={onLogout} />;
      case 'recommendations':
        return <HealthRecommendationsScreen healthModel={healthModel} darkMode={darkMode} />;
      default:
        return <OverviewScreen darkMode={darkMode} onNavigate={setActiveTab} user={user} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${
        darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
      } border-r transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                LifeGuard
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-2 rounded-lg ${
              darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'
            } transition-colors`}
          >
            {sidebarOpen ? (
              <X className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            ) : (
              <Menu className={`w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`} />
            )}
          </button>
        </div>

        {/* SOS Button - Prominent */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={handleSOSClick}
            className="w-full flex items-center gap-3 px-3 py-4 rounded-xl transition-all bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg shadow-red-500/30 animate-pulse"
            title={!sidebarOpen ? 'Emergency SOS' : undefined}
          >
            <AlertOctagon className="w-6 h-6 flex-shrink-0" />
            {sidebarOpen && <span className="font-bold">Emergency SOS</span>}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-teal-500 text-white'
                      : darkMode
                        ? 'text-slate-400 hover:bg-slate-700 hover:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={!sidebarOpen ? tab.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Section */}
        <div className={`p-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-colors ${
              darkMode
                ? 'text-red-400 hover:bg-red-900/20'
                : 'text-red-600 hover:bg-red-50'
            }`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
          
          {/* Privacy Assurance */}
          {sidebarOpen && (
            <div className={`mt-4 pt-4 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
              <div className="flex items-start gap-2 text-xs text-slate-400">
                <Shield className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  Your data is securely protected. We follow encryption, consent, and minimal data storage principles.
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>

      {/* SOS Modal */}
      <SOSModal
        isOpen={showSOSModal}
        onConfirm={handleSOSConfirm}
        onCancel={handleSOSCancel}
        user={user}
        darkMode={darkMode}
      />

      {/* SOS Alert Sent Notification */}
      {sosAlertSent && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top">
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <AlertOctagon className="w-6 h-6" />
            <div>
              <div className="font-bold">Emergency Alert Sent!</div>
              <div className="text-sm text-green-100">Healthcare team has been notified</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}