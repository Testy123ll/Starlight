export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: 'mdf' | 'hdf' | 'blockboard' | 'plywood';
  subcategory: string;
  price: number;
  gauge?: string;
  grade?: string;
  dimensions?: string;
  stockQty: number;
  reorderLevel: number;
  status: 'active' | 'inactive';
  imageUrls: string[];
  specSheetUrl?: string;
  description?: string;
  specs?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';

export function getStockStatus(product: Product): StockStatus {
  if (product.stockQty === 0) return 'out-of-stock';
  if (product.stockQty <= product.reorderLevel) return 'low-stock';
  return 'in-stock';
}

export interface Quote {
  id?: string;
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    company?: string;
    state: string;
  };
  items: {
    productId: string;
    name: string;
    sku: string;
    qty: number;
    unitPrice: number;
    specs: string;
  }[];
  deliveryInfo: {
    address: string;
    city: string;
    state: string;
    notes?: string;
  };
  subtotal: number;
  vatAmount: number;
  total: number;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  createdAt?: Date;
}
