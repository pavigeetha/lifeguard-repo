import { motion } from 'motion/react';
import { User, Mail, Calendar, Activity, Heart, Settings, FileDown, CheckCircle, Shield } from 'lucide-react';
import { HealthModel } from '../../App';
import { useState } from 'react';

interface ProfileScreenProps {
  user: { name: string; email: string };
  healthModel: HealthModel | null;
  darkMode: boolean;
  onLogout: () => void;
}

export function ProfileScreen({ user, healthModel, darkMode, onLogout }: ProfileScreenProps) {
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleDownloadClick = () => {
    setShowPDFModal(true);
  };

  const handleGeneratePDF = () => {
    setShowPDFModal(false);
    setIsGenerating(true);

    // Simulate PDF generation
    setTimeout(() => {
      // Generate PDF content
      generateHealthReportPDF();
      
      setIsGenerating(false);
      setShowSuccessToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }, 2500);
  };

  const generateHealthReportPDF = () => {
    // Create PDF content as HTML for download simulation
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <title>LifeGuard Health Report</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
    .header { text-align: center; border-bottom: 3px solid #14b8a6; padding-bottom: 20px; margin-bottom: 30px; }
    .logo { color: #14b8a6; font-size: 32px; font-weight: bold; margin-bottom: 10px; }
    .section { margin-bottom: 30px; }
    .section-title { color: #14b8a6; font-size: 20px; font-weight: bold; margin-bottom: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
    .info-item { padding: 15px; background: #f8fafc; border-radius: 8px; }
    .label { color: #64748b; font-size: 12px; margin-bottom: 5px; }
    .value { color: #0f172a; font-size: 16px; font-weight: 600; }
    .metric-card { padding: 15px; background: #f0fdfa; border-left: 4px solid #14b8a6; margin-bottom: 10px; border-radius: 4px; }
    .alert-box { padding: 15px; background: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px; margin-bottom: 10px; }
    .footer { text-align: center; color: #64748b; font-size: 12px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    .timestamp { color: #94a3b8; font-size: 14px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">⚕️ LifeGuard</div>
    <h1>Health Report</h1>
    <p class="timestamp">Generated on ${new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}</p>
  </div>

  <div class="section">
    <div class="section-title">Patient Information</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="label">Full Name</div>
        <div class="value">${user.name}</div>
      </div>
      <div class="info-item">
        <div class="label">Email</div>
        <div class="value">${user.email}</div>
      </div>
      <div class="info-item">
        <div class="label">Patient ID</div>
        <div class="value">LG-${Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
      </div>
      <div class="info-item">
        <div class="label">Report Type</div>
        <div class="value">Comprehensive Health Summary</div>
      </div>
    </div>
  </div>

  ${healthModel ? `
  <div class="section">
    <div class="section-title">Digital Health Twin Profile</div>
    <div class="info-grid">
      <div class="info-item">
        <div class="label">Age</div>
        <div class="value">${healthModel.age} years</div>
      </div>
      <div class="info-item">
        <div class="label">Sex</div>
        <div class="value" style="text-transform: capitalize;">${healthModel.sex}</div>
      </div>
      <div class="info-item">
        <div class="label">Lifestyle</div>
        <div class="value" style="text-transform: capitalize;">${healthModel.lifestyle}</div>
      </div>
      <div class="info-item">
        <div class="label">Known Condition</div>
        <div class="value">${healthModel.condition || 'None'}</div>
      </div>
    </div>
  </div>
  ` : ''}

  <div class="section">
    <div class="section-title">Health Metrics Summary</div>
    <div class="metric-card">
      <strong>Heart Rate:</strong> Average 72 bpm (Normal range: 60-100 bpm)<br>
      <small>Status: Normal ✓</small>
    </div>
    <div class="metric-card">
      <strong>Blood Oxygen (SpO2):</strong> Average 97.5% (Normal range: 95-100%)<br>
      <small>Status: Normal ✓</small>
    </div>
    <div class="metric-card">
      <strong>Sleep Quality:</strong> 7.5 hours average, 78% quality<br>
      <small>Status: Good ✓</small>
    </div>
    <div class="metric-card">
      <strong>Blood Pressure:</strong> 118/78 mmHg average<br>
      <small>Status: Normal ✓</small>
    </div>
    <div class="metric-card">
      <strong>Activity Level:</strong> 9,200 steps/day average<br>
      <small>Status: Active ✓</small>
    </div>
    <div class="metric-card">
      <strong>Stress Level:</strong> Moderate (42% average)<br>
      <small>Status: Manageable ✓</small>
    </div>
  </div>

  <div class="section">
    <div class="section-title">AI Analysis Summary</div>
    <p><strong>Overall Risk Score:</strong> 18/100 (Low Risk)</p>
    <p><strong>Key Findings:</strong></p>
    <ul>
      <li>Cardiovascular health indicators within normal range</li>
      <li>Sleep quality has improved by 12% over past week</li>
      <li>Activity levels consistently meeting recommended targets</li>
      <li>No significant anomalies detected in recent patterns</li>
    </ul>
    <p><strong>AI Confidence:</strong> 94%</p>
  </div>

  <div class="section">
    <div class="section-title">Recent Alerts & Warnings</div>
    <div class="alert-box">
      <strong>⚠️ Stress Level Elevation (2 days ago)</strong><br>
      <small>Detected: Stress levels increased to 68% during evening hours. Recommended: Deep breathing exercises and adequate rest.</small><br>
      <small style="color: #10b981;">Status: Resolved ✓</small>
    </div>
    <p style="color: #10b981; font-weight: 600;">✓ No active critical alerts</p>
  </div>

  <div class="section">
    <div class="section-title">Recommendations</div>
    <ul>
      <li>Continue maintaining current activity levels (7,000+ steps daily)</li>
      <li>Prioritize 7-8 hours of quality sleep nightly</li>
      <li>Practice stress management techniques during high-pressure periods</li>
      <li>Schedule routine check-up with healthcare provider within 3 months</li>
      <li>Stay hydrated and maintain balanced nutrition</li>
    </ul>
  </div>

  <div class="footer">
    <p><strong>LifeGuard Digital Health Platform</strong></p>
    <p>This report is generated from simulated health data for demonstration purposes.</p>
    <p>Always consult with qualified healthcare professionals for medical advice.</p>
    <p style="margin-top: 10px;">© ${new Date().getFullYear()} LifeGuard. All rights reserved.</p>
  </div>
</body>
</html>
    `;

    // Create blob and download
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LifeGuard_Health_Report_${user.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} p-6 lg:p-12`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>Profile</h1>
          <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
            Manage your account and health twin settings
          </p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 border mb-6`}
        >
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
                {user.name}
              </h2>
              <div className={`flex items-center gap-2 ${darkMode ? 'text-slate-400' : 'text-slate-600'} mb-4`}>
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                  Edit Profile
                </button>
                <button className={`px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}>
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Digital Twin Info */}
        {healthModel ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 border mb-6`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className={darkMode ? 'text-white' : 'text-slate-900'}>Digital Health Twin</h3>
                <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Your personalized model</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Age</div>
                <div className={`${darkMode ? 'text-white' : 'text-slate-900'} text-xl mt-1`}>
                  {healthModel.age} years
                </div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Sex</div>
                <div className={`${darkMode ? 'text-white' : 'text-slate-900'} text-xl mt-1 capitalize`}>
                  {healthModel.sex}
                </div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Lifestyle</div>
                <div className={`${darkMode ? 'text-white' : 'text-slate-900'} text-xl mt-1 capitalize`}>
                  {healthModel.lifestyle}
                </div>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Condition</div>
                <div className={`${darkMode ? 'text-white' : 'text-slate-900'} text-xl mt-1 capitalize`}>
                  {healthModel.condition || 'None'}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 border mb-6 text-center`}
          >
            <Heart className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-slate-600' : 'text-slate-300'}`} />
            <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-2`}>
              No Digital Twin Created
            </h3>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              Create your digital health twin to get started
            </p>
          </motion.div>
        )}

        {/* Download Health Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 border mb-6`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <FileDown className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className={darkMode ? 'text-white' : 'text-slate-900'}>Download Health Report</h3>
              <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
                Easily export your health records as a PDF for medical use or personal backup.
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadClick}
            className="w-full mt-4 px-6 py-4 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white rounded-xl transition-colors shadow-lg shadow-teal-500/30 flex items-center justify-center gap-2 font-semibold"
          >
            <FileDown className="w-5 h-5" />
            Download PDF Report
          </button>
        </motion.div>

        {/* Account Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl p-8 border mb-6`}
        >
          <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} mb-6`}>Account Statistics</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-teal-400 text-3xl font-bold mb-1">247</div>
              <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Days Active</div>
            </div>
            <div className="text-center">
              <div className="text-blue-400 text-3xl font-bold mb-1">3</div>
              <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Devices Synced</div>
            </div>
            <div className="text-center">
              <div className="text-purple-400 text-3xl font-bold mb-1">12</div>
              <div className={darkMode ? 'text-slate-400' : 'text-slate-600'}>Reports Generated</div>
            </div>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-50 border-red-200'} rounded-2xl p-8 border mb-6`}
        >
          <h3 className={`${darkMode ? 'text-red-400' : 'text-red-900'} mb-4`}>Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className={darkMode ? 'text-red-300' : 'text-red-800'}>
                Delete your account and all associated data
              </p>
              <p className={`${darkMode ? 'text-red-400' : 'text-red-600'} text-sm mt-1`}>
                This action cannot be undone
              </p>
            </div>
            <button className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors">
              Delete Account
            </button>
          </div>
        </motion.div>

        {/* Privacy Assurance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-start gap-2 text-xs text-slate-400 pb-8"
        >
          <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your data is securely protected. We follow encryption, consent, and minimal data storage principles.
          </p>
        </motion.div>
      </div>

      {/* PDF Generation Modal */}
      {showPDFModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-2xl border max-w-md w-full p-8`}
          >
            <h2 className={`${darkMode ? 'text-white' : 'text-slate-900'} text-2xl font-bold mb-4`}>
              Generate Health Report
            </h2>
            <p className={`${darkMode ? 'text-slate-300' : 'text-slate-600'} mb-6`}>
              This will compile your recent health metrics, AI analysis insights, and alerts into a PDF report.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPDFModal(false)}
                className={`flex-1 px-6 py-3 rounded-xl transition-colors ${
                  darkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleGeneratePDF}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white rounded-xl transition-colors font-semibold"
              >
                Generate & Download
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Loading Modal */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} rounded-2xl shadow-2xl border max-w-md w-full p-8 text-center`}
          >
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
            <h3 className={`${darkMode ? 'text-white' : 'text-slate-900'} text-xl font-semibold mb-2`}>
              Preparing your health report…
            </h3>
            <p className={darkMode ? 'text-slate-400' : 'text-slate-600'}>
              This will only take a moment
            </p>
          </motion.div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-green-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
            <CheckCircle className="w-6 h-6" />
            <div>
              <div className="font-bold">Health Report Downloaded Successfully</div>
              <div className="text-sm text-green-100">Check your downloads folder</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}