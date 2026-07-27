import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Clock, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false';
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const mockQuizData = {
  id: 'quiz-1',
  title: 'Barista Foundations & Extraction Mechanics',
  durationMinutes: 10,
  passingScorePct: 80,
  questions: [
    {
      id: 1,
      text: 'What is the standard recommended brew water temperature range for espresso extraction?',
      type: 'multiple-choice',
      options: ['80°C - 85°C', '90°C - 96°C (195°F - 205°F)', '100°C - 105°C', '70°C - 75°C'],
      correctAnswer: 1,
      explanation: 'Optimal espresso extraction occurs between 90°C and 96°C. Lower temperatures lead to under-extraction (sourness), while higher burn the coffee.'
    },
    {
      id: 2,
      text: 'True or False: Under-extracted espresso tastes sour, thin, and lacks body.',
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'Under-extraction means soluble solids were not fully extracted from grounds, leaving high acidity/sour notes without sweetness or body.'
    },
    {
      id: 3,
      text: 'What is the term for creating a velvety milk foam texture suitable for latte art?',
      type: 'multiple-choice',
      options: ['Macrofoam', 'Microfoam', 'Stiff peak', 'Crema'],
      correctAnswer: 1,
      explanation: 'Microfoam consists of microscopic air bubbles integrated into milk, producing a glossy, silky texture.'
    },
    {
      id: 4,
      text: 'What pressure is standard for traditional commercial espresso extraction?',
      type: 'multiple-choice',
      options: ['3 bars', '9 bars', '15 bars', '25 bars'],
      correctAnswer: 1,
      explanation: '9 bars of pressure is the golden industry standard for pushing water through tamped espresso pucks.'
    }
  ] as Question[]
};

