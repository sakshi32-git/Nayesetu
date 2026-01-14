
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import FIRDigitizer from './components/FIRDigitizer';
import LegalChatbot from './components/LegalChatbot';
import { AppTab } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">Accountability Dashboard</h2>
              <p className="text-slate-500 mt-1">Real-time tracking of police efficiency and case resolutions.</p>
            </div>
            <Dashboard />
          </div>
        );
      case AppTab.DIGITIZER:
        return (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">FIR Digital Vault</h2>
              <p className="text-slate-500 mt-1">Seamlessly convert paper records into searchable digital insights.</p>
            </div>
            <FIRDigitizer />
          </div>
        );
      case AppTab.CHATBOT:
        return (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">Legal Awareness Portal</h2>
              <p className="text-slate-500 mt-1">Empowering citizens with AI-driven legal knowledge.</p>
            </div>
            <LegalChatbot />
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default App;
