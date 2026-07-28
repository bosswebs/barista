import React, { useState } from 'react';
import { Video, Calendar, Clock, Link as LinkIcon, Users, Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface LiveClassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveClassModal: React.FC<LiveClassModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<'Zoom' | 'Google Meet' | 'Microsoft Teams'>('Zoom');
  const [date, setDate] = useState('2026-08-12');
  const [time, setTime] = useState('14:00');
  const [duration, setDuration] = useState('60');
  const [meetingUrl, setMeetingUrl] = useState('https://zoom.us/j/9812401824?pwd=bba2026live');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Please enter live class title');
      return;
    }
    toast.success(`Live Webinar "${title}" scheduled on ${platform}! Notifications sent to enrolled students.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 font-inter text-xs">
        
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg">
              <Video size={20} />
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-bold">Schedule Live Video Class</h3>
              <p className="text-slate-400 text-[11px]">Integrate Zoom, Google Meet or Teams for interactive webinars</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-xl font-bold">✕</button>
        </div>

        <div>
          <label className="text-slate-300 font-semibold block mb-1">Class / Webinar Title</label>
          <input
            type="text"
            placeholder="e.g. Masterclass: Latte Art Pouring Mechanics & Microfoam"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          {(['Zoom', 'Google Meet', 'Microsoft Teams'] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setPlatform(p);
                setMeetingUrl(
                  p === 'Zoom' ? 'https://zoom.us/j/9812401824?pwd=bba' :
                  p === 'Google Meet' ? 'https://meet.google.com/bba-coffee-art' :
                  'https://teams.microsoft.com/l/meetup-join/bba2026'
                );
              }}
              className={`p-2.5 rounded-xl font-bold text-[11px] border transition-all text-center ${
                platform === p
                  ? 'bg-teal-500/20 border-teal-400 text-teal-300 shadow-md'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Start Time (CAT)</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Duration (Mins)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <option value="45">45 Mins</option>
              <option value="60">60 Mins</option>
              <option value="90">90 Mins</option>
              <option value="120">120 Mins</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-slate-300 font-semibold block mb-1">Generated Meeting Link</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-teal-300 font-mono text-[11px]"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold py-3 rounded-xl hover:opacity-95 transition-all text-xs">
            Schedule & Broadcast Link
          </button>
          <button type="button" onClick={onClose} className="px-5 py-3 border border-slate-700 rounded-xl font-bold text-slate-400 hover:bg-slate-800">
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
};

export default LiveClassModal;
