import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Material Calculator',
  description: 'Free material calculator. Instantly estimate the exact number of wood boards needed for your project.',
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
