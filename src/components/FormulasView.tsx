import React, { useState } from 'react';
import { FORMULAS_DATA } from '../data/formulasData';
import { FormulaItem } from '../types/physics';
import { soundManager } from '../utils/sound';
import { Search, Calculator, Check, Copy } from 'lucide-react';

export const FormulasView: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormulaId, setSelectedFormulaId] = useState<string>(FORMULAS_DATA[0].id);
  const [inputValues, setInputValues] = useState<Record<string, Record<string, number>>>(() => {
    const init: Record<string, Record<string, number>> = {};
    FORMULAS_DATA.forEach((f) => {
      init[f.id] = {};
      f.inputs.forEach((inp) => {
        init[f.id][inp.key] = inp.defaultValue;
      });
    });
    return init;
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredFormulas = FORMULAS_DATA.filter((f) => {
    const matchesGrade = selectedGrade === 'all' || f.grade === selectedGrade;
    const matchesSearch =
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.formula.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesSearch;
  });

  const activeFormula = FORMULAS_DATA.find((f) => f.id === selectedFormulaId) || FORMULAS_DATA[0];

  const handleInputChange = (formulaId: string, key: string, value: number) => {
    setInputValues((prev) => ({
      ...prev,
      [formulaId]: {
        ...(prev[formulaId] || {}),
        [key]: value,
      },
    }));
  };

  const handleCopy = (text: string, id: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const calculationResult = activeFormula.calculate(inputValues[activeFormula.id] || {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">📐</span>
            Fizika formulalari va kalkulyatori
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Formulalarni o‘rganing, parametrlarni o‘zgartiring va bosqichma-bosqich yechimni hisoblang.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Formula yoki mavzuni qidirish..."
            className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Grade Filter Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
        <button
          onClick={() => {
            soundManager.playClick();
            setSelectedGrade('all');
          }}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
            selectedGrade === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          Barcha sinflar ({FORMULAS_DATA.length})
        </button>
        {[6, 7, 8, 9, 10, 11].map((g) => {
          const count = FORMULAS_DATA.filter((f) => f.grade === g).length;
          return (
            <button
              key={g}
              onClick={() => {
                soundManager.playClick();
                setSelectedGrade(g);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedGrade === g
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {g}-sinf ({count})
            </button>
          );
        })}
      </div>

      {/* Main Grid: Left formula selector list, Right live calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Formula Cards List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
          {filteredFormulas.length === 0 ? (
            <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-slate-400 text-sm">
              Mos formulalar topilmadi.
            </div>
          ) : (
            filteredFormulas.map((formula) => {
              const isSelected = formula.id === activeFormula.id;
              return (
                <div
                  key={formula.id}
                  onClick={() => {
                    soundManager.playClick();
                    setSelectedFormulaId(formula.id);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-lg shadow-cyan-950/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1">
                        <span className="font-semibold text-cyan-400">{formula.grade}-sinf</span>
                        <span>·</span>
                        <span>{formula.topic}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{formula.name}</h4>
                    </div>
                    <div className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      {formula.formula}
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-1">{formula.description}</p>
                </div>
              );
            })
          )}
        </div>

        {/* Live Interactive Calculator for Active Formula */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <span className="text-cyan-400 font-semibold">{activeFormula.grade}-sinf fizikasi</span>
                  <span>·</span>
                  <span>{activeFormula.topic}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{activeFormula.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{activeFormula.description}</p>
              </div>

              <button
                onClick={() => handleCopy(activeFormula.formula, 'formula')}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Formulani nusxalash"
              >
                {copiedId === 'formula' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Formula display badge */}
            <div className="my-5 p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30 flex items-center justify-between">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tenglama:</span>
              <span className="text-2xl font-extrabold font-mono text-cyan-400 tracking-wide">
                {activeFormula.formula}
              </span>
            </div>

            {/* Interactive Inputs */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Kiruvchi kattaliklar</h4>
              {activeFormula.inputs.map((inp) => {
                const currentVal = inputValues[activeFormula.id]?.[inp.key] ?? inp.defaultValue;
                return (
                  <div key={inp.key} className="space-y-1.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-200">{inp.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-amber-400">{currentVal}</span>
                        <span className="text-slate-400 text-[11px]">{inp.unit}</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min={inp.min}
                      max={inp.max}
                      step={inp.step}
                      value={currentVal}
                      onChange={(e) => handleInputChange(activeFormula.id, inp.key, parseFloat(e.target.value))}
                      className="w-full accent-cyan-500 cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Result & Step-by-step Solution */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-cyan-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4 text-cyan-400" />
                Hisoblash natijasi:
              </span>
              <div className="text-xl font-extrabold font-mono text-cyan-300">
                {calculationResult.result} <span className="text-sm font-normal text-slate-400">{activeFormula.unit}</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl text-xs font-mono text-emerald-400 border border-slate-800/80 break-words flex items-center justify-between">
              <span>{calculationResult.stepByStep}</span>
              <button
                onClick={() => handleCopy(calculationResult.stepByStep, 'calc')}
                className="ml-2 p-1 text-slate-400 hover:text-white shrink-0 cursor-pointer"
                title="Yechimni nusxalash"
              >
                {copiedId === 'calc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
