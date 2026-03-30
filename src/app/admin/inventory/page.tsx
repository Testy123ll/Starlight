'use client';

import { useEffect, useState, useRef } from 'react';
import { getProducts, updateProduct, updateInventory } from '@/lib/firestore';
import { Product, getStockStatus } from '@/lib/types';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { useAuthStore } from '@/store/stores';

function StockCell({ product }: { product: Product }) {
  const status = getStockStatus(product);
  const cls = status === 'in-stock' ? 'stock-in' : status === 'low-stock' ? 'stock-low' : 'stock-out';
  return <span className={cls}>{product.stockQty}</span>;
}

interface EditingCell { id: string; field: 'price' | 'stockQty' | 'reorderLevel'; value: string; }

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EditingCell | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();

  const load = () => {
    setLoading(true);
    getProducts({ pageLimit: 100 }).then(setProducts).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = search
    ? products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()))
    : products;

  const handleSaveEdit = async () => {
    if (!editing) return;
    setSaving(editing.id);
    const val = parseFloat(editing.value);
    if (!isNaN(val)) {
      if (editing.field === 'stockQty') {
        const current = products.find((p) => p.id === editing.id)?.stockQty ?? 0;
        await updateInventory(editing.id, val - current, user?.uid ?? 'admin');
      } else {
        await updateProduct(editing.id, { [editing.field]: val });
      }
      await load();
    }
    setEditing(null);
    setSaving(null);
  };

  const handleImageUpload = async (productId: string, file: File) => {
    setUploadingId(productId);
    const storageRef = ref(storage, `products/${productId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    await updateProduct(productId, { imageUrls: [...(products.find((p) => p.id === productId)?.imageUrls ?? []), url] });
    await load();
    setUploadingId(null);
  };

  const handleToggleStatus = async (product: Product) => {
    await updateProduct(product.id, { status: product.status === 'active' ? 'inactive' : 'active' });
    load();
  };

  return (
    <div className="p-6 max-w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white">Inventory Manager</h1>
          <p className="text-sm text-muted-gold mt-1">{filtered.length} products</p>
        </div>
        <div className="flex gap-3">
          <input type="text" placeholder="Search SKU or name..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-dark w-56" />
          <a href="/admin/products/new" className="btn-amber text-sm py-2 px-4">+ Add Product</a>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(8)].map((_, i) => <div key={i} className="h-12 bg-steel-surface rounded animate-pulse" />)}
        </div>
      ) : (
        <div className="overflow-x-auto rounded border border-steel-highest/30">
          <table className="admin-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price (₦)</th>
                <th>Stock Qty</th>
                <th>Reorder At</th>
                <th>Status</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className={p.status === 'inactive' ? 'opacity-50' : ''}>
                  <td className="font-mono text-xs text-muted-gold">{p.sku}</td>
                  <td className="font-medium text-white max-w-xs truncate">{p.name}</td>
                  <td><span className="spec-badge capitalize">{p.category}</span></td>

                  {/* Editable: Price */}
                  <td onDoubleClick={() => setEditing({ id: p.id, field: 'price', value: String(p.price) })}>
                    {editing?.id === p.id && editing.field === 'price' ? (
                      <input autoFocus type="number" value={editing.value}
                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                        onBlur={handleSaveEdit} onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="input-dark w-28 py-1 text-xs" />
                    ) : (
                      <span className={`text-amber font-semibold cursor-pointer hover:underline ${saving === p.id ? 'opacity-50' : ''}`}>
                        {p.price.toLocaleString('en-NG')}
                      </span>
                    )}
                  </td>

                  {/* Editable: Stock */}
                  <td onDoubleClick={() => setEditing({ id: p.id, field: 'stockQty', value: String(p.stockQty) })}>
                    {editing?.id === p.id && editing.field === 'stockQty' ? (
                      <input autoFocus type="number" value={editing.value}
                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                        onBlur={handleSaveEdit} onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="input-dark w-20 py-1 text-xs" />
                    ) : (
                      <StockCell product={p} />
                    )}
                  </td>

                  {/* Editable: Reorder Level */}
                  <td onDoubleClick={() => setEditing({ id: p.id, field: 'reorderLevel', value: String(p.reorderLevel) })}>
                    {editing?.id === p.id && editing.field === 'reorderLevel' ? (
                      <input autoFocus type="number" value={editing.value}
                        onChange={(e) => setEditing({ ...editing, value: e.target.value })}
                        onBlur={handleSaveEdit} onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
                        className="input-dark w-20 py-1 text-xs" />
                    ) : (
                      <span className="text-muted-gold text-xs cursor-pointer hover:text-white">{p.reorderLevel}</span>
                    )}
                  </td>

                  <td>
                    <button onClick={() => handleToggleStatus(p)}
                      className={`text-xs font-semibold px-2 py-1 rounded border transition-colors ${p.status === 'active' ? 'border-success-green text-success-green hover:bg-success-green hover:text-white' : 'border-muted-gold text-muted-gold hover:bg-muted-gold hover:text-steel-dark'}`}>
                      {p.status}
                    </button>
                  </td>

                  <td>
                    <div className="flex items-center gap-2">
                      {p.imageUrls[0] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.imageUrls[0]} alt="" className="w-8 h-8 rounded object-cover" />
                      )}
                      <label className={`cursor-pointer text-xs text-amber hover:underline ${uploadingId === p.id ? 'opacity-50 pointer-events-none' : ''}`}>
                        {uploadingId === p.id ? '↑ Uploading...' : '+ Upload'}
                        <input ref={fileRef} type="file" accept="image/*" className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleImageUpload(p.id, e.target.files[0])} />
                      </label>
                    </div>
                  </td>

                  <td>
                    <a href={`/admin/products/${p.id}`} className="text-xs text-steel-blue hover:text-amber transition-colors">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-xs text-muted-gold/60 mt-4">💡 Double-click any Price, Stock, or Reorder Level cell to edit inline.</p>
    </div>
  );
}
