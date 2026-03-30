import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request Bulk Quote',
  description: 'Request a custom bulk order quote for Starlight de Prince construction materials. Fast 24-hour response from our sales team.',
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
