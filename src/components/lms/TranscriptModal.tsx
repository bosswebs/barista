import React from 'react';
import { Award, Download, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  studentId?: string;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Marie Uwase',
  studentId = 'BBA-STU-2026-088'
}) => {
  if (!isOpen) return null;

  const academicRecords = [
    { code: 'BAR-101', course: 'Orientation: Welcome to Beyond Barista Academy', semester: 'Semester I - 2026', credits: 3.0, grade: 'A', score: '96%', gpa: 4.0 },
    { code: 'BAR-102', course: 'Espresso Mechanics & Grinder Calibration', semester: 'Semester I - 2026', credits: 4.0, grade: 'A', score: '94%', gpa: 4.0 },
    { code: 'BAR-103', course: 'Milk Hydrodynamics & Latte Art Mastery', semester: 'Semester I - 2026', credits: 3.0, grade: 'A-', score: '91%', gpa: 3.7 },
    { code: 'SOM-201', course: 'Sensory Cupping & Flavor Profiling', semester: 'Semester II - 2026', credits: 3.0, grade: 'B+', score: '88%', gpa: 3.3 },
    { code: 'FNB-301', course: 'Food Safety, HACCP & Bariste Leadership', semester: 'Semester II - 2026', credits: 4.0, grade: 'A', score: '95%', gpa: 4.0 },
  ];

  const totalCredits = academicRecords.reduce((acc, curr) => acc + curr.credits, 0);
  const totalGpaPoints = academicRecords.reduce((acc, curr) => acc + (curr.gpa * curr.credits), 0);
  const cumulativeGpa = (totalGpaPoints / totalCredits).toFixed(2);

  const handlePrint = () => {
    window.print();
    toast.success('Printing transcript document...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
      <div className="bg-white text-gray-900 rounded-3xl max-w-3xl w-full p-8 shadow-2xl space-y-6 max-h-[95vh] overflow-y-auto print:shadow-none print:max-w-none print:w-full print:p-0">
        
        {/* Actions Bar */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-4 print:hidden">
          <div className="flex items-center gap-2">
            <span className="bg-lms-primary/10 text-lms-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck size={14} /> Official Academic Transcript
            </span>
          </div>
          <div className="flex gap-2">
            <button onClick={handlePrint} className="lms-btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
              <Printer size={14} /> Print / Save PDF
            </button>
            <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold text-xs hover:bg-gray-200">
              Close
            </button>
          </div>
        </div>

        {/* Transcript Header */}
        <div className="text-center space-y-2 border-b-2 border-lms-primary pb-6">
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-lms-primary text-white font-bold font-cormorant text-2xl flex items-center justify-center shadow-lg">
              BBA
            </div>
            <div>
              <h2 className="font-cormorant text-3xl font-bold text-lms-dark tracking-wide">BEYOND BARISTA ACADEMY</h2>
              <p className="text-xs text-gray-500 font-inter font-semibold uppercase tracking-widest">Office of the Academic Registrar • Kigali, Rwanda</p>
            </div>
          </div>
          <p className="text-xs text-lms-primary font-bold uppercase tracking-wider pt-2">Official Student Academic Transcript</p>
        </div>

        {/* Student Bio Metadata */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200 font-inter text-xs">
          <div>
            <p className="text-gray-400 font-medium">Student Name:</p>
            <p className="font-bold text-gray-900">{studentName}</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium">Student Registration No:</p>
            <p className="font-bold text-lms-primary font-mono">{studentId}</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium">Programme Enrolled:</p>
            <p className="font-bold text-gray-900">Professional Barista Mastery</p>
          </div>
          <div>
            <p className="text-gray-400 font-medium">Cumulative GPA:</p>
            <p className="font-bold text-emerald-700 text-sm">{cumulativeGpa} / 4.00 (Distinction)</p>
          </div>
        </div>

        {/* Academic Course Table */}
        <div className="overflow-x-auto font-inter text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-lms-primary text-white uppercase text-[10px] tracking-wider font-semibold">
                <th className="p-3">Course Code</th>
                <th className="p-3">Course Unit Title</th>
                <th className="p-3">Term</th>
                <th className="p-3 text-center">Credits</th>
                <th className="p-3 text-center">Score %</th>
                <th className="p-3 text-center">Grade</th>
                <th className="p-3 text-right">GPA Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {academicRecords.map((rec) => (
                <tr key={rec.code} className="hover:bg-gray-50">
                  <td className="p-3 font-mono font-bold text-lms-primary">{rec.code}</td>
                  <td className="p-3 font-semibold text-gray-800">{rec.course}</td>
                  <td className="p-3 text-gray-500">{rec.semester}</td>
                  <td className="p-3 text-center font-semibold">{rec.credits.toFixed(1)}</td>
                  <td className="p-3 text-center font-bold text-gray-700">{rec.score}</td>
                  <td className="p-3 text-center">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[11px]">
                      {rec.grade}
                    </span>
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-gray-900">{rec.gpa.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100 font-bold text-gray-900">
                <td colSpan={3} className="p-3 uppercase">Total Credits Earned / Cumulative Summary</td>
                <td className="p-3 text-center">{totalCredits.toFixed(1)}</td>
                <td className="p-3 text-center">93.2% Avg</td>
                <td className="p-3 text-center">A Grade</td>
                <td className="p-3 text-right font-mono text-emerald-700">{cumulativeGpa} GPA</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Verification Footer & Seal */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-200 font-inter text-xs">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full border-4 border-lms-primary/30 flex items-center justify-center text-lms-primary font-bold text-[10px] text-center p-1 uppercase font-cormorant leading-tight">
              Official Seal BBA Rwanda
            </div>
            <div>
              <p className="font-bold text-gray-900">Dr. Jean-Paul Nkurunziza</p>
              <p className="text-gray-500 text-[11px]">Academic Dean & Director of Certification</p>
              <p className="text-gray-400 text-[10px]">Issued: July 28, 2026 • Verified Online</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-gray-400 text-[10px]">Verification ID: <span className="font-mono font-bold text-gray-700">TRNS-2026-9901-BBA</span></p>
            <p className="text-emerald-600 font-semibold text-[11px] flex items-center gap-1 justify-end mt-1">
              <CheckCircle2 size={13} /> Accredited by WDA & ISO 9001:2025
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TranscriptModal;
