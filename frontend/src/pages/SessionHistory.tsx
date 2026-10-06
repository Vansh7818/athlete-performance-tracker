import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity } from 'lucide-react';

const SessionHistory = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://127.0.0.1:5001/api/sessions', {
          headers: { 'x-auth-token': token }
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

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">Session History</h2>
      
      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="bg-[#131620] p-10 rounded-3xl border border-gray-800/60 shadow-xl text-center">
            <p className="text-gray-400 text-lg">No sessions recorded yet.</p>
          </div>
        ) : (
          sessions.map((session, idx) => (
            <div key={session._id || idx} className="bg-[#131620] p-5 rounded-2xl border border-gray-800/60 hover:border-gray-700 transition-colors shadow-lg flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <div className="bg-blue-600/20 p-4 rounded-xl shadow-inner shadow-blue-500/10">
                  <Activity className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">{session.sport} Session</h4>
                  <p className="text-sm text-gray-400 font-medium">{new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="text-right flex space-x-8">
                <div>
                  <p className="text-lg text-blue-400 font-extrabold">{session.avgSpeed} km/h</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Speed</p>
                </div>
                <div>
                  <p className="text-lg text-green-400 font-extrabold">{session.techniqueScore}</p>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-1">Score</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionHistory;
