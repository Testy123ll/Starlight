'use client';

import { useState } from 'react';
import { useQuoteStore } from '@/store/quoteStore';

type MaterialType = 'mdf' | 'hdf' | 'blockboard' | 'plywood';

const PROFILES = ['Standard', 'Moisture Resistant', 'Fire Retardant', 'Decorative'];
const GAUGES = ['3mm', '6mm', '9mm', '12mm', '15mm', '18mm'];
const PITCHES = [{ label: 'Simple Cover', factor: 1 }, { label: 'Basic Shapes', factor: 1.05 }, { label: 'Complex Pattern', factor: 1.15 }, { label: 'Intricate Details', factor: 1.25 }];
const COVERAGE: Record<string, number> = { 'Standard': 2.98, 'Moisture Resistant': 2.98, 'Fire Retardant': 2.98, 'Decorative': 2.98 };
const PRICES: Record<string, number> = { '3mm': 4000, '6mm': 6500, '9mm': 9000, '12mm': 12000, '15mm': 15000, '18mm': 18000 };

function fmt(n: number) { return `₦${n.toLocaleString('en-NG')}`; }

export default function CalculatorPage() {
  const addItem = useQuoteStore((s) => s.addItem);
  const [type, setType] = useState<MaterialType>('mdf');
  const [length, setLength] = useState(20);
  const [width, setWidth] = useState(15);
  const [pitchIdx, setPitchIdx] = useState(0);
  const [profile, setProfile] = useState('Standard');
  const [gaugeIdx, setGaugeIdx] = useState(1);
  const [wastage, setWastage] = useState(10);
  const [calculated, setCalculated] = useState(false);

  const gauge = GAUGES[gaugeIdx];
  const coverage = COVERAGE[profile] ?? 0.686;
  const pitchFactor = PITCHES[pitchIdx].factor;
  const area = length * width * pitchFactor * (1 + wastage / 100);
  const sheets = Math.ceil(area / coverage);
  const unitPrice = PRICES[gauge] ?? 3200;
  const totalPrice = sheets * unitPrice;

  const handleAddToQuote = () => {
    addItem({ 
      productId: `calc-${profile}-${gauge}`, 
      name: `${type.toUpperCase()} Board ${profile} ${gauge}`, 
      sku: `BD-${type.toUpperCase()}-${profile.replace(' ', '-').toUpperCase()}-${gauge.replace('.', '')}`, 
      qty: sheets, 
      unitPrice, 
      specs: `${profile} · ${gauge} · Area: ${coverage}m²` 
    });
  };

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <span style={{ fontSize: '0.75rem', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Free Tool</span>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff', marginTop: '0.5rem', marginBottom: '0.75rem' }}>Board Material Calculator</h1>
        <p style={{ color: '#CAC6BE' }}>Get an exact estimate of the materials you need for your project.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* FORM */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {(['mdf', 'hdf', 'blockboard', 'plywood'] as MaterialType[]).map((t) => (
              <button key={t} onClick={() => setType(t)}
                style={{ flex: 1, padding: '0.625rem', fontSize: '0.875rem', fontWeight: 600, borderRadius: '0.25rem', textTransform: 'uppercase', transition: 'all 0.2s', background: type === t ? '#D97706' : '#353535', color: type === t ? '#131313' : '#CAC6BE', border: 'none', cursor: 'pointer' }}>
                🪵 {t}
              </button>
            ))}
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Project Length (meters)</label>
            <input type="number" min={1} value={length} onChange={(e) => setLength(Number(e.target.value))} className="input-dark" />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Project Width (meters)</label>
            <input type="number" min={1} value={width} onChange={(e) => setWidth(Number(e.target.value))} className="input-dark" />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Pattern Complexity</label>
            <select value={pitchIdx} onChange={(e) => setPitchIdx(Number(e.target.value))} className="input-dark">
              {PITCHES.map((p, i) => <option key={i} value={i}>{p.label}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Board Grade</label>
            <select value={profile} onChange={(e) => setProfile(e.target.value)} className="input-dark">
              {PROFILES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>Thickness</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {GAUGES.map((g, i) => (
                <button key={g} onClick={() => setGaugeIdx(i)}
                  style={{ flex: 1, padding: '0.5rem', fontSize: '0.75rem', fontWeight: 600, borderRadius: '0.25rem', border: `1px solid ${gaugeIdx === i ? '#D97706' : '#353535'}`, background: gaugeIdx === i ? '#D97706' : 'transparent', color: gaugeIdx === i ? '#131313' : '#CAC6BE', cursor: 'pointer' }}>
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#CAC6BE', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              Wastage Factor <span style={{ color: '#D97706', fontWeight: 700 }}>{wastage}%</span>
            </label>
            <input type="range" min={5} max={20} value={wastage} onChange={(e) => setWastage(Number(e.target.value))} style={{ width: '100%', accentColor: '#D97706' }} />
          </div>

          <button onClick={() => setCalculated(true)} className="btn-amber" style={{ width: '100%', justifyContent: 'center', fontSize: '0.875rem', padding: '0.75rem' }}>
            Calculate Now →
          </button>
        </div>

        {/* RESULTS */}
        <div style={{ background: '#2A2A2A', borderRadius: '0.5rem', border: '1px solid rgba(53,53,53,0.2)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ borderBottom: '1px solid rgba(53,53,53,0.4)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff' }}>Your Estimate</h2>
            <div style={{ width: '2.5rem', height: '0.125rem', background: '#D97706', marginTop: '0.25rem' }} />
          </div>

          {!calculated ? (
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#CAC6BE' }}>
              <div>
                <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧮</p>
                <p style={{ fontSize: '0.875rem' }}>Fill in the form and click Calculate</p>
              </div>
            </div>
          ) : (
            <>
              <div style={{ background: 'rgba(217,119,6,0.1)', borderRadius: '0.75rem', border: '1px solid rgba(217,119,6,0.2)', padding: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Boards Required</p>
                <p style={{ fontSize: '3.75rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{sheets}</p>
                <p style={{ fontSize: '0.875rem', color: '#CAC6BE', marginTop: '0.25rem' }}>boards of {type.toUpperCase()} {profile} {gauge}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                {[
                  ['Total Area', `${(length * width * pitchFactor).toFixed(1)} m²`],
                  ['Coverage/Board', `${coverage} m²`],
                  ['Wastage Added', `${wastage}%`],
                  ['Unit Price', fmt(unitPrice)],
                ].map(([label, val]) => (
                  <div key={label} style={{ background: '#20201F', borderRadius: '0.25rem', padding: '0.75rem' }}>
                    <p style={{ fontSize: '0.75rem', color: '#CAC6BE', marginBottom: '0.25rem' }}>{label}</p>
                    <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{val}</p>
                  </div>
                ))}
              </div>

              <div className="card" style={{ border: '1px solid rgba(217,119,6,0.2)', background: 'rgba(217,119,6,0.05)' }}>
                <p style={{ fontSize: '0.75rem', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Recommended Product</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '0.25rem' }}>{type.toUpperCase()} {profile} Board {gauge}</p>
                <p style={{ fontSize: '0.875rem', color: '#CAC6BE', marginBottom: '0.75rem' }}>{fmt(unitPrice)} per board</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(53,53,53,0.4)', paddingTop: '0.75rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', color: '#CAC6BE' }}>Total Estimate</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 900, color: '#D97706' }}>{fmt(totalPrice)}</p>
                  </div>
                  <button onClick={handleAddToQuote} className="btn-amber" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>Add to Quote</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={{ marginTop: '5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', textAlign: 'center', marginBottom: '2.5rem' }}>How It Works</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {[
            { step: '01', title: 'Measure', desc: 'Enter your project area dimensions and design complexity.' },
            { step: '02', title: 'Configure', desc: 'Choose board specifications, thickness, and wastage allowance.' },
            { step: '03', title: 'Order', desc: 'Add the recommended product to your quote cart and submit.' },
          ].map((s) => (
            <div key={s.step} className="card" style={{ textAlign: 'center' }}>
              <p className="text-gradient-amber" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1 }}>{s.step}</p>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: '#CAC6BE' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
