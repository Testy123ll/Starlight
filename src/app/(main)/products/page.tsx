import { getProducts } from '@/lib/firestore';
import ProductBrowser from './ProductBrowser';

export const revalidate = 60; // SSG/ISR cache revalidates every 60 seconds maximum speed
export const metadata = { title: 'Products' };

export default async function ProductsPage() {
  // Fetch products on the server for instant page load and zero layout shift
  const products = await getProducts();
  
  return <ProductBrowser initialProducts={products} />;
}
