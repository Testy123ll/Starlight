import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Catalog',
  description: 'Browse our extensive catalog of MDF, HDF, Blockboard, and Plywood. Filter by category, thickness, and grade.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
