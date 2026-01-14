
import React from 'react';
import { Scale, LayoutDashboard, FileScan, MessageSquareText, ShieldCheck } from 'lucide-react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const NavItem = ({ tab, icon: Icon, label }: { tab: AppTab, icon: any, label: string }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === tab 
          ? 'bg-blue-50 text-blue-600 shadow-sm' 
          : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Banner / Navigation */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl text-white">
              <Scale className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
              NyaySetu
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-2 bg-slate-50 p-1 rounded-xl">
            <NavItem tab={AppTab.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem tab={AppTab.DIGITIZER} icon={FileScan} label="FIR Digitizer" />
            <NavItem tab={AppTab.CHATBOT} icon={MessageSquareText} label="Legal Chat" />
          </nav>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold">Secure Justice Link</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50/50 p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-2 flex justify-around z-50">
         <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className={`p-2 flex flex-col items-center gap-1 ${activeTab === AppTab.DASHBOARD ? 'text-blue-600' : 'text-slate-400'}`}>
           <LayoutDashboard className="w-6 h-6" />
           <span className="text-[10px] font-bold">Stats</span>
         </button>
         <button onClick={() => setActiveTab(AppTab.DIGITIZER)} className={`p-2 flex flex-col items-center gap-1 ${activeTab === AppTab.DIGITIZER ? 'text-blue-600' : 'text-slate-400'}`}>
           <FileScan className="w-6 h-6" />
           <span className="text-[10px] font-bold">Digitize</span>
         </button>
         <button onClick={() => setActiveTab(AppTab.CHATBOT)} className={`p-2 flex flex-col items-center gap-1 ${activeTab === AppTab.CHATBOT ? 'text-blue-600' : 'text-slate-400'}`}>
           <MessageSquareText className="w-6 h-6" />
           <span className="text-[10px] font-bold">Advise</span>
         </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-slate-400" />
            <p className="text-slate-500 text-sm">© 2024 NyaySetu Project - Digitizing Justice for Bharat</p>
          </div>
          <div className="flex gap-6 text-slate-400 text-sm">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Legal Framework</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
