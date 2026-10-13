import { FormulaItem } from '../types/physics';

export const FORMULAS_DATA: FormulaItem[] = [
  {
    id: 'f-speed',
    name: 'Tezlik formulasi',
    grade: 6,
    topic: 'Kinematika',
    symbol: 'v',
    formula: 'v = s / t',
    description: 'Jismning birlik vaqt ichida bosib o‘tgan yo‘lini ifodalaydi.',
    unit: 'm/s',
    inputs: [
      { key: 's', label: 'Masofa (s)', unit: 'm', defaultValue: 100, min: 1, max: 10000, step: 5 },
      { key: 't', label: 'Vaqt (t)', unit: 's', defaultValue: 5, min: 0.1, max: 3600, step: 0.5 }
    ],
    calculate: (v) => {
      const res = v.s / v.t;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `v = s / t = ${v.s} m / ${v.t} s = ${res.toFixed(2)} m/s (yoki ${(res * 3.6).toFixed(2)} km/h)`
      };
    }
  },
  {
    id: 'f-density',
    name: 'Moddaning zichligi',
    grade: 7,
    topic: 'Gidrostatika',
    symbol: 'ρ',
    formula: 'ρ = m / V',
    description: 'Hajm birligidagi modda massasini ifodalovchi fizik kattalik.',
    unit: 'kg/m³',
    inputs: [
      { key: 'm', label: 'Massa (m)', unit: 'kg', defaultValue: 250, min: 0.1, max: 5000, step: 1 },
      { key: 'V', label: 'Hajm (V)', unit: 'm³', defaultValue: 0.25, min: 0.01, max: 10, step: 0.01 }
    ],
    calculate: (v) => {
      const res = v.m / v.V;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `ρ = m / V = ${v.m} kg / ${v.V} m³ = ${res.toFixed(2)} kg/m³`
      };
    }
  },
  {
    id: 'f-gravity-force',
    name: 'Og‘irlik kuchi',
    grade: 7,
    topic: 'Dinamika',
    symbol: 'F_og‘',
    formula: 'F = m · g',
    description: 'Yer (yoki boshqa osmon jismi) tomonidan jismga ta’sir qiluvchi gravitatsion tortishish kuchi.',
    unit: 'N (Nyuton)',
    inputs: [
      { key: 'm', label: 'Massa (m)', unit: 'kg', defaultValue: 60, min: 0.1, max: 1000, step: 0.5 },
      { key: 'g', label: 'Erkin tushish tezlanishi (g)', unit: 'm/s²', defaultValue: 9.8, min: 1.6, max: 25, step: 0.1 }
    ],
    calculate: (v) => {
      const res = v.m * v.g;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `F = m · g = ${v.m} kg · ${v.g} m/s² = ${res.toFixed(2)} N`
      };
    }
  },
  {
    id: 'f-pressure',
    name: 'Bosim formulasi',
    grade: 7,
    topic: 'Mexanika',
    symbol: 'p',
    formula: 'p = F / S',
    description: 'Sirtga tik ta’sir qilayotgan kuchning shu sirt yuziga nisbati.',
    unit: 'Pa (Paskal)',
    inputs: [
      { key: 'F', label: 'Kuch (F)', unit: 'N', defaultValue: 500, min: 1, max: 50000, step: 10 },
      { key: 'S', label: 'Yuza (S)', unit: 'm²', defaultValue: 0.05, min: 0.001, max: 10, step: 0.01 }
    ],
    calculate: (v) => {
      const res = v.F / v.S;
      return {
        result: Number(res.toFixed(1)),
        stepByStep: `p = F / S = ${v.F} N / ${v.S} m² = ${res.toFixed(1)} Pa (${(res / 1000).toFixed(2)} kPa)`
      };
    }
  },
  {
    id: 'f-archimedes',
    name: 'Arximed itaruvchi kuchi',
    grade: 7,
    topic: 'Gidrostatika',
    symbol: 'F_A',
    formula: 'F_A = ρ_s · g · V_bot',
    description: 'Suyuqlik yoki gazga botirilgan jismga pastdan yuqoriga yo‘nalgan itaruvchi kuch.',
    unit: 'N',
    inputs: [
      { key: 'rho', label: 'Suyuqlik zichligi (ρ)', unit: 'kg/m³', defaultValue: 1000, min: 700, max: 13600, step: 50 },
      { key: 'V', label: 'Botgan hajm (V)', unit: 'm³', defaultValue: 0.015, min: 0.001, max: 2, step: 0.005 },
      { key: 'g', label: 'Tezlanish (g)', unit: 'm/s²', defaultValue: 9.8, min: 1.6, max: 10, step: 0.1 }
    ],
    calculate: (v) => {
      const res = v.rho * v.g * v.V;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `F_A = ${v.rho} kg/m³ · ${v.g} m/s² · ${v.V} m³ = ${res.toFixed(2)} N`
      };
    }
  },
  {
    id: 'f-ohm',
    name: 'Zanjir qismi uchun Om qonuni',
    grade: 8,
    topic: 'Elektr toki',
    symbol: 'I',
    formula: 'I = U / R',
    description: 'Tok kuchi kuchlanishga to‘g‘ri, qarshilikka teskari proporsionaldir.',
    unit: 'A (Amper)',
    inputs: [
      { key: 'U', label: 'Kuchlanish (U)', unit: 'V', defaultValue: 220, min: 1, max: 1000, step: 5 },
      { key: 'R', label: 'Qarshilik (R)', unit: 'Ω', defaultValue: 44, min: 0.5, max: 500, step: 0.5 }
    ],
    calculate: (v) => {
      const res = v.U / v.R;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `I = U / R = ${v.U} V / ${v.R} Ω = ${res.toFixed(2)} A`
      };
    }
  },
  {
    id: 'f-electric-power',
    name: 'Elektr quvvati',
    grade: 8,
    topic: 'Elektr toki',
    symbol: 'P',
    formula: 'P = U · I',
    description: 'Vaqt birligi ichida elektr maydoni bajargan ish tezligi.',
    unit: 'W (Vatt)',
    inputs: [
      { key: 'U', label: 'Kuchlanish (U)', unit: 'V', defaultValue: 220, min: 1, max: 380, step: 5 },
      { key: 'I', label: 'Tok kuchi (I)', unit: 'A', defaultValue: 5, min: 0.1, max: 50, step: 0.5 }
    ],
    calculate: (v) => {
      const res = v.U * v.I;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `P = U · I = ${v.U} V · ${v.I} A = ${res.toFixed(2)} W (${(res / 1000).toFixed(3)} kW)`
      };
    }
  },
  {
    id: 'f-heat',
    name: 'Isitish uchun issiqlik miqdori',
    grade: 8,
    topic: 'Termodinamika',
    symbol: 'Q',
    formula: 'Q = c · m · ΔT',
    description: 'Jismni qizdirishda yoki sovishda ajraladigan issiqlik miqdori.',
    unit: 'J (Joul)',
    inputs: [
      { key: 'c', label: 'Solishtirma issiqlik sig‘imi (c)', unit: 'J/(kg·°C)', defaultValue: 4200, min: 130, max: 4200, step: 50 },
      { key: 'm', label: 'Massa (m)', unit: 'kg', defaultValue: 3, min: 0.1, max: 100, step: 0.5 },
      { key: 'dt', label: 'Harorat farqi (ΔT)', unit: '°C', defaultValue: 50, min: 1, max: 150, step: 1 }
    ],
    calculate: (v) => {
      const res = v.c * v.m * v.dt;
      return {
        result: Number(res.toFixed(0)),
        stepByStep: `Q = ${v.c} J/(kg·°C) · ${v.m} kg · ${v.dt} °C = ${res.toLocaleString()} J (${(res / 1000).toFixed(1)} kJ)`
      };
    }
  },
  {
    id: 'f-newton-2',
    name: 'Nyutonning ikkinchi qonuni',
    grade: 9,
    topic: 'Dinamika',
    symbol: 'F',
    formula: 'F = m · a',
    description: 'Jism olgan tezlanish unga ta’sir qiluvchi kuchga to‘g‘ri proporsional.',
    unit: 'N',
    inputs: [
      { key: 'm', label: 'Massa (m)', unit: 'kg', defaultValue: 12, min: 0.1, max: 2000, step: 1 },
      { key: 'a', label: 'Tezlanish (a)', unit: 'm/s²', defaultValue: 3.5, min: 0.1, max: 50, step: 0.5 }
    ],
    calculate: (v) => {
      const res = v.m * v.a;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `F = m · a = ${v.m} kg · ${v.a} m/s² = ${res.toFixed(2)} N`
      };
    }
  },
  {
    id: 'f-kinetic-energy',
    name: 'Kinetik energiya',
    grade: 9,
    topic: 'Mexanika',
    symbol: 'E_k',
    formula: 'E_k = (m · v²) / 2',
    description: 'Harakatdagi jismning egallagan mexanik energiyasi.',
    unit: 'J',
    inputs: [
      { key: 'm', label: 'Massa (m)', unit: 'kg', defaultValue: 1500, min: 0.1, max: 10000, step: 10 },
      { key: 'v', label: 'Tezlik (v)', unit: 'm/s', defaultValue: 20, min: 0.5, max: 100, step: 1 }
    ],
    calculate: (v) => {
      const res = (v.m * Math.pow(v.v, 2)) / 2;
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `E_k = (${v.m} kg · (${v.v} m/s)²) / 2 = ${res.toLocaleString()} J (${(res / 1000).toFixed(2)} kJ)`
      };
    }
  },
  {
    id: 'f-pendulum-period',
    name: 'Matematik mayatnik davri',
    grade: 9,
    topic: 'Tebranishlar',
    symbol: 'T',
    formula: 'T = 2π √(l / g)',
    description: 'Ip uzunligi va erkin tushish tezlanishiga bog‘liq bo‘lgan to‘liq tebranish davri.',
    unit: 's',
    inputs: [
      { key: 'l', label: 'Ip uzunligi (l)', unit: 'm', defaultValue: 1, min: 0.1, max: 20, step: 0.1 },
      { key: 'g', label: 'Tezlanish (g)', unit: 'm/s²', defaultValue: 9.8, min: 1.6, max: 25, step: 0.1 }
    ],
    calculate: (v) => {
      const res = 2 * Math.PI * Math.sqrt(v.l / v.g);
      return {
        result: Number(res.toFixed(3)),
        stepByStep: `T = 2 · 3.1416 · √(${v.l} / ${v.g}) = ${res.toFixed(3)} sekund`
      };
    }
  },
  {
    id: 'f-coulomb',
    name: 'Kulon qonuni',
    grade: 10,
    topic: 'Elektrostatika',
    symbol: 'F',
    formula: 'F = k · |q₁ · q₂| / r²',
    description: 'Ikki nuqtaviy zaryadning vakuumdagi elektrostatik o‘zaro ta’sir kuchi.',
    unit: 'N',
    inputs: [
      { key: 'q1', label: '1-zaryad (q₁)', unit: 'μC', defaultValue: 5, min: 0.1, max: 100, step: 0.5 },
      { key: 'q2', label: '2-zaryad (q₂)', unit: 'μC', defaultValue: 10, min: 0.1, max: 100, step: 0.5 },
      { key: 'r', label: 'Masofa (r)', unit: 'm', defaultValue: 0.2, min: 0.01, max: 5, step: 0.05 }
    ],
    calculate: (v) => {
      const k = 9e9;
      const q1 = v.q1 * 1e-6;
      const q2 = v.q2 * 1e-6;
      const res = (k * Math.abs(q1 * q2)) / Math.pow(v.r, 2);
      return {
        result: Number(res.toFixed(2)),
        stepByStep: `F = (9·10⁹ · ${v.q1}·10⁻⁶ · ${v.q2}·10⁻⁶) / (${v.r})² = ${res.toFixed(2)} N`
      };
    }
  },
  {
    id: 'f-einstein',
    name: 'Eynshteynning energiya tenglamasi',
    grade: 11,
    topic: 'Nisbiylik nazariyasi',
    symbol: 'E',
    formula: 'E = m · c²',
    description: 'Tinchlikdagi modda massasi va uning to‘liq energiyasi ekvivalentligi.',
    unit: 'Joul',
    inputs: [
      { key: 'm', label: 'Massa (m)', unit: 'kg', defaultValue: 0.001, min: 0.0001, max: 10, step: 0.001 }
    ],
    calculate: (v) => {
      const c = 3e8;
      const res = v.m * Math.pow(c, 2);
      return {
        result: res,
        stepByStep: `E = ${v.m} kg · (3·10⁸ m/s)² = ${(res).toExponential(3)} Joul (taxminan ${(res / 3.6e6).toFixed(1)} kW·h)`
      };
    }
  }
];
