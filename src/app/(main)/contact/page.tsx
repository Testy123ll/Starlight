export const metadata = { title: 'Contact Us' };

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 1rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient-amber" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1rem' }}>Contact Our Team</h1>
        <p style={{ color: '#CAC6BE', fontSize: '1.125rem' }}>We are ready to support your next big project.</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '60rem', margin: '0 auto' }}>
        <div className="card-dark" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📍</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Head Office</h2>
          <p style={{ color: '#CAC6BE', lineHeight: 1.6 }}>Ring Road,<br />Ibadan, Nigeria</p>
        </div>
        
        <div className="card-dark" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📞</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Phone Lines</h2>
          <p style={{ color: '#CAC6BE', lineHeight: 1.6 }}><a href="tel:+2348000000000" style={{ color: 'inherit', textDecoration: 'none' }}>+234 800 000 0000</a><br /><span style={{ fontSize: '0.75rem' }}>Mon-Sat 8am - 6pm</span></p>
        </div>
        
        <div className="card-dark" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Email Us</h2>
          <p style={{ color: '#CAC6BE', lineHeight: 1.6 }}><a href="mailto:sales@starlightdeprince.com.ng" style={{ color: 'inherit', textDecoration: 'none' }}>sales@starlightdeprince.com.ng</a><br />Response within 24 hours</p>
        </div>
      </div>
    </div>
  );
}
