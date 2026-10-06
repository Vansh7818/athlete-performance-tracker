import React from 'react';
import { Brain, Zap, Target, ArrowRight } from 'lucide-react';

const Coach = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <h2 className="text-4xl font-extrabold text-white mb-8 tracking-tight">AI Coach Insights</h2>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-[#131620] p-6 rounded-3xl border border-gray-800/60 shadow-xl flex items-start space-x-5 hover:border-gray-700 transition-colors">
          <div className="bg-blue-600/20 p-4 rounded-2xl shadow-inner shadow-blue-500/10 shrink-0">
            <Zap className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h4 className="font-extrabold text-xl text-white mb-2">Speed Improvement</h4>
            <p className="text-gray-400 leading-relaxed text-lg">Your swing speed improved by <span className="text-blue-400 font-bold px-1 bg-blue-500/10 rounded">24.0%</span> compared to the previous session. Great progress! Keep focusing on your fast-twitch muscle engagement.</p>
          </div>
        </div>

        <div className="bg-[#131620] p-6 rounded-3xl border border-gray-800/60 shadow-xl flex items-start space-x-5 hover:border-gray-700 transition-colors">
          <div className="bg-orange-600/20 p-4 rounded-2xl shadow-inner shadow-orange-500/10 shrink-0">
            <Target className="w-8 h-8 text-orange-500" />
          </div>
          <div>
            <h4 className="font-extrabold text-xl text-white mb-2">Force Analysis</h4>
            <p className="text-gray-400 leading-relaxed text-lg">Your peak force is <span className="text-orange-400 font-bold px-1 bg-orange-500/10 rounded">36 N</span>. Try focusing on your follow-through for better power transfer from your core.</p>
          </div>
        </div>

        <div className="bg-[#131620] p-6 rounded-3xl border border-gray-800/60 shadow-xl flex items-start space-x-5 hover:border-gray-700 transition-colors">
          <div className="bg-purple-600/20 p-4 rounded-2xl shadow-inner shadow-purple-500/10 shrink-0">
            <Brain className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h4 className="font-extrabold text-xl text-white mb-2">Consistency</h4>
            <p className="text-gray-400 leading-relaxed text-lg">Based on your last 8 sessions, focus on <span className="text-purple-400 font-bold px-1 bg-purple-500/10 rounded">consistent technique</span> rather than raw power for the best overall performance and injury prevention.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12">
        <h3 className="text-3xl font-extrabold text-white mb-6">Recommended Drills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-indigo-900/40 to-[#131620] p-6 rounded-3xl border border-indigo-500/30 shadow-lg shadow-indigo-500/10 relative overflow-hidden group cursor-pointer">
            <h4 className="font-extrabold text-indigo-400 text-xl mb-2 flex justify-between items-center">
              Shadow Batting
              <ArrowRight className="w-5 h-5 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </h4>
            <p className="text-gray-300 font-medium">5 sets • 20 reps</p>
            <p className="text-gray-500 text-sm mt-1">Focus on perfect form and follow-through.</p>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-900/40 to-[#131620] p-6 rounded-3xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10 relative overflow-hidden group cursor-pointer">
            <h4 className="font-extrabold text-cyan-400 text-xl mb-2 flex justify-between items-center">
              Speed Hitting
              <ArrowRight className="w-5 h-5 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
            </h4>
            <p className="text-gray-300 font-medium">3 sets • 10 reps</p>
            <p className="text-gray-500 text-sm mt-1">Maximum power output and bat speed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coach;
