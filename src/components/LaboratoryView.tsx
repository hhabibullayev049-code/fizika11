import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, Compass, Droplet, Sun, Layers, HelpCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';

export const LaboratoryView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pendulum' | 'gravity' | 'ohm' | 'buoyancy' | 'optics'>('pendulum');

  // 1. PENDULUM STATE
  const [pendulumLength, setPendulumLength] = useState(1.2); // meters
  const [pendulumGravity, setPendulumGravity] = useState(9.8); // m/s^2
  const [pendulumPlanet, setPendulumPlanet] = useState('Yer (9.8 m/s²)');
  const [pendulumAngleMax, setPendulumAngleMax] = useState(25); // degrees
  const [isPendulumRunning, setIsPendulumRunning] = useState(true);
  const [pendulumTime, setPendulumTime] = useState(0);

  // 2. GRAVITY / FREE FALL STATE
  const [dropHeight, setDropHeight] = useState(20); // meters
  const [dropGravity, setDropGravity] = useState(9.8);
  const [isDropping, setIsDropping] = useState(false);
  const [dropProgress, setDropProgress] = useState(0); // 0 to 1
  const [dropMass, setDropMass] = useState(2); // kg

  // 3. OHM'S LAW CIRCUIT STATE
  const [voltage, setVoltage] = useState(12); // Volts
  const [resistance, setResistance] = useState(6); // Ohms
  const [circuitSwitch, setCircuitSwitch] = useState(true);

  // 4. BUOYANCY STATE
  const [liquidDensity, setLiquidDensity] = useState(1000); // kg/m^3 (water)
  const [objectDensity, setObjectDensity] = useState(600); // kg/m^3 (wood)
  const [objectVolume, setObjectVolume] = useState(0.005); // m^3

  // 5. OPTICS STATE
  const [incidentAngle, setIncidentAngle] = useState(45); // degrees
  const [refractiveIndex, setRefractiveIndex] = useState(1.5); // glass

  // Pendulum animation loop
  const animFrameRef = useRef<number | null>(null);
  useEffect(() => {
    let lastTimestamp = performance.now();
    const update = (now: number) => {
      const dt = (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      if (isPendulumRunning && activeTab === 'pendulum') {
        setPendulumTime((prev) => prev + dt);
      }
      animFrameRef.current = requestAnimationFrame(update);
    };
    animFrameRef.current = requestAnimationFrame(update);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPendulumRunning, activeTab]);

  // Calculations
  const pendulumPeriod = 2 * Math.PI * Math.sqrt(pendulumLength / pendulumGravity);
  const currentAngle = pendulumAngleMax * Math.cos((2 * Math.PI * pendulumTime) / pendulumPeriod);

  // Free fall calculations
  const totalDropTime = Math.sqrt((2 * dropHeight) / dropGravity);
  const impactSpeed = Math.sqrt(2 * dropGravity * dropHeight);

  const startDrop = () => {
    soundManager.playClick();
    setIsDropping(true);
    setDropProgress(0);
    const start = performance.now();
    const duration = totalDropTime * 1000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const prog = Math.min(1, elapsed / duration);
      // Quadratic motion s = 0.5 * g * t^2
      setDropProgress(Math.pow(prog, 2));
      if (prog < 1) {
        requestAnimationFrame(tick);
      } else {
        setIsDropping(false);
        soundManager.playLevelUp();
      }
    };
    requestAnimationFrame(tick);
  };

  // Ohm's law calculations
  const currentAmps = circuitSwitch ? voltage / resistance : 0;
  const powerWatts = circuitSwitch ? voltage * currentAmps : 0;

  // Buoyancy calculations
  const objectMass = objectDensity * objectVolume;
  const weightForce = objectMass * 9.8;
  const maxBuoyantForce = liquidDensity * 9.8 * objectVolume;
  const isFloating = objectDensity <= liquidDensity;
  const submergedFraction = isFloating ? Math.min(1, objectDensity / liquidDensity) : 1;
  const actualBuoyancy = isFloating ? weightForce : maxBuoyantForce;

  // Optics calculations
  const radIncident = (incidentAngle * Math.PI) / 180;
  // Snell: n1 * sin(theta1) = n2 * sin(theta2) -> sin(theta2) = (1.0 * sin(theta1)) / n2
  const sinRefracted = Math.sin(radIncident) / refractiveIndex;
  const refractedAngle = (Math.asin(Math.min(1, sinRefracted)) * 180) / Math.PI;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">🔬</span>
            Fizika virtual laboratoriyasi
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real vaqt rejimida parametrlar bilan tajriba o‘tkazing va fizik hodisalarni bevosita his eting.
          </p>
        </div>

        {/* Experiment Selector Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {[
            { id: 'pendulum', label: 'Mayatnik', icon: Compass },
            { id: 'gravity', label: 'Erkin tushish', icon: Layers },
            { id: 'ohm', label: 'Om qonuni', icon: Zap },
            { id: 'buoyancy', label: 'Arximed kuchi', icon: Droplet },
            { id: 'optics', label: 'Optika & Sinish', icon: Sun },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.id as any);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. PENDULUM SIMULATION */}
      {activeTab === 'pendulum' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visual Canvas */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[380px] relative overflow-hidden">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono">T = 2π√(l/g) = {pendulumPeriod.toFixed(2)} s</span>
              <span>Chastota: {(1 / pendulumPeriod).toFixed(2)} Hz</span>
            </div>

            {/* Pendulum SVG */}
            <div className="relative w-full h-[280px] flex items-start justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="-150 0 300 240">
                {/* Ceiling support */}
                <rect x="-60" y="0" width="120" height="8" rx="2" fill="#334155" />
                <line x1="-50" y1="0" x2="-40" y2="8" stroke="#64748b" strokeWidth="2" />
                <line x1="-30" y1="0" x2="-20" y2="8" stroke="#64748b" strokeWidth="2" />
                <line x1="-10" y1="0" x2="0" y2="8" stroke="#64748b" strokeWidth="2" />
                <line x1="10" y1="0" x2="20" y2="8" stroke="#64748b" strokeWidth="2" />
                <line x1="30" y1="0" x2="40" y2="8" stroke="#64748b" strokeWidth="2" />

                {/* Pivot point */}
                <circle cx="0" cy="8" r="4" fill="#06b6d4" />

                {/* Pendulum Rod and Bob */}
                {(() => {
                  const rodLengthPx = 40 + pendulumLength * 55;
                  const rad = (currentAngle * Math.PI) / 180;
                  const bobX = rodLengthPx * Math.sin(rad);
                  const bobY = 8 + rodLengthPx * Math.cos(rad);
                  return (
                    <g>
                      {/* Dotted equilibrium vertical line */}
                      <line x1="0" y1="8" x2="0" y2="220" stroke="#475569" strokeDasharray="3 3" strokeWidth="1" />
                      {/* Pendulum string */}
                      <line x1="0" y1="8" x2={bobX} y2={bobY} stroke="#38bdf8" strokeWidth="2" />
                      {/* Weight bob with glow */}
                      <circle cx={bobX} cy={bobY} r="14" fill="#0284c7" stroke="#38bdf8" strokeWidth="3" />
                      <circle cx={bobX} cy={bobY} r="4" fill="#e0f2fe" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Play/Pause controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsPendulumRunning(!isPendulumRunning);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors cursor-pointer"
              >
                {isPendulumRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPendulumRunning ? 'To‘xtatish' : 'Boshlash'}</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playClick();
                  setPendulumTime(0);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 font-medium text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Qayta o‘rnatish</span>
              </button>
            </div>
          </div>

          {/* Controls & Metrics */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Laboratoriya sozlamalari</h3>

            {/* String Length */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Ip uzunligi (l)</span>
                <span className="font-mono text-cyan-400">{pendulumLength.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.5"
                step="0.05"
                value={pendulumLength}
                onChange={(e) => setPendulumLength(parseFloat(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Angle */}
            <div>
              <div className="flex justify-between text-xs font-medium text-slate-300 mb-1.5">
                <span>Boshlang‘ich og‘ish burchagi (θ)</span>
                <span className="font-mono text-cyan-400">{pendulumAngleMax}°</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                step="1"
                value={pendulumAngleMax}
                onChange={(e) => setPendulumAngleMax(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Planet gravity selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Sayyora gravitatsiyasi (g)</label>
              <select
                value={pendulumPlanet}
                onChange={(e) => {
                  const val = e.target.value;
                  setPendulumPlanet(val);
                  if (val.includes('Yer')) setPendulumGravity(9.8);
                  else if (val.includes('Oy')) setPendulumGravity(1.62);
                  else if (val.includes('Mars')) setPendulumGravity(3.71);
                  else if (val.includes('Yupiter')) setPendulumGravity(24.79);
                }}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value="Yer (9.8 m/s²)">Yer (g = 9.8 m/s²)</option>
                <option value="Oy (1.62 m/s²)">Oy (g = 1.62 m/s²)</option>
                <option value="Mars (3.71 m/s²)">Mars (g = 3.71 m/s²)</option>
                <option value="Yupiter (24.79 m/s²)">Yupiter (g = 24.79 m/s²)</option>
              </select>
            </div>

            {/* Theory box */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300 block">Xulosa & Qoida:</span>
              <p>
                Matematik mayatnik davri yukning <strong>massasiga mutlaqo bog‘liq emas</strong>. U faqat ip uzunligi (l) va erkin tushish tezlanishiga (g) bog‘liq.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. FREE FALL SIMULATION */}
      {activeTab === 'gravity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex justify-between text-xs text-slate-400">
              <span>Balandlik: {dropHeight} m</span>
              <span className="font-mono text-cyan-400">Tushish vaqti: {totalDropTime.toFixed(2)} s</span>
            </div>

            {/* Drop visualization */}
            <div className="relative w-48 h-[240px] border-l-2 border-slate-700 pl-4 flex flex-col justify-between my-2">
              <div className="text-[10px] text-slate-500 font-mono">{dropHeight} m (Yuqori)</div>

              {/* Falling object */}
              <div
                className="absolute left-6 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-red-500 shadow-lg shadow-red-500/40 flex items-center justify-center text-[10px] font-bold text-white transition-none"
                style={{
                  top: `${Math.min(200, 10 + dropProgress * 190)}px`,
                }}
              >
                {dropMass}kg
              </div>

              <div className="text-[10px] text-slate-500 font-mono">0 m (Yer sathi)</div>
            </div>

            <button
              onClick={startDrop}
              disabled={isDropping}
              className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isDropping ? 'Tushmoqda...' : 'Jismni tashlash'}</span>
            </button>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Erkin tushish parametrlari</h3>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Balandlik (h)</span>
                <span className="font-mono text-amber-400">{dropHeight} metr</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={dropHeight}
                onChange={(e) => setDropHeight(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Jism massasi (m)</span>
                <span className="font-mono text-amber-400">{dropMass} kg</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={dropMass}
                onChange={(e) => setDropMass(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="p-3 bg-slate-800/80 rounded-xl space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Erishilgan tezlik (v):</span>
                <span className="font-mono font-bold text-white">{impactSpeed.toFixed(1)} m/s ({(impactSpeed * 3.6).toFixed(0)} km/h)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Potensial energiya (E_p = mgh):</span>
                <span className="font-mono font-bold text-white">{(dropMass * dropGravity * dropHeight).toFixed(0)} Joul</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Zarba paytidagi kinetik energiya:</span>
                <span className="font-mono font-bold text-emerald-400">{(0.5 * dropMass * Math.pow(impactSpeed, 2)).toFixed(0)} Joul</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. OHM'S LAW ELECTRIC CIRCUIT */}
      {activeTab === 'ohm' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex justify-between text-xs text-slate-400">
              <span className="font-mono">Om qonuni: I = U / R</span>
              <span className="font-mono text-cyan-400">Quvvat: {powerWatts.toFixed(1)} W</span>
            </div>

            {/* Circuit Graphic */}
            <div className="relative w-full max-w-sm h-52 border-2 border-dashed border-cyan-500/40 rounded-2xl flex items-center justify-center p-4">
              {/* Battery */}
              <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-800 border border-amber-500 px-3 py-2 rounded-lg text-center text-xs">
                <div className="text-amber-400 font-bold font-mono">+{voltage}V -</div>
                <div className="text-[10px] text-slate-400">Manba</div>
              </div>

              {/* Glowing Bulb */}
              <div className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    circuitSwitch && currentAmps > 0
                      ? 'bg-yellow-400/90 border-yellow-200 shadow-2xl shadow-yellow-400'
                      : 'bg-slate-800 border-slate-700'
                  }`}
                  style={{
                    opacity: circuitSwitch ? Math.min(1, 0.3 + (currentAmps / 10) * 0.7) : 0.2,
                  }}
                >
                  <Zap className={`w-8 h-8 ${circuitSwitch ? 'text-yellow-950 fill-yellow-950' : 'text-slate-600'}`} />
                </div>
                <span className="text-xs text-slate-300 font-semibold mt-2">Lampochka ({resistance} Ω)</span>
              </div>

              {/* Switch */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setCircuitSwitch(!circuitSwitch);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    circuitSwitch
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  }`}
                >
                  {circuitSwitch ? 'Kalit: ULANDI' : 'Kalit: UZILDI'}
                </button>
              </div>
            </div>

            {/* Ammeter readouts */}
            <div className="w-full flex items-center justify-center gap-6 p-3 bg-slate-950 rounded-xl font-mono text-sm">
              <span className="text-slate-400">Ampermetr ko‘rsatkichi:</span>
              <span className="text-2xl font-extrabold text-cyan-400">{currentAmps.toFixed(2)} A</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Zanjir parametrlari</h3>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Kuchlanish (U)</span>
                <span className="font-mono text-amber-400">{voltage} Volt</span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                step="1"
                value={voltage}
                onChange={(e) => setVoltage(parseInt(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Qarshilik (R)</span>
                <span className="font-mono text-cyan-400">{resistance} Om</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={resistance}
                onChange={(e) => setResistance(parseInt(e.target.value))}
                className="w-full accent-cyan-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800 text-xs text-slate-300 space-y-1.5">
              <span className="font-semibold text-white">Qonuniyat:</span>
              <p>
                Kuchlanish (U) ortishi bilan tok kuchi to‘g‘ri proporsional ortadi. Qarshilik (R) esa tok o‘tishiga to‘sqinlik qilib, uni kamaytiradi.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 4. BUOYANCY & ARCHIMEDES */}
      {activeTab === 'buoyancy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex justify-between text-xs text-slate-400">
              <span>Arximed kuchi: {actualBuoyancy.toFixed(1)} N</span>
              <span>Og‘irlik kuchi: {weightForce.toFixed(1)} N</span>
            </div>

            {/* Aquarium Water Tank */}
            <div className="relative w-64 h-56 border-2 border-slate-700 rounded-b-2xl bg-slate-950/60 overflow-hidden flex flex-col justify-end">
              {/* Liquid surface */}
              <div
                className="w-full bg-cyan-600/30 border-t border-cyan-400/50 transition-all duration-300 relative flex items-center justify-center"
                style={{ height: '75%' }}
              >
                <span className="absolute bottom-2 left-2 text-[10px] text-cyan-200/60 font-mono">
                  ρ = {liquidDensity} kg/m³
                </span>

                {/* Submerged/Floating Block */}
                <div
                  className={`w-20 h-16 rounded-lg border-2 shadow-lg flex flex-col items-center justify-center text-[10px] font-bold transition-all duration-500 absolute ${
                    isFloating
                      ? 'bg-amber-600/80 border-amber-400 text-amber-100'
                      : 'bg-slate-600/80 border-slate-400 text-slate-100 bottom-2'
                  }`}
                  style={{
                    top: isFloating ? `${Math.max(0, 30 - (1 - submergedFraction) * 20)}px` : undefined,
                  }}
                >
                  <span>{isFloating ? 'Suzmoqda' : 'Cho‘kdi'}</span>
                  <span className="text-[9px] opacity-80">{objectDensity} kg/m³</span>
                </div>
              </div>
            </div>

            <div className="text-xs font-semibold text-center mt-2">
              {isFloating ? (
                <span className="text-emerald-400">✓ Jism suyuqlik yuzida suzib turibdi (ρ_jism &le; ρ_suyuqlik)</span>
              ) : (
                <span className="text-rose-400">✗ Jism tubiga cho‘kib ketdi (ρ_jism &gt; ρ_suyuqlik)</span>
              )}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Zichliklar va hajm</h3>

            {/* Liquid preset */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Suyuqlik turi</label>
              <select
                value={liquidDensity}
                onChange={(e) => setLiquidDensity(parseInt(e.target.value))}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value={1000}>Toza suv (1000 kg/m³)</option>
                <option value={1030}>Dengiz / Sho‘r suv (1030 kg/m³)</option>
                <option value={920}>O‘simlik moyi (920 kg/m³)</option>
                <option value={13600}>Simob (13600 kg/m³)</option>
              </select>
            </div>

            {/* Object preset */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Jism materiali</label>
              <select
                value={objectDensity}
                onChange={(e) => setObjectDensity(parseInt(e.target.value))}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value={600}>Qarag‘ay yog‘ochi (600 kg/m³)</option>
                <option value={917}>Muz bo‘lagi (917 kg/m³)</option>
                <option value={2700}>Alyuminiy (2700 kg/m³)</option>
                <option value={7800}>Po‘lat / Temir (7800 kg/m³)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-800 rounded-xl text-xs space-y-1.5 text-slate-300">
              <div className="flex justify-between">
                <span>Botgan qismi foizi:</span>
                <span className="font-mono text-cyan-400">{(submergedFraction * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Arximed kuchi F_A:</span>
                <span className="font-mono text-emerald-400">{actualBuoyancy.toFixed(1)} N</span>
              </div>
              <div className="flex justify-between">
                <span>Jism og‘irlik kuchi F_og‘:</span>
                <span className="font-mono text-amber-400">{weightForce.toFixed(1)} N</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. OPTICS & SNELL'S LAW */}
      {activeTab === 'optics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-between min-h-[380px]">
            <div className="w-full flex justify-between text-xs text-slate-400">
              <span>Tushish burchagi: α = {incidentAngle}°</span>
              <span className="font-mono text-cyan-400">Sinish burchagi: β = {refractedAngle.toFixed(1)}°</span>
            </div>

            {/* Optics SVG diagram */}
            <div className="relative w-full h-64 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="-120 -100 240 200">
                {/* Interface line */}
                <line x1="-120" y1="0" x2="120" y2="0" stroke="#94a3b8" strokeWidth="2" />
                {/* Normal line */}
                <line x1="0" y1="-90" x2="0" y2="90" stroke="#475569" strokeDasharray="3 3" strokeWidth="1.5" />

                {/* Medium 1 (air) label */}
                <text x="-110" y="-15" fill="#64748b" fontSize="9">Havo (n₁ = 1.0)</text>
                {/* Medium 2 label */}
                <text x="-110" y="20" fill="#38bdf8" fontSize="9">Muhit 2 (n₂ = {refractiveIndex})</text>

                {/* Incident ray */}
                {(() => {
                  const rayLen = 90;
                  const radInc = (incidentAngle * Math.PI) / 180;
                  const x1 = -rayLen * Math.sin(radInc);
                  const y1 = -rayLen * Math.cos(radInc);
                  return (
                    <line x1={x1} y1={y1} x2="0" y2="0" stroke="#f43f5e" strokeWidth="3" />
                  );
                })()}

                {/* Reflected ray */}
                {(() => {
                  const rayLen = 90;
                  const radInc = (incidentAngle * Math.PI) / 180;
                  const x2 = rayLen * Math.sin(radInc);
                  const y2 = -rayLen * Math.cos(radInc);
                  return (
                    <line x1="0" y1="0" x2={x2} y2={y2} stroke="#f43f5e" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="4 2" />
                  );
                })()}

                {/* Refracted ray */}
                {(() => {
                  const rayLen = 90;
                  const radRef = (refractedAngle * Math.PI) / 180;
                  const x3 = rayLen * Math.sin(radRef);
                  const y3 = rayLen * Math.cos(radRef);
                  return (
                    <line x1="0" y1="0" x2={x3} y2={y3} stroke="#06b6d4" strokeWidth="3" />
                  );
                })()}

                <circle cx="0" cy="0" r="4" fill="#f43f5e" />
              </svg>
            </div>

            <div className="text-xs text-slate-400">
              Qizil chiziq: Tushuvchi nur | Moviy chiziq: Singan nur (Snell qonuni: sin α / sin β = n)
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Optika parametrlari</h3>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Tushish burchagi (α)</span>
                <span className="font-mono text-rose-400">{incidentAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                step="1"
                value={incidentAngle}
                onChange={(e) => setIncidentAngle(parseInt(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Ikkinchi muhit sinish ko‘rsatkichi (n₂)</label>
              <select
                value={refractiveIndex}
                onChange={(e) => setRefractiveIndex(parseFloat(e.target.value))}
                className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs"
              >
                <option value={1.33}>Suv (n = 1.33)</option>
                <option value={1.5}>Oddiy shisha (n = 1.50)</option>
                <option value={1.65}>Og‘ir shisha / Flint (n = 1.65)</option>
                <option value={2.42}>Olmos (n = 2.42)</option>
              </select>
            </div>

            <div className="p-3.5 bg-slate-800 rounded-xl text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-cyan-300">Snellius qonuni:</span>
              <p>
                Yorug‘lik optik zichroq muhitga o‘tganda (havodan shishaga), u perpendikulyarga qarab egiladi, ya’ni sinish burchagi tushish burchagidan kichik bo‘ladi (β &lt; α).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