const QuizPage = () => {
  const { courseId, quizId } = useParams<{ courseId: string; quizId: string }>();
  const navigate = useNavigate();

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(mockQuizData.durationMinutes * 60);

  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          toast.warning("Time is up! Quiz submitted automatically.");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const calculateScore = () => {
    let correct = 0;
    mockQuizData.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const percentage = Math.round((correct / mockQuizData.questions.length) * 100);
    return { correct, total: mockQuizData.questions.length, percentage };
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(selectedAnswers).length < mockQuizData.questions.length) {
      if (!window.confirm("You have unanswered questions. Are you sure you want to submit?")) {
        return;
      }
    }
    setIsSubmitted(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const scoreResults = isSubmitted ? calculateScore() : null;
  const isPassed = scoreResults ? scoreResults.percentage >= mockQuizData.passingScorePct : false;
  const currentQuestion = mockQuizData.questions[currentQIndex];

  return (
    <Layout>
      <div className="min-h-screen bg-lms-bg pt-24 pb-16">
        <div className="container-custom max-w-3xl">
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-lms-primary font-inter font-semibold uppercase tracking-wider">Course Quiz</span>
              <h1 className="font-cormorant text-2xl md:text-3xl font-bold text-lms-dark">{mockQuizData.title}</h1>
            </div>

            {!isSubmitted && (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-xl font-inter font-semibold text-sm border border-amber-200">
                <Clock size={16} />
                <span>Time Left: {formatTime(timeLeft)}</span>
              </div>
            )}
          </div>

          {!isSubmitted ? (
            /* Quiz Active Mode */
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 font-inter mb-2">
                  <span>Question {currentQIndex + 1} of {mockQuizData.questions.length}</span>
                  <span>{Math.round(((currentQIndex + 1) / mockQuizData.questions.length) * 100)}% Complete</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${((currentQIndex + 1) / mockQuizData.questions.length) * 100}%` }} />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="font-cormorant text-2xl font-bold text-lms-dark mb-4">
                  {currentQIndex + 1}. {currentQuestion.text}
                </h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = selectedAnswers[currentQuestion.id] === idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(currentQuestion.id, idx)}
                        className={`w-full text-left p-4 rounded-xl font-inter text-sm transition-all duration-200 flex items-center justify-between border ${
                          isSelected
                            ? 'bg-lms-primary/10 border-lms-primary text-lms-primary font-semibold shadow-sm'
                            : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span>{opt}</span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-lms-primary bg-lms-primary text-white' : 'border-gray-300'
                        }`}>
                          {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentQIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentQIndex === 0}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-inter text-sm font-semibold disabled:opacity-40 hover:bg-gray-50"
                >
                  Previous
                </button>

                {currentQIndex < mockQuizData.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex((prev) => prev + 1)}
                    className="lms-btn-primary text-sm py-2.5"
                  >
                    Next Question
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="lms-btn-accent text-sm py-2.5"
                  >
                    Submit Quiz
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              {/* Score Banner */}
              <div className={`p-8 rounded-3xl text-center shadow-lg border ${
                isPassed ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'
              }`}>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isPassed ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                }`}>
                  {isPassed ? <Award size={40} /> : <XCircle size={40} />}
                </div>

                <h2 className="font-cormorant text-4xl font-bold mb-2 text-gray-900">
                  {isPassed ? 'Congratulations! You Passed!' : 'Quiz Not Passed'}
                </h2>
                <p className="font-inter text-gray-600 text-sm mb-6">
                  {isPassed
                    ? 'You have successfully satisfied the passing threshold for this module.'
                    : 'You did not achieve the minimum score. Review the material and try again.'}
                </p>

                <div className="flex justify-center gap-8 text-center max-w-sm mx-auto p-4 bg-white/80 rounded-2xl shadow-sm border border-gray-100">
                  <div>
                    <p className="text-xs text-gray-400 font-inter uppercase">Score</p>
                    <p className="font-cormorant text-3xl font-bold text-gray-900">{scoreResults?.percentage}%</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div>
                    <p className="text-xs text-gray-400 font-inter uppercase">Correct</p>
                    <p className="font-cormorant text-3xl font-bold text-gray-900">{scoreResults?.correct} / {scoreResults?.total}</p>
                  </div>
                  <div className="w-px bg-gray-200" />
                  <div>
                    <p className="text-xs text-gray-400 font-inter uppercase">Passing Score</p>
                    <p className="font-cormorant text-3xl font-bold text-gray-900">{mockQuizData.passingScorePct}%</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  {isPassed ? (
                    <button
                      onClick={() => navigate(`/lms/courses/${courseId}/learn`)}
                      className="lms-btn-primary flex items-center gap-2"
                    >
                      Continue Course <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setSelectedAnswers({});
                        setCurrentQIndex(0);
                        setTimeLeft(mockQuizData.durationMinutes * 60);
                      }}
                      className="lms-btn-primary flex items-center gap-2"
                    >
                      <RotateCcw size={16} /> Retry Quiz
                    </button>
                  )}
                </div>
              </div>

              {/* Explanations Review */}
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-cormorant text-2xl font-bold text-lms-dark mb-6">Question Review</h3>
                <div className="space-y-6">
                  {mockQuizData.questions.map((q, idx) => {
                    const userChoice = selectedAnswers[q.id];
                    const isRight = userChoice === q.correctAnswer;
                    return (
                      <div key={q.id} className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="flex items-start gap-3 mb-2">
                          {isRight ? (
                            <CheckCircle2 size={20} className="text-emerald-500 shrink-0 mt-1" />
                          ) : (
                            <XCircle size={20} className="text-red-500 shrink-0 mt-1" />
                          )}
                          <div>
                            <h4 className="font-cormorant font-bold text-lg text-gray-800">
                              {idx + 1}. {q.text}
                            </h4>
                            <p className="text-sm font-inter text-gray-600 mt-1">
                              <strong>Your answer:</strong> {userChoice !== undefined ? q.options[userChoice] : 'No answer'}
                            </p>
                            {!isRight && (
                              <p className="text-sm font-inter text-emerald-700 mt-1 font-medium">
                                <strong>Correct answer:</strong> {q.options[q.correctAnswer]}
                              </p>
                            )}
                            <div className="mt-3 p-3 bg-blue-50/50 rounded-lg text-xs font-inter text-blue-900 border border-blue-100 flex items-start gap-2">
                              <HelpCircle size={14} className="text-blue-500 shrink-0 mt-0.5" />
                              <span>{q.explanation}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default QuizPage;
