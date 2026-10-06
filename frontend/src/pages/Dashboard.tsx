import React, { useState, useEffect } from 'react';
import { Zap, Activity, Target, Flame, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';

const StatCard = ({ title, value, unit, icon: Icon, colorClass, shadowClass }) => (
  <div className="bg-[#131620] p-6 rounded-2xl border border-gray-800/60 flex items-center justify-between hover:border-gray-700 transition-colors shadow-lg">
    <div>
      <p className="text-gray-400 text-sm font-medium mb-2">{title}</p>
      <div className="flex items-baseline space-x-1">
        <h3 className="text-3xl font-extrabold text-white">{value}</h3>
        {unit && <span className="text-gray-500 text-sm font-medium">{unit}</span>}
      </div>
    </div>
    <div className={`p-4 rounded-xl ${colorClass} ${shadowClass} shadow-lg`}>
      <Icon className="w-7 h-7" />
    </div>
  </div>
);

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5001/api/sessions', {
          headers: {
            'x-auth-token': token
          }
        });
        setSessions(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  const data = sessions.slice(0, 10).reverse().map(session => ({
    time: new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    speed: session.avgSpeed,
    force: session.peakForce
  }));

  const avgSpeed = sessions.length ? (sessions.reduce((acc, curr) => acc + curr.avgSpeed, 0) / sessions.length).toFixed(1) : 0;
  const avgForce = sessions.length ? (sessions.reduce((acc, curr) => acc + curr.peakForce, 0) / sessions.length).toFixed(1) : 0;
  const avgScore = sessions.length ? Math.round(sessions.reduce((acc, curr) => acc + curr.techniqueScore, 0) / sessions.length) : 0;

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 bg-[#131620] p-8 rounded-3xl border border-gray-800/60 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Online</span>
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-2">Welcome Back, Athlete!</h2>
          <p className="text-gray-400 text-lg">Here is your real-time performance summary.</p>
        </div>
        <button 
          onClick={async () => {
             const token = localStorage.getItem('token');
             await axios.post('http://127.0.0.1:5001/api/sessions', {
                avgSpeed: Math.floor(Math.random() * (110 - 70) + 70),
                peakForce: Math.floor(Math.random() * (50 - 20) + 20),
                techniqueScore: Math.floor(Math.random() * (100 - 50) + 50),
                sport: 'Cricket'
             }, { headers: { 'x-auth-token': token } });
             window.location.reload();
          }}
          className="relative z-10 bg-blue-600 px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:shadow-blue-500/40 transition-all active:scale-95 flex items-center"
        >
          <Activity className="w-5 h-5 mr-2" />
          Simulate Live Session
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Avg Swing Speed" 
          value={avgSpeed} 
          unit="km/h" 
          icon={Zap} 
          colorClass="bg-blue-500/20 text-blue-400"
          shadowClass="shadow-blue-500/20"
        />
        <StatCard 
          title="Impact Force" 
          value={avgForce} 
          unit="N" 
          icon={Flame} 
          colorClass="bg-orange-500/20 text-orange-400"
          shadowClass="shadow-orange-500/20"
        />
        <StatCard 
          title="Technique Score" 
          value={avgScore} 
          unit="/ 100" 
          icon={Target} 
          colorClass="bg-green-500/20 text-green-400"
          shadowClass="shadow-green-500/20"
        />
        <StatCard 
          title="Total Sessions" 
          value={sessions.length} 
          unit="" 
          icon={TrendingUp} 
          colorClass="bg-purple-500/20 text-purple-400"
          shadowClass="shadow-purple-500/20"
        />
      </div>

      <div className="bg-[#131620] p-8 rounded-3xl border border-gray-800/60 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-bold text-white">Performance Trend</h3>
          <select className="bg-[#0a0c10] border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none">
            <option>Last 10 Sessions</option>
            <option>Last 30 Days</option>
            <option>All Time</option>
          </select>
        </div>
        <div className="h-80 w-full">
          {sessions.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorForce" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#252a3b" vertical={false} />
                <XAxis dataKey="time" stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} dy={10} />
                <YAxis stroke="#6b7280" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131620', borderColor: '#374151', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                  itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="speed" name="Speed (km/h)" stroke="#3b82f6" fillOpacity={1} fill="url(#colorSpeed)" strokeWidth={3} activeDot={{r: 6, strokeWidth: 0, fill: '#3b82f6'}} />
                <Area type="monotone" dataKey="force" name="Force (N)" stroke="#f97316" fillOpacity={1} fill="url(#colorForce)" strokeWidth={3} activeDot={{r: 6, strokeWidth: 0, fill: '#f97316'}} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
              <Activity className="w-12 h-12 text-gray-700" />
              <p className="text-lg">No sessions yet. Click "Simulate Live Session" above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
