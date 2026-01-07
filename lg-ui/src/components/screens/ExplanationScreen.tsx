import { motion } from 'motion/react';
import {
  Bot,
  Heart,
  Moon,
  Activity,
  TrendingDown,
  AlertCircle,
  Send,
  Sparkles,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

interface ExplanationScreenProps {
  onNext: () => void;
  darkMode: boolean;
}

/**
 * ✅ Backend-compatible message schema
 */
type Message = {
  id: string;
  type: 'user' | 'ai';
  text: string;
  timestamp: string; // JSON-safe
};

export function ExplanationScreen({ onNext, darkMode }: ExplanationScreenProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text:
        "Hello! I'm your AI Health Assistant. Ask me anything about your risk assessment.",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    'Explain my risk',
    'What should I do now?',
    'How serious is this?',
    'Show improvement tips',
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * ✅ SEND MESSAGE TO BACKEND & RECEIVE AI RESPONSE
   */
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text,
      timestamp: new Date().toISOString(),
    };

    // show user message immediately
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.post<Message>(
        'http://localhost:8000/lg/user-message',
        userMessage
      );

      const aiMessage = response.data;

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          text: 'Sorry, something went wrong while contacting the server.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? 'bg-slate-900'
          : 'bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50'
      } p-6 lg:p-12`}
    >
      <div className="max-w-5xl mx-auto">

        {/* CHAT */}
        <div
          className={`h-96 overflow-y-auto p-6 space-y-4 ${
            darkMode ? 'bg-slate-900' : 'bg-slate-50'
          }`}
        >
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'ai' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-teal-500 text-white'
                    : darkMode
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-white text-slate-900 shadow-sm'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs mt-1 opacity-60">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-teal-200 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-teal-700" />
                </div>
              )}
            </motion.div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <Bot className="w-5 h-5 text-blue-500" />
              <span className="text-sm opacity-60">AI is typing…</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* QUICK REPLIES */}
        <div className="flex flex-wrap gap-2 p-4">
          {quickReplies.map(reply => (
            <button
              key={reply}
              onClick={() => handleSendMessage(reply)}
              className="px-3 py-1.5 rounded-full text-sm bg-slate-200 hover:bg-slate-300"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div className="p-4 flex gap-3">
          <input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputValue)}
            className="flex-1 px-4 py-3 rounded-xl border"
            placeholder="Ask about your health…"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="px-6 py-3 rounded-xl bg-blue-500 text-white"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-blue-600" />
            <p className="text-blue-900">
              This AI assistant provides simulated insights and is not medical advice.
            </p>
          </div>
        </div>

        {/* CONTINUE */}
        <div className="text-center mt-6">
          <button
            onClick={onNext}
            className="px-8 py-4 bg-teal-500 text-white rounded-xl"
          >
            View Historical Replay
          </button>
        </div>
      </div>
    </div>
  );
}
