export const metadata = { title: 'Terms of Sale' };

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '40rem', margin: '6rem auto', padding: '1rem' }}>
      <h1 className="text-gradient-amber" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Terms of Sale</h1>
      <div style={{ color: '#CAC6BE', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.5rem' }}>Full terms and conditions regarding wholesale purchases, payment structures, and logistics will be provided in your official quotation document.</p>
        <p style={{ marginBottom: '1.5rem' }}>Generally, a 70% down payment is required to initiate processing for large bulk orders, with the remaining 30% due upon delivery confirmation. Goods remain the property of Starlight de Prince until full payment is received.</p>
        <p>Returns on customized or pre-cut boards are strictly prohibited unless manufacturing defects are proven upon immediate inspection at delivery.</p>
      </div>
    </div>
  );
}
