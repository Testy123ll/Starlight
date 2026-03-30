export const metadata = { title: 'FAQ' };

export default function FAQPage() {
  return (
    <div style={{ maxWidth: '40rem', margin: '6rem auto', padding: '1rem' }}>
      <h1 className="text-gradient-amber" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Frequently Asked Questions</h1>
      <div className="card-dark" style={{ padding: '2rem' }}>
        <h3 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Do you deliver outside Lagos?</h3>
        <p style={{ color: '#CAC6BE', marginBottom: '1.5rem', lineHeight: 1.6 }}>Yes, we deliver to all 36 states in Nigeria. Delivery costs are calculated during the quotation phase based on volume and distance.</p>
        
        <h3 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '0.5rem' }}>What is the minimum order quantity?</h3>
        <p style={{ color: '#CAC6BE', marginBottom: '1.5rem', lineHeight: 1.6 }}>For wholesale pricing, the minimum order is 50 boards. However, we cater to smaller requests at retail price upon contacting our sales team.</p>
        
        <h3 style={{ color: '#fff', fontSize: '1.125rem', marginBottom: '0.5rem' }}>Are your HDF boards moisture resistant?</h3>
        <p style={{ color: '#CAC6BE', lineHeight: 1.6 }}>We offer specific marine-grade and MR (Moisture Resistant) HDF variants. Please specify this requirement when using the Material Calculator or submitting a quote.</p>
      </div>
    </div>
  );
}
