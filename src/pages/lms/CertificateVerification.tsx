import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Award, CheckCircle, Download, QrCode, Share2, Calendar, User, BookOpen, Shield } from 'lucide-react';

// Mock certificate data — in production, fetch from Supabase by ID
const mockCertificates: Record<string, any> = {
  'BBA-2026-001': {
    certNumber: 'BBA-2026-001',
    studentName: 'Marie Uwase',
    courseName: 'Professional Barista Mastery',
    instructorName: 'Chef Jean-Paul Nkurunziza',
    completionDate: 'July 15, 2026',
    issuedDate: 'July 16, 2026',
    grade: 'Distinction',
    score: 94,
    valid: true,
  },
};

const CertificateVerification = () => {
  const { id } = useParams<{ id: string }>();
  const cert = id ? mockCertificates[id] : null;

  return (
    <Layout>
      <div className="min-h-screen bg-lms-bg pt-24 pb-16">
        <div className="container-custom max-w-4xl">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lms-primary/10 text-lms-primary rounded-full text-sm font-inter mb-4">
              <QrCode size={14} /> Certificate Verification
            </div>
            <h1 className="font-cormorant text-4xl font-bold text-lms-dark mb-2">
              Verify a BBA Certificate
            </h1>
            <p className="text-gray-600 font-inter">
              All certificates issued by Beyond Barista Academy include a unique ID and QR code for instant verification.
            </p>
          </div>

          {!id || id === 'verify' ? (
            /* Search form */
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-gray-100">
              <Shield size={48} className="text-lms-primary mx-auto mb-4" />
              <h2 className="font-cormorant text-3xl font-bold text-lms-dark mb-3">Enter Certificate ID</h2>
              <p className="text-gray-500 font-inter mb-6">Enter the certificate number printed on the certificate to verify its authenticity.</p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="e.g. BBA-2026-001"
                  className="lms-input flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) window.location.href = `/certificate/${val}`;
                    }
                  }}
                />
                <button
                  className="lms-btn-primary"
                  onClick={(e) => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                    if (input?.value) window.location.href = `/certificate/${input.value.trim()}`;
                  }}>
                  Verify
                </button>
              </div>
            </div>
          ) : cert ? (
            /* Valid Certificate */
            <div className="space-y-6">
              {/* Status Banner */}
              <div className="flex items-center gap-3 p-4 bg-lms-success/10 border border-lms-success/30 rounded-2xl">
                <CheckCircle size={24} className="text-lms-success shrink-0" />
                <div>
                  <p className="font-semibold text-lms-success font-inter">Certificate Verified ✓</p>
                  <p className="text-sm text-gray-600 font-inter">This is an authentic certificate issued by Beyond Barista Academy.</p>
                </div>
              </div>

              {/* Certificate Visual */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-lms-secondary/30">
                {/* Certificate header */}
                <div className="bg-lms-gradient p-8 text-center">
                  <img src="/images/logo.png" alt="BBA Logo" className="h-16 w-16 object-contain mx-auto mb-3" />
                  <h2 className="font-cormorant text-3xl font-bold text-white">Beyond Barista Academy</h2>
                  <p className="text-lms-secondary font-inter text-sm mt-1">Kigali, Rwanda • beyondbarista.rw</p>
                </div>

                {/* Certificate body */}
                <div className="p-10 text-center relative">
                  <div className="absolute inset-0 opacity-5 flex items-center justify-center">
                    <Award size={300} className="text-lms-primary" />
                  </div>
                  <p className="text-gray-500 font-inter text-sm uppercase tracking-widest mb-2">This is to certify that</p>
                  <h1 className="font-cormorant text-5xl font-bold text-lms-dark mb-3">{cert.studentName}</h1>
                  <p className="text-gray-500 font-inter mb-2">has successfully completed</p>
                  <h2 className="font-cormorant text-3xl font-bold text-lms-primary mb-6">{cert.courseName}</h2>

                  <div className="flex justify-center gap-16 mb-8">
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-inter uppercase tracking-widest mb-1">Grade</p>
                      <p className="font-cormorant text-2xl font-bold text-lms-dark">{cert.grade}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-inter uppercase tracking-widest mb-1">Score</p>
                      <p className="font-cormorant text-2xl font-bold text-lms-dark">{cert.score}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-400 font-inter uppercase tracking-widest mb-1">Completed</p>
                      <p className="font-cormorant text-2xl font-bold text-lms-dark">{cert.completionDate}</p>
                    </div>
                  </div>

                  {/* Signatures */}
                  <div className="flex justify-around mb-8">
                    <div className="text-center">
                      <div className="h-12 mb-1 flex items-end justify-center">
                        <span className="font-cormorant text-2xl italic text-lms-primary">{cert.instructorName.split(' ').slice(-2).join(' ')}</span>
                      </div>
                      <div className="w-32 h-px bg-gray-300 mx-auto mb-1" />
                      <p className="text-xs text-gray-500 font-inter">Instructor</p>
                      <p className="text-sm font-cormorant font-bold text-gray-700">{cert.instructorName}</p>
                    </div>
                    <div className="text-center">
                      <div className="h-12 mb-1 flex items-end justify-center">
                        <span className="font-cormorant text-2xl italic text-lms-primary">Academy Director</span>
                      </div>
                      <div className="w-32 h-px bg-gray-300 mx-auto mb-1" />
                      <p className="text-xs text-gray-500 font-inter">Academy Director</p>
                      <p className="text-sm font-cormorant font-bold text-gray-700">BBA Rwanda</p>
                    </div>
                  </div>

                  {/* QR + ID */}
                  <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-100">
                    <div className="w-20 h-20 bg-lms-dark rounded-lg flex items-center justify-center">
                      <QrCode size={60} className="text-white" />
                    </div>
                    <div className="text-left">
                      <p className="text-xs text-gray-400 font-inter uppercase tracking-widest">Certificate ID</p>
                      <p className="font-inter font-bold text-lms-dark text-lg">{cert.certNumber}</p>
                      <p className="text-xs text-gray-400 font-inter">Issued: {cert.issuedDate}</p>
                      <p className="text-xs text-gray-400 font-inter">Verify at: beyondbarista.rw/certificate/{cert.certNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: User, label: 'Graduate', value: cert.studentName },
                  { icon: BookOpen, label: 'Course', value: cert.courseName },
                  { icon: Calendar, label: 'Issue Date', value: cert.issuedDate },
                  { icon: Award, label: 'Grade', value: `${cert.grade} (${cert.score}%)` },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="stat-card text-center">
                    <Icon size={20} className="text-lms-primary mx-auto mb-2" />
                    <p className="text-xs text-gray-400 font-inter uppercase tracking-widest">{label}</p>
                    <p className="font-cormorant font-bold text-lms-dark mt-1">{value}</p>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button className="lms-btn-primary flex items-center gap-2">
                  <Download size={16} /> Download PDF
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                  className="lms-btn-outline flex items-center gap-2">
                  <Share2 size={16} /> Share Link
                </button>
              </div>
            </div>
          ) : (
            /* Invalid */
            <div className="bg-white rounded-3xl shadow-lg p-10 text-center border border-red-100">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Shield size={32} className="text-red-500" />
              </div>
              <h2 className="font-cormorant text-3xl font-bold text-lms-dark mb-3">Certificate Not Found</h2>
              <p className="text-gray-500 font-inter mb-6">
                No certificate found with ID <strong className="text-red-600">{id}</strong>. 
                Please check the ID and try again.
              </p>
              <button onClick={() => window.history.back()} className="lms-btn-outline">← Try Again</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CertificateVerification;
