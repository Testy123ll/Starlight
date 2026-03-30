import Image from 'next/image';

export const metadata = { title: 'About Us' };

export default function AboutPage() {
  const coreValues = [
    { title: "Uncompromising Quality", desc: "We deal strictly in premium-grade MDF, HDF, Blockboards, and Marine Plywood sourced from the world's most reputable manufacturers." },
    { title: "Precision & Scale", desc: "Whether for an independent contractor or a large-scale development firm, we deliver exact sizing and massive volume without failure." },
    { title: "Integrity", desc: "Transparent pricing, honest specifications, and dedicated support from the first quote to final delivery." }
  ];

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient-amber" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.1 }}>About Starlight de Prince</h1>
        <p style={{ fontSize: '1.25rem', color: '#CAC6BE', maxWidth: '40rem', margin: '0 auto' }}>Building Nigeria's future with uncompromising quality since 2012.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem' }}>The Gold Standard in Wood Boards</h2>
          <p style={{ fontSize: '1rem', color: '#CAC6BE', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            Established in Ibadan, Starlight de Prince is Nigeria's premier supplier of industrial-grade wood boards, catering to interior designers, construction firms, and large-scale developers across all 36 states.
          </p>
          <p style={{ fontSize: '1rem', color: '#CAC6BE', lineHeight: 1.8 }}>
            Our mission is to provide premium MDF, HDF, Blockboard, and Plywood with unmatched reliability and precise dimensions. We source only the finest commercial and marine-grade materials to ensure that your furniture and structural projects stand the test of time. We don't just supply materials; we engineer construction success.
          </p>
        </div>
        <div style={{ position: 'relative', height: '450px', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <Image src="/images/about_office_wood.png" alt="Starlight Office Showroom" fill className="object-cover" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(19,19,19,0.8), transparent)' }} />
        </div>
      </div>

      <div style={{ marginTop: '8rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#D97706', marginBottom: '3rem', textAlign: 'center' }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {coreValues.map((v, i) => (
            <div key={i} className="card-dark" style={{ padding: '2.5rem', borderTop: '4px solid #D97706', borderRadius: '1rem' }}>
              <div style={{ fontSize: '2rem', color: '#FFB77D', marginBottom: '1rem', fontWeight: 900 }}>0{i + 1}</div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '1rem', fontWeight: 700 }}>{v.title}</h3>
              <p style={{ color: '#CAC6BE', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '8rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '3rem', textAlign: 'center' }}>Facility & Quality Showcase</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div style={{ position: 'relative', height: '350px', borderRadius: '1rem', overflow: 'hidden' }}>
            <Image src="/images/gallery_warehouse_1774653938996.png" alt="Warehouse Overview" fill className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div style={{ position: 'relative', height: '350px', borderRadius: '1rem', overflow: 'hidden' }}>
            <Image src="/images/gallery_boards_1774653955330.png" alt="Material Close Up" fill className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
          <div style={{ position: 'relative', height: '350px', borderRadius: '1rem', overflow: 'hidden' }}>
            <Image src="/images/gallery_construction_1774653971295.png" alt="Project Execution" fill className="object-cover transition-transform duration-500 hover:scale-105" />
          </div>
        </div>
      </div>
    </div>
  );
}
