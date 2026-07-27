import Layout from '@/components/layout/Layout';
import { Trophy, Medal, Flame, Award, CheckCircle, Zap } from 'lucide-react';

const topStudents = [
  { rank: 1, name: 'Marie Uwase', avatar: 'MU', streakDays: 24, score: 980, badges: ['Top Barista', 'Master Quizzer', '30 Day Streak'] },
  { rank: 2, name: 'Emmanuel Nkusi', avatar: 'EN', streakDays: 19, score: 920, badges: ['Mixology Pro', 'Quick Learner'] },
  { rank: 3, name: 'Fatou Diallo', avatar: 'FD', streakDays: 15, score: 875, badges: ['Sommelier Scholar'] },
  { rank: 4, name: 'Pascal Bizimana', avatar: 'PB', streakDays: 12, score: 810, badges: ['HACCP Certified'] },
  { rank: 5, name: 'Aline Mugisha', avatar: 'AM', streakDays: 10, score: 790, badges: ['Active Learner'] },
];

const Leaderboard = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-lms-bg pt-24 pb-16">
        <div className="container-custom max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-inter font-semibold mb-4">
              <Trophy size={16} className="text-amber-600" /> BBA Student Leaderboard
            </div>
            <h1 className="font-cormorant text-4xl md:text-5xl font-bold text-lms-dark mb-3">
              Recognizing Academic Excellence
            </h1>
            <p className="text-gray-600 font-inter max-w-xl mx-auto">
              Earn points by completing lessons, scoring high on quizzes, and maintaining daily learning streaks!
            </p>
          </div>

          {/* Podium Top 3 */}
          <div className="grid grid-cols-3 gap-4 mb-10 items-end max-w-2xl mx-auto">
            {/* Rank 2 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-700 font-bold font-cormorant flex items-center justify-center text-lg mb-2 relative">
                {topStudents[1].avatar}
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-400 text-white rounded-full text-xs flex items-center justify-center font-inter font-bold">2</span>
              </div>
              <h3 className="font-cormorant font-bold text-lg text-gray-900 leading-tight">{topStudents[1].name}</h3>
              <p className="text-xs text-lms-primary font-inter font-semibold mt-1">{topStudents[1].score} pts</p>
            </div>

            {/* Rank 1 */}
            <div className="bg-gradient-to-b from-amber-500 to-amber-600 p-6 rounded-2xl shadow-xl text-center text-white flex flex-col items-center -translate-y-4">
              <Trophy size={28} className="text-amber-200 mb-2 animate-bounce" />
              <div className="w-16 h-16 rounded-full bg-white text-amber-700 font-bold font-cormorant flex items-center justify-center text-2xl mb-2 relative shadow-inner">
                {topStudents[0].avatar}
                <span className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-300 text-amber-900 rounded-full text-xs flex items-center justify-center font-inter font-bold border-2 border-amber-500">1</span>
              </div>
              <h3 className="font-cormorant font-bold text-xl leading-tight">{topStudents[0].name}</h3>
              <p className="text-xs text-amber-100 font-inter font-bold mt-1">{topStudents[0].score} pts</p>
            </div>

            {/* Rank 3 */}
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-800 font-bold font-cormorant flex items-center justify-center text-lg mb-2 relative">
                {topStudents[2].avatar}
                <span className="absolute -bottom-1 -right-1 w-6 h-6 bg-amber-700 text-white rounded-full text-xs flex items-center justify-center font-inter font-bold">3</span>
              </div>
              <h3 className="font-cormorant font-bold text-lg text-gray-900 leading-tight">{topStudents[2].name}</h3>
              <p className="text-xs text-lms-primary font-inter font-semibold mt-1">{topStudents[2].score} pts</p>
            </div>
          </div>

          {/* Full Rankings List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center text-xs font-inter font-semibold text-gray-500 uppercase tracking-wider">
              <span>Rank & Student</span>
              <span>Streak</span>
              <span>Badges</span>
              <span>Total Points</span>
            </div>
            <div className="divide-y divide-gray-100 font-inter text-sm">
              {topStudents.map((s) => (
                <div key={s.rank} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      s.rank === 1 ? 'bg-amber-400 text-white' : s.rank === 2 ? 'bg-slate-300 text-slate-700' : s.rank === 3 ? 'bg-amber-200 text-amber-800' : 'text-gray-400'
                    }`}>
                      #{s.rank}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-lms-primary/10 text-lms-primary font-cormorant font-bold flex items-center justify-center">
                        {s.avatar}
                      </div>
                      <span className="font-semibold text-gray-900">{s.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-orange-600 font-semibold text-xs bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                    <Flame size={14} /> {s.streakDays} Days
                  </div>

                  <div className="hidden md:flex gap-1">
                    {s.badges.map((b) => (
                      <span key={b} className="text-[10px] bg-lms-primary/10 text-lms-primary px-2 py-0.5 rounded-md font-semibold">
                        {b}
                      </span>
                    ))}
                  </div>

                  <span className="font-cormorant font-bold text-lg text-lms-dark">{s.score} pts</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gamification Explanation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Flame size={24} className="text-orange-500 mx-auto mb-2" />
              <h4 className="font-cormorant font-bold text-lg text-lms-dark">Daily Streaks</h4>
              <p className="text-xs text-gray-500 font-inter mt-1">Log in and complete at least one lesson daily to maintain your streak!</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Award size={24} className="text-lms-primary mx-auto mb-2" />
              <h4 className="font-cormorant font-bold text-lg text-lms-dark">Earn Badges</h4>
              <p className="text-xs text-gray-500 font-inter mt-1">Unlock rare achievements by scoring 100% on course quizzes.</p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-center">
              <Zap size={24} className="text-amber-500 mx-auto mb-2" />
              <h4 className="font-cormorant font-bold text-lg text-lms-dark">Employer Visibility</h4>
              <p className="text-xs text-gray-500 font-inter mt-1">Top-ranked students on the leaderboard are featured directly to hiring partners!</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
