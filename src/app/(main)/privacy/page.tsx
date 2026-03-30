export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '40rem', margin: '6rem auto', padding: '1rem' }}>
      <h1 className="text-gradient-amber" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Privacy Policy</h1>
      <div style={{ color: '#CAC6BE', lineHeight: 1.8 }}>
        <p style={{ marginBottom: '1.5rem' }}>Your privacy is important to us. We only collect the necessary information required to fulfill your bulk order requests, such as your contact details and delivery addresses.</p>
        <p style={{ marginBottom: '1.5rem' }}>Starlight de Prince does not sell or share your data with third-party marketing agencies. All data transmitted through our Quote System is securely stored and used exclusively for logistics and customer service.</p>
        <p>If you have questions about our data retention policies, please email sales@starlightdeprince.com.ng.</p>
      </div>
    </div>
  );
}
