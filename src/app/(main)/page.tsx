import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Nigeria's Premier MDF, HDF & Plywood Supplier",
  description: 'Starlight de Prince — premium MDF, HDF, Blockboard, and Plywood materials for Nigeria\'s interior and construction industry.',
};

const stats = [
  { value: '500+', label: 'Products' },
  { value: '12+', label: 'Years in Business' },
  { value: '10,000+', label: 'Projects Delivered' },
  { value: '36', label: 'States Served' },
];

const categories = [
  { name: 'MDF & HDF Boards', desc: 'Medium and High-density fiberboards for interiors', count: '50+ variants', href: '/products?category=mdf', icon: '🪵' },
  { name: 'Premium Plywood', desc: 'Marine, commercial, and flexible plywood', count: '40+ variants', href: '/products?category=plywood', icon: '📐' },
  { name: 'Blockboards', desc: 'Solid wood core boards for heavy-duty furniture', count: '30+ variants', href: '/products?category=blockboard', icon: '🚪' },
];

const testimonials = [
  { quote: 'Starlight delivered 500 sheets of Marine Plywood on time to our Lekki site. Top-tier quality.', name: 'Engr. Babatunde Adeyemi', role: 'Site Engineer', state: 'Lagos' },
  { quote: "Their MDF boards have the best finishing in Lagos. We've made them our primary supplier.", name: 'Alhaji M. Usman', role: 'Procurement Director', state: 'Abuja' },
  { quote: 'The HDF boards are dense and solid. Cutting was smooth and the team was professional.', name: 'Mrs. Chioma Okafor', role: 'Property Developer', state: 'Enugu' },
];

export default function LandingPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, rgba(30,58,95,0.3) 0%, #131313 60%, #0E0E0E 100%)', minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, #D97706 40px, #D97706 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #D97706 40px, #D97706 41px)' }} />
        <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', padding: '6rem 1rem' }}>
          <div style={{ maxWidth: '48rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#D97706', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem', padding: '0.375rem 0.75rem', background: 'rgba(217,119,6,0.1)', borderRadius: '0.25rem', border: '1px solid rgba(217,119,6,0.2)' }}>
              🏆 Nigeria&apos;s Trusted Industrial Supplier
            </span>
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Built for<br />
              <span className="text-gradient-amber">Nigerian</span><br />
              Construction
            </h1>
            <p style={{ fontSize: '1.125rem', color: 'rgba(229,226,225,0.7)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '36rem' }}>
              Premium MDF, HDF, Blockboard, and Plywood materials. Engineered for durability, certified for quality, delivered across 36 states.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link href="/products" className="btn-amber" style={{ fontSize: '0.875rem', padding: '1rem 2rem' }}>Browse Products →</Link>
              <Link href="/catalog" className="btn-ghost" style={{ fontSize: '0.875rem', padding: '1rem 2rem' }}>Download Catalog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#1E3A5F', borderTop: '1px solid #2F4A70', borderBottom: '1px solid #2F4A70' }}>
        <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.875rem', fontWeight: 900, color: '#D97706' }}>{s.value}</p>
              <p style={{ fontSize: '0.75rem', color: 'rgba(229,226,225,0.7)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900 }}>Our Product Range</h2>
          <p style={{ color: '#CAC6BE', marginTop: '0.75rem' }}>Industrial-grade materials for every construction need</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="card" style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>{cat.name}</h3>
              <p style={{ fontSize: '0.875rem', color: '#CAC6BE', marginBottom: '1rem' }}>{cat.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="spec-badge">{cat.count}</span>
                <span style={{ color: '#D97706', fontSize: '0.875rem', fontWeight: 600 }}>View →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CALCULATOR TEASER */}
      <section className="section">
        <div className="card-dark" style={{ borderRadius: '1rem', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center', padding: '3rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Free Tool</span>
              <h2 style={{ fontSize: '2.25rem', fontWeight: 900, color: '#fff', margin: '0.5rem 0 1rem' }}>Calculate Your Materials</h2>
              <p style={{ color: '#CAC6BE', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                Input your project dimensions and get an instant estimate of the exact number of standard boards you need.
              </p>
              <Link href="/calculator" className="btn-amber" style={{ fontSize: '0.875rem' }}>Open Calculator →</Link>
            </div>
            <div style={{ background: 'rgba(53,53,53,0.5)', borderRadius: '0.75rem', padding: '1.5rem' }}>
              {[['Project Area', '150m²'], ['Standard Board', '1.22m x 2.44m'], ['Board Type', 'MDF 18mm'], ['Wastage Factor', '10%']].map(([label, val]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(53,53,53,0.5)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#CAC6BE' }}>{label}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{val}</span>
                </div>
              ))}
              <div style={{ background: 'rgba(217,119,6,0.1)', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center', border: '1px solid rgba(217,119,6,0.2)' }}>
                <p style={{ fontSize: '0.75rem', color: '#D97706', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>Estimated Result</p>
                <p style={{ fontSize: '2rem', fontWeight: 900, color: '#fff' }}>56 <span style={{ fontSize: '1rem', color: '#CAC6BE', fontWeight: 400 }}>boards</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900 }}>Trusted by Contractors Nationwide</h2>
          <p style={{ color: '#CAC6BE', marginTop: '0.5rem' }}>What our customers say</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {testimonials.map((t) => (
            <div key={t.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '2rem', fontWeight: 900, color: '#D97706', lineHeight: 1 }}>&ldquo;</p>
              <p style={{ fontSize: '0.875rem', color: 'rgba(229,226,225,0.8)', lineHeight: 1.7, fontStyle: 'italic' }}>{t.quote}</p>
              <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(53,53,53,0.4)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff' }}>{t.name}</p>
                <p style={{ fontSize: '0.75rem', color: '#CAC6BE' }}>{t.role} · {t.state} State</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="card-dark" style={{ borderRadius: '1rem', padding: '4rem 2rem' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 900, marginBottom: '1rem' }}>Ready to Order in Bulk?</h2>
          <p style={{ color: '#CAC6BE', marginBottom: '2rem', maxWidth: '32rem', margin: '0 auto 2rem' }}>Get a custom quote for orders above 50 units. Our sales team responds within 24 hours.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/quote" className="btn-amber" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem' }}>Request Bulk Quote</Link>
            <Link href="/products" className="btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem' }}>Browse Catalog</Link>
          </div>
        </div>
      </section>
    </>
  );
}
