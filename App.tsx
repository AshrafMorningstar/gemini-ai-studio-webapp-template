
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink, 
  BrainCircuit, 
  FileText, 
  Users, 
  Database,
  ArrowRightLeft,
  Search,
  MessageSquare
} from 'lucide-react';
import { FIFTEEN_DAY_PLAN, SKILL_MAP } from './constants';
import { DayTask, RoleType } from './types';
import { CareerAdvisorService } from './services/gemini';

const App: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<DayTask>(FIFTEEN_DAY_PLAN[0]);
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [advisor] = useState(() => new CareerAdvisorService());

  const toggleComplete = (id: number) => {
    setCompletedDays(prev => 
      prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
    );
  };

  const handleRefineStory = async () => {
    if (!userInput) return;
    setIsAiLoading(true);
    try {
      const res = await advisor.refineUserStory(userInput);
      setAiResponse(res);
    } catch (error) {
      setAiResponse("Error connecting to Gemini. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleTranslateSkill = async () => {
    if (!userInput) return;
    setIsAiLoading(true);
    try {
      const res = await advisor.translateSupportToProduct(userInput);
      setAiResponse(res);
    } catch (error) {
      setAiResponse("Error connecting to Gemini.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const progress = Math.round((completedDays.length / 15) * 100);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <ArrowRightLeft className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">Transition Catalyst</h1>
              <p className="text-sm text-slate-500">Tech Support to BA / PDM / PO Roadmap</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Overall Progress</span>
              <div className="w-48 h-2 bg-slate-200 rounded-full mt-1 overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <div className="text-lg font-bold text-indigo-600">{progress}%</div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Roadmap */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h2 className="font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> 15-Day Roadmap
              </h2>
            </div>
            <div className="max-h-[60vh] overflow-y-auto">
              {FIFTEEN_DAY_PLAN.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day)}
                  className={`w-full p-4 flex items-center gap-3 border-b border-slate-100 transition-colors text-left
                    ${selectedDay.id === day.id ? 'bg-indigo-50 border-l-4 border-l-indigo-600' : 'hover:bg-slate-50'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs
                    ${completedDays.includes(day.id) ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                    {completedDays.includes(day.id) ? <CheckCircle2 className="w-5 h-5" /> : day.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${selectedDay.id === day.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                      {day.title}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{day.focus}</p>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${selectedDay.id === day.id ? 'translate-x-1 text-indigo-600' : 'text-slate-300'}`} />
                </button>
              ))}
            </div>
          </section>

          {/* Transferable Skills Card */}
          <section className="bg-indigo-900 rounded-xl shadow-lg p-6 text-white">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5" /> The Pivot Angle
            </h3>
            <div className="space-y-4">
              {SKILL_MAP.map((skill, idx) => (
                <div key={idx} className="bg-indigo-800/50 p-3 rounded-lg border border-indigo-700">
                  <p className="text-xs font-semibold text-indigo-300 uppercase tracking-tighter">{skill.supportSkill}</p>
                  <p className="text-sm font-medium mt-1">
                    <span className="text-indigo-200">➔ {skill.targetRole}: </span>
                    {skill.pivotAngle}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Content Area */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Active Day Detail */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest
                  ${selectedDay.category === 'Learning' ? 'bg-blue-100 text-blue-700' : 
                    selectedDay.category === 'Portfolio' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                  {selectedDay.category}
                </span>
                <button 
                  onClick={() => toggleComplete(selectedDay.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${completedDays.includes(selectedDay.id) 
                      ? 'bg-green-600 text-white shadow-md' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200'}`}
                >
                  {completedDays.includes(selectedDay.id) ? (
                    <><CheckCircle2 className="w-4 h-4" /> Completed</>
                  ) : (
                    'Mark Day Complete'
                  )}
                </button>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900">Day {selectedDay.id}: {selectedDay.title}</h2>
              <p className="text-lg text-slate-600 mt-2 font-medium">{selectedDay.focus}</p>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-indigo-600" /> Key Activities
                </h3>
                <ul className="space-y-4">
                  {selectedDay.activities.map((act, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-sm leading-relaxed">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mt-2 shrink-0" />
                      {act}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-indigo-600" /> Deliverable
                  </h3>
                  <p className="text-indigo-700 font-semibold text-sm">{selectedDay.deliverable || "Portfolio Progress Record"}</p>
                </div>

                {selectedDay.resources.length > 0 && (
                  <div>
                    <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3">
                      <ExternalLink className="w-5 h-5 text-indigo-600" /> Resources
                    </h3>
                    <div className="space-y-2">
                      {selectedDay.resources.map((res, i) => (
                        <a 
                          key={i} 
                          href={res.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm group"
                        >
                          {res.name}
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* AI Advisor Tool */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <BrainCircuit className="text-indigo-600 w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">AI Career Co-Pilot</h2>
                <p className="text-sm text-slate-500">Transform your support achievements or refine your portfolio.</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Input Achievement or User Story Draft
                </label>
                <textarea 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full h-32 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all bg-slate-50"
                  placeholder="e.g., 'Fixed over 500 network latency tickets in 6 months' or 'As a user, I want a faster checkout so I save time.'"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={handleTranslateSkill}
                  disabled={isAiLoading || !userInput}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4" /> Translate to BA/PO
                </button>
                <button 
                  onClick={handleRefineStory}
                  disabled={isAiLoading || !userInput}
                  className="px-6 py-2.5 bg-white border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold text-sm hover:bg-indigo-50 disabled:opacity-50 transition-all flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Refine User Story
                </button>
              </div>

              {aiResponse && (
                <div className="mt-6 p-6 bg-slate-900 rounded-xl text-slate-200 font-mono text-sm leading-relaxed relative border-l-4 border-indigo-500 animate-in fade-in slide-in-from-bottom-2">
                  <div className="absolute top-2 right-4 text-[10px] text-slate-500 uppercase tracking-widest font-sans">Gemini Insight</div>
                  <pre className="whitespace-pre-wrap">{aiResponse}</pre>
                </div>
              )}

              {isAiLoading && (
                <div className="mt-6 flex items-center gap-3 text-indigo-600 animate-pulse font-medium text-sm">
                  <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  Generating professional insight...
                </div>
              )}
            </div>
          </section>

          {/* Tips for Tech Support Pros */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="p-2 bg-blue-200 rounded-lg w-fit mb-4">
                <Users className="text-blue-700 w-5 h-5" />
              </div>
              <h4 className="font-bold text-blue-900 mb-2">Stakeholder Mastery</h4>
              <p className="text-sm text-blue-700 leading-relaxed">Your 4 years of support is basically 4 years of extreme stakeholder management. You've negotiated with frustrated users—now do it with developers.</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <div className="p-2 bg-purple-200 rounded-lg w-fit mb-4">
                <Database className="text-purple-700 w-5 h-5" />
              </div>
              <h4 className="font-bold text-purple-900 mb-2">The Data Edge</h4>
              <p className="text-sm text-purple-700 leading-relaxed">PDM roles crave people who know why data breaks. Use your experience seeing database errors to prove you understand data integrity.</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
              <div className="p-2 bg-amber-200 rounded-lg w-fit mb-4">
                <Briefcase className="text-amber-700 w-5 h-5" />
              </div>
              <h4 className="font-bold text-amber-900 mb-2">Impact Storytelling</h4>
              <p className="text-sm text-amber-700 leading-relaxed">Don't say "I fixed tickets." Say "I identified a recurring technical debt issue that was causing 15% of all support volume."</p>
            </div>
          </section>

        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© 2024 Transition Catalyst • Inspired by the AshrafMorningstar Transition Path</p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/AshrafMorningstar" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/ashrafmorningstar" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-600 transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
