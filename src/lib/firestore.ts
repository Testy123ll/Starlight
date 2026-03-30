import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  QueryConstraint,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Product, Quote } from './types';

const toProduct = (id: string, data: Record<string, unknown>): Product => ({
  ...(data as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>),
  id,
  createdAt: (data.createdAt as Timestamp)?.toDate() ?? new Date(),
  updatedAt: (data.updatedAt as Timestamp)?.toDate() ?? new Date(),
});

const MOCK_PRODUCTS: Product[] = [
  { id: 'mock-1', name: 'Premium Marine Plywood 18mm', slug: 'premium-marine-plywood-18mm', sku: 'PLY-MAR-18', category: 'plywood', subcategory: 'marine', price: 25000, gauge: '18mm', grade: 'Marine', stockQty: 500, reorderLevel: 50, status: 'active', imageUrls: ['/images/catalog_wood_boards.png'], createdAt: new Date(), updatedAt: new Date() },
  { id: 'mock-2', name: 'Standard MDF Board 12mm', slug: 'standard-mdf-board-12mm', sku: 'MDF-STD-12', category: 'mdf', subcategory: 'standard', price: 12000, gauge: '12mm', grade: 'Standard', stockQty: 1200, reorderLevel: 100, status: 'active', imageUrls: ['/images/catalog_wood_boards.png'], createdAt: new Date(), updatedAt: new Date() },
  { id: 'mock-3', name: 'Commercial Blockboard 15mm', slug: 'commercial-blockboard-15mm', sku: 'BLK-COM-15', category: 'blockboard', subcategory: 'commercial', price: 18500, gauge: '15mm', grade: 'Commercial', stockQty: 300, reorderLevel: 50, status: 'active', imageUrls: ['/images/catalog_wood_boards.png'], createdAt: new Date(), updatedAt: new Date() },
  { id: 'mock-4', name: 'Moisture Resistant HDF 9mm', slug: 'mr-hdf-9mm', sku: 'HDF-MR-09', category: 'hdf', subcategory: 'moisture resistant', price: 15000, gauge: '9mm', grade: 'Premium', stockQty: 800, reorderLevel: 100, status: 'active', imageUrls: ['/images/catalog_wood_boards.png'], createdAt: new Date(), updatedAt: new Date() }
];

let allProductsCache: Product[] | null = null;
let productsCacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function invalidateProductsCache() {
  allProductsCache = null;
  productsCacheTime = 0;
}

// ── Products ──────────────────────────────────────────────
export async function getProducts(filters?: {
  category?: string;
  gauge?: string;
  grade?: string;
  searchQuery?: string;
  pageLimit?: number;
}): Promise<Product[]> {
  let baseProducts: Product[];

  // Use memory cache if available and fresh
  if (allProductsCache && Date.now() - productsCacheTime < CACHE_TTL) {
    baseProducts = allProductsCache;
  } else {
    const q = query(collection(db, 'products'), where('status', '==', 'active'), orderBy('name'));
    const snap = await getDocs(q);
    baseProducts = snap.docs.map((d) => toProduct(d.id, d.data() as Record<string, unknown>));

    if (baseProducts.length === 0) {
      baseProducts = MOCK_PRODUCTS;
    }

    allProductsCache = baseProducts;
    productsCacheTime = Date.now();
  }

  // Apply filters locally to eliminate network latency
  let result = baseProducts;

  if (filters?.category) result = result.filter(p => p.category === filters.category);
  if (filters?.gauge) result = result.filter(p => p.gauge === filters.gauge);
  if (filters?.grade) result = result.filter(p => p.grade === filters.grade);

  if (filters?.searchQuery) {
    const sq = filters.searchQuery.toLowerCase();
    result = result.filter((p) =>
      p.name.toLowerCase().includes(sq) || p.sku.toLowerCase().includes(sq) || p.subcategory.toLowerCase().includes(sq)
    );
  }

  if (filters?.pageLimit) {
    result = result.slice(0, filters.pageLimit);
  }

  return result;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const q = query(collection(db, 'products'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return toProduct(d.id, d.data() as Record<string, unknown>);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<void> {
  await updateDoc(doc(db, 'products', id), { ...data, updatedAt: serverTimestamp() });
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'products'), {
    ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  return ref.id;
}

// ── Quotes ────────────────────────────────────────────────
export async function createQuote(quote: Omit<Quote, 'id' | 'createdAt'>): Promise<string> {
  const ref = await addDoc(collection(db, 'quotes'), {
    ...quote, status: 'pending', createdAt: serverTimestamp(),
  });
  return ref.id;
}

export async function getQuotes(): Promise<Quote[]> {
  const snap = await getDocs(query(collection(db, 'quotes'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({
    ...(d.data() as Omit<Quote, 'id'>),
    id: d.id,
    createdAt: (d.data().createdAt as Timestamp)?.toDate(),
  }));
}

export async function updateQuoteStatus(id: string, status: Quote['status']): Promise<void> {
  await updateDoc(doc(db, 'quotes', id), { status });
}

// ── Inventory ─────────────────────────────────────────────
export async function updateInventory(productId: string, delta: number, adminUid: string): Promise<void> {
  const productRef = doc(db, 'products', productId);
  const snap = await getDoc(productRef);
  if (!snap.exists()) throw new Error('Product not found');
  const current = snap.data().stockQty as number;
  await updateDoc(productRef, { stockQty: current + delta, updatedAt: serverTimestamp() });
  await addDoc(collection(db, 'inventoryLogs'), {
    productId, delta, newQty: current + delta, adminUid, timestamp: serverTimestamp(),
  });
}
