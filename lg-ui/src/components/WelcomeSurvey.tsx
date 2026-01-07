import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Heart, Activity, Moon, Smile, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface WelcomeSurveyProps {
  user: { name: string; email: string };
  darkMode: boolean;
  onComplete: (data: SurveyData) => void;
}

export interface SurveyData {
  feeling: string;
  sleepQuality: string;
  stressLevel: string;
  activityLevel: string;
  healthConcerns: string[];
  currentSymptoms: string;
}

export function WelcomeSurvey({ user, darkMode, onComplete }: WelcomeSurveyProps) {
  const [step, setStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    feeling: '',
    sleepQuality: '',
    stressLevel: '',
    activityLevel: '',
    healthConcerns: [],
    currentSymptoms: '',
  });

  const firstName = user.name.split(' ')[0];

  const updateData = (field: keyof SurveyData, value: any) => {
    setSurveyData({ ...surveyData, [field]: value });
  };

  const toggleConcern = (concern: string) => {
    const current = surveyData.healthConcerns;
    if (current.includes(concern)) {
      updateData('healthConcerns', current.filter(c => c !== concern));
    } else {
      updateData('healthConcerns', [...current, concern]);
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      onComplete(surveyData);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return surveyData.feeling !== '';
      case 1:
        return surveyData.sleepQuality !== '';
      case 2:
        return surveyData.stressLevel !== '';
      case 3:
        return surveyData.activityLevel !== '';
      case 4:
        return true; // health concerns are optional
      case 5:
        return true; // symptoms are optional
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <StepContainer
            icon={Smile}
            title={`Welcome, ${firstName}! 👋`}
            subtitle="Let's start by understanding how you're feeling today"
            darkMode={darkMode}
          >
            <div className="space-y-3">
              {[
                { value: 'great', emoji: '😊', label: 'Great - Feeling energetic and positive' },
                { value: 'good', emoji: '🙂', label: 'Good - Doing well overall' },
                { value: 'okay', emoji: '😐', label: 'Okay - Average day' },
                { value: 'tired', emoji: '😮‍💨', label: 'Tired - Low energy' },
                { value: 'unwell', emoji: '😷', label: 'Not well - Experiencing discomfort' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData('feeling', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    surveyData.feeling === option.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.emoji}</span>
                    <span className={`${
                      surveyData.feeling === option.value
                        ? 'text-teal-700 dark:text-teal-300 font-semibold'
                        : darkMode
                          ? 'text-white'
                          : 'text-slate-900'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 1:
        return (
          <StepContainer
            icon={Moon}
            title="How's your sleep been?"
            subtitle="Sleep quality affects your overall health significantly"
            darkMode={darkMode}
          >
            <div className="space-y-3">
              {[
                { value: 'excellent', label: 'Excellent - 7-9 hours, well-rested' },
                { value: 'good', label: 'Good - Decent sleep, minor interruptions' },
                { value: 'fair', label: 'Fair - Some difficulty sleeping' },
                { value: 'poor', label: 'Poor - Frequent waking or insomnia' },
                { value: 'very-poor', label: 'Very Poor - Major sleep issues' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData('sleepQuality', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    surveyData.sleepQuality === option.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`${
                    surveyData.sleepQuality === option.value
                      ? 'text-teal-700 dark:text-teal-300 font-semibold'
                      : darkMode
                        ? 'text-white'
                        : 'text-slate-900'
                  }`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 2:
        return (
          <StepContainer
            icon={Heart}
            title="What's your stress level?"
            subtitle="Understanding stress helps us monitor your health better"
            darkMode={darkMode}
          >
            <div className="space-y-3">
              {[
                { value: 'low', label: 'Low - Relaxed and calm', color: 'green' },
                { value: 'moderate', label: 'Moderate - Normal daily stress', color: 'blue' },
                { value: 'high', label: 'High - Feeling pressured', color: 'yellow' },
                { value: 'very-high', label: 'Very High - Overwhelmed', color: 'orange' },
                { value: 'extreme', label: 'Extreme - Crisis level', color: 'red' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData('stressLevel', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    surveyData.stressLevel === option.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-${option.color}-500`} />
                    <span className={`${
                      surveyData.stressLevel === option.value
                        ? 'text-teal-700 dark:text-teal-300 font-semibold'
                        : darkMode
                          ? 'text-white'
                          : 'text-slate-900'
                    }`}>
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 3:
        return (
          <StepContainer
            icon={Activity}
            title="Activity Level"
            subtitle="How active have you been in the past week?"
            darkMode={darkMode}
          >
            <div className="space-y-3">
              {[
                { value: 'very-active', label: 'Very Active - Regular exercise, 5+ days/week' },
                { value: 'active', label: 'Active - Exercise 3-4 days/week' },
                { value: 'moderate', label: 'Moderate - Light activity, 1-2 days/week' },
                { value: 'sedentary', label: 'Sedentary - Mostly sitting, minimal activity' },
                { value: 'inactive', label: 'Inactive - No exercise routine' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateData('activityLevel', option.value)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    surveyData.activityLevel === option.value
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`${
                    surveyData.activityLevel === option.value
                      ? 'text-teal-700 dark:text-teal-300 font-semibold'
                      : darkMode
                        ? 'text-white'
                        : 'text-slate-900'
                  }`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 4:
        return (
          <StepContainer
            icon={TrendingUp}
            title="Health Concerns"
            subtitle="Select any areas you'd like us to monitor (optional)"
            darkMode={darkMode}
          >
            <div className="space-y-3">
              {[
                'Heart Health',
                'Blood Pressure',
                'Sleep Disorders',
                'Mental Health / Anxiety',
                'Chronic Pain',
                'Diabetes',
                'Respiratory Issues',
                'Digestive Issues',
                'Weight Management',
                'None at this time',
              ].map((concern) => (
                <button
                  key={concern}
                  onClick={() => toggleConcern(concern)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    surveyData.healthConcerns.includes(concern)
                      ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                      : darkMode
                        ? 'border-slate-700 bg-slate-800 hover:border-slate-600'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${
                      surveyData.healthConcerns.includes(concern)
                        ? 'text-teal-700 dark:text-teal-300 font-semibold'
                        : darkMode
                          ? 'text-white'
                          : 'text-slate-900'
                    }`}>
                      {concern}
                    </span>
                    {surveyData.healthConcerns.includes(concern) && (
                      <CheckCircle className="w-5 h-5 text-teal-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </StepContainer>
        );

      case 5:
        return (
          <StepContainer
            icon={Heart}
            title="Any Current Symptoms?"
            subtitle="This helps us create a more accurate health profile (optional)"
            darkMode={darkMode}
          >
            <div className="space-y-4">
              <textarea
                value={surveyData.currentSymptoms}
                onChange={(e) => updateData('currentSymptoms', e.target.value)}
                placeholder="E.g., headache, fatigue, chest discomfort, etc."
                rows={6}
                className={`w-full p-4 rounded-xl border-2 transition-colors ${
                  darkMode
                    ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
                    : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
                } focus:border-teal-500 focus:outline-none`}
              />
              <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                💡 <strong>Tip:</strong> Be as specific as possible. Include when symptoms started and their severity.
              </div>
            </div>
          </StepContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} flex items-center justify-center p-6`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              Step {step + 1} of 6
            </span>
            <span className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              {Math.round(((step + 1) / 6) * 100)}% Complete
            </span>
          </div>
          <div className={`h-2 rounded-full ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <motion.div
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / 6) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className={`px-6 py-3 rounded-xl border-2 transition-colors ${
                darkMode
                  ? 'border-slate-700 text-white hover:bg-slate-800'
                  : 'border-slate-300 text-slate-900 hover:bg-slate-100'
              }`}
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              canProceed()
                ? 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white shadow-lg shadow-teal-500/30'
                : darkMode
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {step === 5 ? 'Complete Survey' : 'Continue'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

interface StepContainerProps {
  icon: any;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  darkMode: boolean;
}

function StepContainer({ icon: Icon, title, subtitle, children, darkMode }: StepContainerProps) {
  return (
    <div className={`${
      darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
    } rounded-2xl border-2 p-8 shadow-xl`}>
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-14 h-14 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h2>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            {subtitle}
          </p>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
