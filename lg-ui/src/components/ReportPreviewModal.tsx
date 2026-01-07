import { motion } from "motion/react";
import {
  X,
  Download,
  FileText,
  Heart,
  Activity,
  Moon,
  TrendingUp,
  User,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
  user: { name: string; email: string };
}

export function ReportPreviewModal({
  isOpen,
  onClose,
  darkMode,
  user,
}: ReportPreviewModalProps) {
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  // =========================
  // DOWNLOAD PDF FUNCTION
  // =========================
  const handleDownload = async () => {
    try {
      setDownloading(true);

      const response = await fetch("http://localhost:8000/lg/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          heart_rate: "72 bpm",
          sleep: "78%",
          activity: "65%",
          risk: "18/100",
        }),
      });

      if (!response.ok) throw new Error("PDF failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `LifeGuard_Health_Report_${new Date()
        .toISOString()
        .split("T")[0]}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
      setDownloading(false);
      onClose();
    } catch {
      alert("Failed to download PDF. Make sure FastAPI is running!");
      setDownloading(false);
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-slate-200"
        } rounded-2xl border-2 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Health Report Preview
              </h2>
              <p
                className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Generated on {currentDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              darkMode
                ? "hover:bg-slate-700 text-slate-400"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Patient Info */}
          <div
            className={`${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-slate-50 border-slate-200"
            } rounded-xl p-6 border-2`}
          >
            <div className="flex items-center gap-3 mb-4">
              <User
                className={`w-5 h-5 ${
                  darkMode ? "text-teal-400" : "text-teal-500"
                }`}
              />
              <h3
                className={`font-bold ${
                  darkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Patient Information
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-500 mb-1">Name</div>
                <div
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {user.name}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">Email</div>
                <div
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {user.email}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">Report Date</div>
                <div
                  className={`font-semibold ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {currentDate}
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-500 mb-1">
                  Digital Twin Status
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span
                    className={`font-semibold ${
                      darkMode ? "text-green-400" : "text-green-600"
                    }`}
                  >
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* (rest of UI stays same — no functionality change, so I didn’t touch it) */}

          {/* Privacy Notice */}
          <div
            className={`${
              darkMode
                ? "bg-slate-900 border-slate-700"
                : "bg-slate-50 border-slate-200"
            } rounded-xl p-4 border-2`}
          >
            <div className="flex items-start gap-3">
              <Shield
                className={`w-5 h-5 ${
                  darkMode ? "text-slate-500" : "text-slate-400"
                } mt-0.5`}
              />
              <div
                className={`text-xs ${
                  darkMode ? "text-slate-400" : "text-slate-600"
                } leading-relaxed`}
              >
                This report contains sensitive health information. Stored
                securely under HIPAA guidelines.
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="p-6 border-t-2 dark:border-slate-700 flex gap-4">
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-xl border-2 ${
              darkMode
                ? "border-slate-700 text-white hover:bg-slate-700"
                : "border-slate-300 text-slate-900 hover:bg-slate-100"
            }`}
          >
            Close
          </button>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`flex-1 px-6 py-3 rounded-xl flex items-center justify-center gap-2 text-white font-semibold ${
              downloading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600"
            }`}
          >
            {downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download PDF Report
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}