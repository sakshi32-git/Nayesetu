
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { TrendingUp, CheckCircle, Clock, FileText } from 'lucide-react';

const firGrowthData = [
  { month: 'Jan', count: 120 },
  { month: 'Feb', count: 180 },
  { month: 'Mar', count: 250 },
  { month: 'Apr', count: 310 },
  { month: 'May', count: 420 },
  { month: 'Jun', count: 530 },
];

const resolutionData = [
  { name: 'Resolved', value: 45 },
  { name: 'Pending', value: 55 },
];

const resolutionTimeData = [
  { month: 'Jan', time: 85 },
  { month: 'Feb', time: 78 },
  { month: 'Mar', time: 72 },
  { month: 'Apr', time: 68 },
  { month: 'May', time: 64 },
  { month: 'Jun', time: 60 },
];

const COLORS = ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'];

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string, color: string, trend: string }> = ({ icon, title, value, color, trend }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-start space-x-4">
    <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      <p className="text-xs font-semibold text-emerald-600 mt-1">{trend}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<FileText className="w-6 h-6" />} 
          title="FIR Growth" 
          value="+70%" 
          color="bg-blue-500" 
          trend="↑ 12% from last month"
        />
        <StatCard 
          icon={<CheckCircle className="w-6 h-6" />} 
          title="Case Resolution" 
          value="45%" 
          color="bg-emerald-500" 
          trend="↑ 5% efficiency gain"
        />
        <StatCard 
          icon={<Clock className="w-6 h-6" />} 
          title="Avg. Res. Time" 
          value="60 Days" 
          color="bg-amber-500" 
          trend="↓ 8 days improvement"
        />
        <StatCard 
          icon={<TrendingUp className="w-6 h-6" />} 
          title="System Transparency" 
          value="92%" 
          color="bg-indigo-500" 
          trend="Highest in region"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Monthly FIR Registration Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={firGrowthData}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Case Status Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resolutionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {resolutionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-6 text-slate-800">Average Resolution Time Efficiency (Days)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resolutionTimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                   cursor={{fill: '#f8fafc'}}
                   contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="time" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
