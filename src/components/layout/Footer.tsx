import Link from 'next/link';

const footerLinks = {
  Products: [
    { href: '/products?category=mdf', label: 'MDF Boards' },
    { href: '/products?category=hdf', label: 'HDF Boards' },
    { href: '/products?category=blockboard', label: 'Blockboards' },
    { href: '/products?category=plywood', label: 'Premium Plywood' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/catalog', label: 'Download Catalog' },
    { href: '/quote', label: 'Bulk Quote' },
    { href: '/calculator', label: 'Material Calculator' },
  ],
  Support: [
    { href: '/contact', label: 'Contact Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Sale' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#0E0E0E', borderTop: '1px solid rgba(53,53,53,0.3)', marginTop: '5rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '4rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff' }}>STARLIGHT</span>
              <span style={{ fontSize: '0.625rem', color: '#D97706', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>DE PRINCE</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: '#CAC6BE', lineHeight: 1.6 }}>
              Nigeria&apos;s trusted supplier of premium MDF, HDF, Blockboards, and Plywood.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem', color: '#CAC6BE' }}>
              <span>📍 Ibadan, Nigeria</span>
              <a href="tel:+2348000000000" style={{ color: '#CAC6BE', textDecoration: 'none' }}>📞 +234 800 000 0000</a>
              <a href="mailto:sales@starlightdeprince.com.ng" style={{ color: '#CAC6BE', textDecoration: 'none' }}>✉ sales@starlightdeprince.com.ng</a>
            </div>
          </div>
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#fff', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{heading}</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} style={{ fontSize: '0.875rem', color: '#CAC6BE', textDecoration: 'none' }}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(53,53,53,0.3)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: '#CAC6BE', fontWeight: 600 }}>Certified by:</span>
            {['NAFDAC', 'SON Approved', 'ISO 9001:2015'].map((cert) => (
              <span key={cert} className="spec-badge">{cert}</span>
            ))}
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(202,198,190,0.6)' }}>
            © {new Date().getFullYear()} Starlight de Prince. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
