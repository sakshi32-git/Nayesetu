
import React, { useState, useRef, useEffect } from 'react';
import { Send, Scale, User, Bot, Loader2, Info } from 'lucide-react';
import { getLegalAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const LegalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: "Hello! I am NyaySetu AI. I can help you understand your legal rights, Indian laws (IPC/CrPC), and court procedures. What legal information are you looking for today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      const response = await getLegalAdvice(history, input);
      
      const botMessage: ChatMessage = {
        role: 'model',
        content: response || "I'm sorry, I couldn't process that.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  const quickQuestions = [
    "What are my rights during an arrest?",
    "How to file an e-FIR?",
    "Difference between civil and criminal cases?",
    "Consumer protection laws in India"
  ];

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-lg">NyaySetu Legal Assistant</h2>
            <p className="text-xs text-slate-400">Available 24/7 for Legal Guidance</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-xs font-medium text-slate-300">AI Active</span>
        </div>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/50"
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-blue-600 shadow-sm'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white shadow-md rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 shadow-sm rounded-tl-none'
              }`}>
                {msg.content.split('\n').map((line, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>{line}</p>
                ))}
                <p className={`text-[10px] mt-2 opacity-60 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-pulse">
            <div className="flex gap-3 items-center">
              <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <span className="text-slate-400 text-xs">NyaySetu is thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Interface */}
      <div className="p-4 bg-white border-t border-slate-100 space-y-4">
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((q, idx) => (
              <button 
                key={idx}
                onClick={() => setInput(q)}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded-full transition-colors border border-slate-200"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask your legal question here..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-3 rounded-xl transition-all shadow-lg shadow-blue-500/20"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <Info className="w-3 h-3 text-slate-400" />
          <p className="text-[10px] text-slate-400 text-center uppercase tracking-tighter">
            Legal AI results are for informational purposes only. Consult a professional advocate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalChatbot;
