import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  Droplets,
  Moon,
  Footprints,
  Activity,
  Brain,
  TrendingUp
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from "recharts";

interface HistoricalDashboardProps {
  darkMode: boolean;
}

export function HistoricalDashboard({ darkMode }: HistoricalDashboardProps) {
  const [data, setData] = useState<any>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8000/api/historical-dashboard");
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading historical data...
      </div>
    );
  }

  const sleepData = [
    { phase: "Deep", hours: data.sleep.deep, color: "#8b5cf6" },
    { phase: "Light", hours: data.sleep.light, color: "#a78bfa" },
    { phase: "REM", hours: data.sleep.rem, color: "#c4b5fd" },
    { phase: "Awake", hours: data.sleep.awake, color: "#e9d5ff" }
  ];

  const metrics = [
    {
      id: "heart",
      title: "Heart Rate History",
      icon: Heart,
      color: "red",
      status: "Normal",
      statusColor: "green",
      chart: (
        <AreaChart data={data.heartRate}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[50, 100]} />
          <Tooltip />
          <Area dataKey="value" stroke="#ef4444" fill="#fecaca" />
        </AreaChart>
      ),
      footer: `Avg ${Math.round(
        data.heartRate.reduce((a: number, b: any) => a + b.value, 0) /
          data.heartRate.length
      )} bpm`
    },
    {
      id: "spo2",
      title: "Blood Oxygen (SpO₂)",
      icon: Droplets,
      color: "blue",
      status: "Normal",
      statusColor: "green",
      chart: (
        <LineChart data={data.spo2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[90, 100]} />
          <Tooltip />
          <Line dataKey="value" stroke="#3b82f6" strokeWidth={3} dot={false} />
        </LineChart>
      ),
      footer: `Avg ${(
        data.spo2.reduce((a: number, b: any) => a + b.value, 0) /
        data.spo2.length
      ).toFixed(1)}%`
    },
    {
      id: "sleep",
      title: "Sleep Quality",
      icon: Moon,
      color: "purple",
      status: "Good",
      statusColor: "blue",
      chart: (
        <BarChart data={sleepData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="phase" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="hours">
            {sleepData.map((d, i) => (
              <rect key={i} fill={d.color} />
            ))}
          </Bar>
        </BarChart>
      ),
      footer: `Total ${data.sleep.total} hrs`
    },
    {
      id: "steps",
      title: "Daily Steps",
      icon: Footprints,
      color: "green",
      status: "Active",
      statusColor: "green",
      chart: (
        <BarChart data={data.steps}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="steps" fill="#10b981" />
        </BarChart>
      ),
      footer: `Avg ${Math.round(
        data.steps.reduce((a: number, b: any) => a + b.steps, 0) /
          data.steps.length
      ).toLocaleString()}`
    },
    {
      id: "bp",
      title: "Blood Pressure",
      icon: Activity,
      color: "pink",
      status: "Normal",
      statusColor: "green",
      chart: (
        <LineChart data={data.bloodPressure}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[60, 140]} />
          <Tooltip />
          <Line dataKey="systolic" stroke="#ec4899" dot={false} />
          <Line dataKey="diastolic" stroke="#a855f7" dot={false} />
        </LineChart>
      ),
      footer: "Systolic / Diastolic"
    },
    {
      id: "stress",
      title: "Stress Level",
      icon: Brain,
      color: "orange",
      status: "Moderate",
      statusColor: "amber",
      chart: (
        <AreaChart
          data={data.stress.map((d: any) => ({
            time: d.time,
            value: d.value
          }))}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Area dataKey="value" stroke="#f97316" fill="#fed7aa" />
        </AreaChart>
      ),
      footer: `Avg ${Math.round(
        data.stress.reduce((a: number, b: any) => a + b.value, 0) /
          data.stress.length
      )}%`
    }
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-900" : "bg-slate-50"
      } p-6 lg:p-12`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className={`${darkMode ? "text-white" : "text-slate-900"} mb-8`}>
          Historical Health Dashboard
        </h1>

        <div className="grid lg:grid-cols-2 gap-6">
          {metrics.map((m) => (
            <MetricCard
              key={m.id}
              metric={m}
              darkMode={darkMode}
              isHovered={hoveredCard === m.id}
              onHover={() => setHoveredCard(m.id)}
              onLeave={() => setHoveredCard(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------ METRIC CARD ------------------ */

function MetricCard({
  metric,
  darkMode,
  isHovered,
  onHover,
  onLeave
}: any) {
  const Icon = metric.icon;

  const statusColors: any = {
    green: darkMode
      ? "bg-green-900/30 text-green-400"
      : "bg-green-100 text-green-700",
    blue: darkMode
      ? "bg-blue-900/30 text-blue-400"
      : "bg-blue-100 text-blue-700",
    amber: darkMode
      ? "bg-amber-900/30 text-amber-400"
      : "bg-amber-100 text-amber-700"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`rounded-2xl p-6 border ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      } ${isHovered ? "shadow-2xl" : "shadow-lg"}`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <h3 className={darkMode ? "text-white" : "text-slate-900"}>
            {metric.title}
          </h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            statusColors[metric.statusColor]
          }`}
        >
          {metric.status}
        </span>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          {metric.chart}
        </ResponsiveContainer>
      </div>

      <div className="mt-3 text-sm opacity-70">{metric.footer}</div>
    </motion.div>
  );
}

