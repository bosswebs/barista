import React, { useState } from 'react';
import { Sparkles, Bot, Check, Copy, Wand2, BookOpen, HelpCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'quiz' | 'outline' | 'grading';
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'quiz'
}) => {
  const [mode, setMode] = useState<'quiz' | 'outline' | 'grading'>(initialMode);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState<any>(null);

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (!topic.trim()) {
      toast.error('Please enter a topic or student essay content');
      return;
    }

    setIsGenerating(true);
    setGeneratedOutput(null);

    setTimeout(() => {
      setIsGenerating(false);

      if (mode === 'quiz') {
        setGeneratedOutput({
          title: `AI-Generated Quiz: ${topic}`,
          questions: [
            {
              id: 1,
              question: `What is the optimal water temperature range for extracting high-yield espresso in ${topic}?`,
              options: ['85°C – 88°C', '90°C – 96°C (195°F–205°F)', '98°C – 100°C', '75°C – 82°C'],
              correct: 1,
              explanation: '90°C to 96°C extracts desirable solubles without scorching delicate aromatic oils.'
            },
            {
              id: 2,
              question: `How does grind size adjustment impact total brew time during ${topic}?`,
              options: [
                'Finer grinds increase resistance, slowing flow rate',
                'Coarser grinds slow flow rate',
                'Grind size has no impact on extraction duration',
                'Finer grinds decrease extraction yield'
              ],
              correct: 0,
              explanation: 'Finer particles pack tighter, offering greater resistance to pressurized water.'
            },
            {
              id: 3,
              question: `Which sensory attribute directly indicates over-extraction in ${topic}?`,
              options: ['Bright citric acidity', 'Harsh lingering bitterness & astringency', 'Sweet caramel notes', 'Floral aroma'],
              correct: 1,
              explanation: 'Over-extraction pulls heavy, bitter tannins and organic acids after sweet compounds are dissolved.'
            }
          ]
        });
      } else if (mode === 'outline') {
        setGeneratedOutput({
          title: `Curriculum Masterclass: ${topic}`,
          modules: [
            {
              moduleNumber: 1,
              title: `Introduction to ${topic} Fundamentals`,
              lessons: ['Historical Origin & Specialty Grading', 'Anatomy of Green Coffee Beans', 'Equipment Setup & Maintenance']
            },
            {
              moduleNumber: 2,
              title: `Core Techniques & Precision Execution`,
              lessons: ['Dose, Yield & Extraction Time Rules', 'Sensory Cupping & Flavor Profiles', 'Troubleshooting Channeling']
            },
            {
              moduleNumber: 3,
              title: `Advanced Commercial Applications`,
              lessons: ['High-Volume Workflow Efficiency', 'Milk Texturing & Microfoam Latte Art', 'Customer Experience & Quality Control']
            }
          ]
        });
      } else {
        setGeneratedOutput({
          title: `AI Grading & Feedback Analysis`,
          scoreRecommendation: '92 / 100 (Distinction)',
          strengths: [
            'Demonstrates thorough mastery of extraction variable interplay',
            'Accurately identifies pressure profiling effects on crema density',
            'Includes clear safety & hygiene protocol citations'
          ],
          improvementAreas: [
            'Elaborate further on water TDS impact on extraction yield',
            'Provide concrete commercial workflow examples'
          ],
          suggestedFeedback: `Excellent work! Your breakdown of ${topic} shows strong technical understanding and practical application skills. To reach 100%, consider incorporating water quality chemistry (TDS/pH) into your extraction analysis.`
        });
      }

      toast.success('AI recommendation generated successfully!');
    }, 1200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(generatedOutput, null, 2));
    toast.success('Generated content copied to clipboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-slate-950 font-bold shadow-lg">
              <Bot size={22} />
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-bold flex items-center gap-2">
                BBA AI Pedagogical Assistant <Sparkles size={16} className="text-teal-400" />
              </h3>
              <p className="text-xs text-slate-400">Automated content creation, quiz generation & grading recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-2 text-xl font-bold">✕</button>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => { setMode('quiz'); setGeneratedOutput(null); }}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              mode === 'quiz' ? 'bg-teal-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HelpCircle size={15} /> Quiz Creator
          </button>
          <button
            onClick={() => { setMode('outline'); setGeneratedOutput(null); }}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              mode === 'outline' ? 'bg-teal-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen size={15} /> Course Outline
          </button>
          <button
            onClick={() => { setMode('grading'); setGeneratedOutput(null); }}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              mode === 'grading' ? 'bg-teal-500 text-slate-950 shadow-md font-bold' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckCircle size={15} /> AI Grading
          </button>
        </div>

        {/* Input Form */}
        <div className="space-y-4 font-inter text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">
              {mode === 'quiz' && 'Topic / Key Learning Objective'}
              {mode === 'outline' && 'Course Subject / Title'}
              {mode === 'grading' && 'Student Essay / Submission Text'}
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={
                mode === 'quiz' ? 'e.g. Espresso Extraction Mechanics & Dose Yield ratios' :
                mode === 'outline' ? 'e.g. Master Barista Sensory Evaluation & Wine Pairing' :
                'Paste student submission text here for instant AI grading analysis...'
              }
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {mode !== 'grading' && (
            <div>
              <label className="text-slate-300 font-semibold block mb-1.5">Target Academic Level</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <option value="Beginner">Beginner (Foundational)</option>
                <option value="Intermediate">Intermediate (Professional Barista)</option>
                <option value="Advanced">Advanced (Master Sommelier & F&B Director)</option>
              </select>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-lg text-sm"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                Generating AI Pedagogy Data...
              </>
            ) : (
              <>
                <Wand2 size={16} /> Generate {mode === 'quiz' ? 'Interactive Quiz' : mode === 'outline' ? 'Curriculum Structure' : 'Grading Recommendation'}
              </>
            )}
          </button>
        </div>

        {/* Output Display */}
        {generatedOutput && (
          <div className="bg-slate-800/90 rounded-2xl border border-slate-700 p-5 space-y-4 font-inter text-xs">
            <div className="flex justify-between items-center border-b border-slate-700 pb-3">
              <h4 className="font-bold text-teal-400 text-sm flex items-center gap-2">
                <Check size={16} /> {generatedOutput.title}
              </h4>
              <button onClick={handleCopy} className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-700 px-3 py-1 rounded-lg">
                <Copy size={13} /> Copy JSON
              </button>
            </div>

            {mode === 'quiz' && (
              <div className="space-y-3">
                {generatedOutput.questions.map((q: any) => (
                  <div key={q.id} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                    <p className="font-semibold text-white mb-2">{q.id}. {q.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {q.options.map((opt: string, idx: number) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg border ${
                            idx === q.correct
                              ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-teal-300/80 mt-2">💡 Explanation: {q.explanation}</p>
                  </div>
                ))}
              </div>
            )}

            {mode === 'outline' && (
              <div className="space-y-3">
                {generatedOutput.modules.map((m: any) => (
                  <div key={m.moduleNumber} className="bg-slate-900/80 p-3 rounded-xl border border-slate-700">
                    <h5 className="font-bold text-white mb-1">Module {m.moduleNumber}: {m.title}</h5>
                    <ul className="list-disc list-inside text-slate-300 space-y-1 text-[11px] pl-2">
                      {m.lessons.map((les: string, i: number) => (
                        <li key={i}>{les}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {mode === 'grading' && (
              <div className="space-y-3">
                <div className="p-3 bg-teal-950/50 border border-teal-500/40 rounded-xl">
                  <p className="text-xs font-bold text-teal-300">Recommended Score: {generatedOutput.scoreRecommendation}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-200 mb-1">Key Strengths:</p>
                  <ul className="list-disc list-inside text-slate-300 text-[11px] space-y-1">
                    {generatedOutput.strengths.map((s: string, i: number) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-200 mb-1">Recommended Student Feedback:</p>
                  <p className="bg-slate-900 p-3 rounded-xl text-slate-300 italic text-[11px] border border-slate-700">
                    "{generatedOutput.suggestedFeedback}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantModal;
