import { motion } from 'motion/react';
import { X, Smartphone, Watch, Activity, Wifi, Bluetooth, CheckCircle, Loader } from 'lucide-react';
import { useState } from 'react';

interface ConnectDevicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

interface Device {
  id: string;
  name: string;
  type: 'smartwatch' | 'fitness-tracker' | 'phone' | 'health-monitor';
  brand: string;
  signal: number;
  connected: boolean;
  battery?: number;
}

export function ConnectDevicesModal({ isOpen, onClose, darkMode }: ConnectDevicesModalProps) {
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Apple Watch Series 9',
      type: 'smartwatch',
      brand: 'Apple',
      signal: 95,
      connected: false,
      battery: 78,
    },
    {
      id: '2',
      name: 'Fitbit Charge 6',
      type: 'fitness-tracker',
      brand: 'Fitbit',
      signal: 88,
      connected: false,
      battery: 62,
    },
    {
      id: '3',
      name: 'Samsung Galaxy Watch 6',
      type: 'smartwatch',
      brand: 'Samsung',
      signal: 82,
      connected: false,
      battery: 91,
    },
    {
      id: '4',
      name: 'iPhone 15 Pro',
      type: 'phone',
      brand: 'Apple',
      signal: 100,
      connected: true,
      battery: 85,
    },
    {
      id: '5',
      name: 'Garmin Forerunner 265',
      type: 'fitness-tracker',
      brand: 'Garmin',
      signal: 76,
      connected: false,
      battery: 45,
    },
    {
      id: '6',
      name: 'Withings Body+ Scale',
      type: 'health-monitor',
      brand: 'Withings',
      signal: 70,
      connected: false,
    },
  ]);

  if (!isOpen) return null;

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 2000);
  };

  const handleConnect = (deviceId: string) => {
    setDevices(devices.map(d => 
      d.id === deviceId ? { ...d, connected: !d.connected } : d
    ));
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'smartwatch':
        return Watch;
      case 'fitness-tracker':
        return Activity;
      case 'phone':
        return Smartphone;
      case 'health-monitor':
        return Activity;
      default:
        return Activity;
    }
  };

  const getSignalColor = (signal: number) => {
    if (signal >= 80) return 'text-green-500';
    if (signal >= 60) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`${
          darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        } rounded-2xl border-2 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-xl flex items-center justify-center">
              <Bluetooth className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Connect Devices
              </h2>
              <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Nearby health & fitness devices
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scan Button */}
        <div className="p-6 border-b-2 border-slate-200 dark:border-slate-700">
          <button
            onClick={handleScan}
            disabled={scanning}
            className={`w-full px-6 py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
              scanning
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-lg shadow-teal-500/30'
            } text-white font-semibold`}
          >
            {scanning ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Scanning for devices...
              </>
            ) : (
              <>
                <Wifi className="w-5 h-5" />
                Scan for Devices
              </>
            )}
          </button>
        </div>

        {/* Device List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-3">
            {devices.map((device, index) => {
              const Icon = getDeviceIcon(device.type);
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`${
                    darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'
                  } rounded-xl p-4 border-2 flex items-center justify-between hover:border-teal-500 transition-colors`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Device Icon */}
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      device.connected
                        ? 'bg-teal-500'
                        : darkMode
                          ? 'bg-slate-800'
                          : 'bg-white'
                    }`}>
                      <Icon className={`w-7 h-7 ${
                        device.connected ? 'text-white' : darkMode ? 'text-slate-400' : 'text-slate-600'
                      }`} />
                    </div>

                    {/* Device Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                          {device.name}
                        </h3>
                        {device.connected && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {device.brand} • {device.type.replace('-', ' ')}
                      </div>
                      <div className="flex items-center gap-4 mt-2">
                        {/* Signal Strength */}
                        <div className="flex items-center gap-1">
                          <Wifi className={`w-4 h-4 ${getSignalColor(device.signal)}`} />
                          <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                            {device.signal}%
                          </span>
                        </div>
                        {/* Battery */}
                        {device.battery && (
                          <div className="flex items-center gap-1">
                            <div className={`w-6 h-3 rounded-sm border ${
                              darkMode ? 'border-slate-600' : 'border-slate-400'
                            } relative`}>
                              <div
                                className={`h-full rounded-sm ${
                                  device.battery > 50
                                    ? 'bg-green-500'
                                    : device.battery > 20
                                      ? 'bg-yellow-500'
                                      : 'bg-red-500'
                                }`}
                                style={{ width: `${device.battery}%` }}
                              />
                              <div className={`absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-1.5 rounded-r ${
                                darkMode ? 'bg-slate-600' : 'bg-slate-400'
                              }`} />
                            </div>
                            <span className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                              {device.battery}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Connect Button */}
                    <button
                      onClick={() => handleConnect(device.id)}
                      className={`px-5 py-2 rounded-lg font-semibold transition-all ${
                        device.connected
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : darkMode
                            ? 'bg-slate-800 hover:bg-slate-700 text-white border-2 border-slate-700'
                            : 'bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300'
                      }`}
                    >
                      {device.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Info Message */}
          <div className={`mt-6 p-4 rounded-xl ${
            darkMode ? 'bg-slate-900 border-slate-700' : 'bg-blue-50 border-blue-200'
          } border-2`}>
            <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-blue-800'}`}>
              💡 <strong>Tip:</strong> Make sure Bluetooth is enabled on your devices and they are within range (10 meters).
              Connected devices will automatically sync health data to LifeGuard.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t-2 border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <div className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {devices.filter(d => d.connected).length} device(s) connected
          </div>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all shadow-lg shadow-teal-500/30"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
}
