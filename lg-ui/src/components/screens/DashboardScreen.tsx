import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  Moon,
  Activity,
  AlertTriangle,
  TrendingUp
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";


interface DashboardScreenProps {
  onNext: () => void;
  darkMode: boolean;
}

interface HRData {
  time: string;
  value: number;
}

interface ActivityData {
  time: string;
  value: number;
}

interface BPData {
  time: string;
  systolic: number;
  diastolic: number;
}

interface SleepSummary {
  deep: number;
  light: number;
  rem: number;
  awake: number;
  total: number;
}

export function DashboardScreen({ onNext, darkMode }: DashboardScreenProps) {
  const [heartRateData, setHeartRateData] = useState<HRData[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [bloodPressureData, setBloodPressureData] = useState<BPData[]>([]);
  const [sleepData, setSleepData] = useState<SleepSummary | null>(null);
  const [riskScore, setRiskScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHealthData() {
      try {
        const res = await fetch("http://localhost:8000/api/health-signals");
        const data = await res.json();

        setHeartRateData(data.heartRate);
        setActivityData(data.activity);
        setBloodPressureData(data.bloodPressure);
        setSleepData(data.sleep);
        setRiskScore(data.riskScore);
      } catch (err) {
        console.error("Failed to load health data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHealthData();
  }, []);

  if (loading || !sleepData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading health signals...
      </div>
    );
  }

  const avgHR = Math.round(
    heartRateData.reduce((a, b) => a + b.value, 0) / heartRateData.length
  );

  const avgActivity = Math.round(
    activityData.reduce((a, b) => a + b.value, 0) / activityData.length
  );

  const avgSys = Math.round(
    bloodPressureData.reduce((a, b) => a + b.systolic, 0) /
      bloodPressureData.length
  );

  const avgDia = Math.round(
    bloodPressureData.reduce((a, b) => a + b.diastolic, 0) /
      bloodPressureData.length
  );

  // Convert total sleep hours → quality %
  const sleepQuality = Math.round((sleepData.total / 9) * 100);
  const sleepStageData = [
  { stage: "Deep", hours: sleepData.deep, color: "#8b5cf6" },
  { stage: "Light", hours: sleepData.light, color: "#a78bfa" },
  { stage: "REM", hours: sleepData.rem, color: "#c4b5fd" },
  { stage: "Awake", hours: sleepData.awake, color: "#e9d5ff" }
];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      } p-6 lg:p-12`}
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`${darkMode ? "text-white" : "text-slate-900"}`}>
            Live Health Signals
          </h1>
          <p className={darkMode ? "text-slate-400" : "text-slate-600"}>
            Real-time simulated physiological monitoring
          </p>
        </motion.div>

        {/* RISK SCORE */}
        <div
          className={`rounded-2xl border p-6 mb-8 shadow-lg ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="flex justify-between items-center mb-3">
            <h3 className={darkMode ? "text-white" : "text-slate-900"}>
              Risk Score
            </h3>
            <span
              className={`px-4 py-1 rounded-full text-sm ${
                riskScore > 60
                  ? "bg-red-100 text-red-700"
                  : riskScore > 30
                  ? "bg-amber-100 text-amber-700"
                  : "bg-teal-100 text-teal-700"
              }`}
            >
              {riskScore}/100
            </span>
          </div>

          <div
            className={`h-4 rounded-full ${
              darkMode ? "bg-slate-700" : "bg-slate-100"
            } overflow-hidden`}
          >
            <motion.div
              className={`h-full ${
                riskScore > 60
                  ? "bg-gradient-to-r from-amber-500 to-red-500"
                  : riskScore > 30
                  ? "bg-gradient-to-r from-teal-500 to-amber-500"
                  : "bg-teal-500"
              }`}
              animate={{ width: `${riskScore}%` }}
            />
          </div>

          {riskScore > 40 && (
            <div className="flex gap-2 items-center mt-4 text-amber-600">
              <AlertTriangle size={18} />
              Trend deviation detected
            </div>
          )}
        </div>

        {/* CHARTS */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* HEART RATE */}
          <ChartCard
            darkMode={darkMode}
            title="Heart Rate (24h)"
            value={`Avg: ${avgHR} bpm`}
            icon={<Heart className="text-red-600" />}
          >
            <LineChart data={heartRateData}>
              <Grid darkMode={darkMode} />
              <XAxis dataKey="time" />
              <YAxis domain={[55, 95]} />
              <Tooltip />
              <Line dataKey="value" stroke="#14b8a6" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartCard>

          {/* SLEEP SUMMARY */}
          <ChartCard
            darkMode={darkMode}
            title="Sleep Quality"
            value={`Quality: ${sleepQuality}% (${sleepData.total} hrs)`}
            icon={<Moon className="text-blue-600" />}
          >
            <BarChart data={sleepStageData}>
  <Grid darkMode={darkMode} />
  <XAxis dataKey="stage" />
  <YAxis domain={[0, 6]} />
  <Tooltip />
  <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
    {sleepStageData.map((entry, index) => (
      <rect key={`cell-${index}`} fill={entry.color} />
    ))}
  </Bar>
</BarChart>

          </ChartCard>

          {/* ACTIVITY */}
          <ChartCard
            darkMode={darkMode}
            title="Activity Level (24h)"
            value={`Avg: ${avgActivity}%`}
            icon={<Activity className="text-cyan-600" />}
          >
            <LineChart data={activityData}>
              <Grid darkMode={darkMode} />
              <XAxis dataKey="time" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line dataKey="value" stroke="#06b6d4" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartCard>

          {/* BLOOD PRESSURE */}
          <ChartCard
            darkMode={darkMode}
            title="Blood Pressure (12h)"
            value={`Avg: ${avgSys}/${avgDia} mmHg`}
            icon={<TrendingUp className="text-purple-600" />}
          >
            <LineChart data={bloodPressureData}>
              <Grid darkMode={darkMode} />
              <XAxis dataKey="time" />
              <YAxis domain={[65, 135]} />
              <Tooltip />
              <Legend />
              <Line dataKey="systolic" stroke="#a855f7" strokeWidth={3} dot={false} />
              <Line dataKey="diastolic" stroke="#ec4899" strokeWidth={3} dot={false} />
            </LineChart>
          </ChartCard>
        </div>

        {/* CONTINUE */}
        <div className="text-center mt-10">
          <button
            onClick={onNext}
            className="px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg"
          >
            Trigger Early Warning
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ HELPERS ------------------ */

function ChartCard({
  darkMode,
  title,
  value,
  icon,
  children
}: any) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-lg ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="text-sm opacity-70">{title}</div>
          <div className="font-semibold">{value}</div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Grid({ darkMode }: { darkMode: boolean }) {
  return (
    <CartesianGrid
      strokeDasharray="3 3"
      stroke={darkMode ? "#334155" : "#e2e8f0"}
    />
  );
}

