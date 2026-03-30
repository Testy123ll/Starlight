'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct, invalidateProductsCache } from '@/lib/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

const CATEGORIES = ['mdf', 'hdf', 'blockboard', 'plywood'] as const;
const THICKNESSES = ['3mm', '6mm', '9mm', '12mm', '15mm', '18mm', '25mm'];
const GRADES = ['Commercial', 'Standard', 'Premium', 'Marine'];

type FormState = {
  name: string;
  sku: string;
  category: typeof CATEGORIES[number];
  subcategory: string;
  price: string;
  gauge: string;
  grade: string;
  dimensions: string;
  stockQty: string;
  reorderLevel: string;
  description: string;
  specSheetUrl: string;
};

export default function AddProductPage() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>({
    name: '', sku: '', category: 'mdf', subcategory: '',
    price: '', gauge: '', grade: '', dimensions: '',
    stockQty: '', reorderLevel: '50', description: '', specSheetUrl: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.sku || !form.price || !form.stockQty) {
      setError('Please fill in all required fields (Name, SKU, Price, Stock Qty).');
      return;
    }
    setSaving(true);
    try {
      let imageUrls: string[] = [];
      if (imageFile) {
        const tempId = `temp-${Date.now()}`;
        const storageRef = ref(storage, `products/${tempId}/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const url = await getDownloadURL(storageRef);
        imageUrls = [url];
      }

      const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      await createProduct({
        name: form.name.trim(),
        slug,
        sku: form.sku.trim().toUpperCase(),
        category: form.category,
        subcategory: form.subcategory.trim(),
        price: parseFloat(form.price),
        gauge: form.gauge || undefined,
        grade: form.grade || undefined,
        dimensions: form.dimensions.trim() || undefined,
        stockQty: parseInt(form.stockQty),
        reorderLevel: parseInt(form.reorderLevel) || 50,
        description: form.description.trim() || undefined,
        specSheetUrl: form.specSheetUrl.trim() || undefined,
        status: 'active',
        imageUrls,
      });

      invalidateProductsCache();
      setSuccess(true);
      setTimeout(() => router.push('/admin/inventory'), 1500);
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const inputCls = 'w-full bg-steel-surface border border-steel-highest/40 rounded-lg px-3 py-2 text-sm text-white placeholder-muted-gold/50 focus:outline-none focus:border-amber/60 transition-colors';
  const labelCls = 'block text-xs font-semibold text-muted-gold uppercase tracking-wider mb-1.5';

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Add New Product</h1>
        <p className="text-sm text-muted-gold mt-1">Create a new product listing in the catalog</p>
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-lg border border-success-green/40 bg-success-green/10 text-success-green text-sm font-semibold">
          ✓ Product created successfully! Redirecting to inventory...
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 rounded-lg border border-rust/40 bg-rust/10 text-rust text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="card-dark rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-steel-highest/30 pb-3">Basic Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Product Name *</label>
              <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)}
                placeholder="e.g. Premium Marine Plywood 18mm" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>SKU *</label>
              <input type="text" value={form.sku} onChange={(e) => set('sku', e.target.value)}
                placeholder="e.g. PLY-MAR-18" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Subcategory</label>
              <input type="text" value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)}
                placeholder="e.g. marine, moisture resistant" className={inputCls} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>Description</label>
              <textarea value={form.description} onChange={(e) => set('description', e.target.value)}
                rows={3} placeholder="Brief product description..." className={inputCls} style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="card-dark rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-steel-highest/30 pb-3">Classification & Specs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category *</label>
              <select value={form.category} onChange={(e) => set('category', e.target.value as typeof CATEGORIES[number])}
                className={inputCls}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Thickness</label>
              <select value={form.gauge} onChange={(e) => set('gauge', e.target.value)} className={inputCls}>
                <option value="">— Select —</option>
                {THICKNESSES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Grade</label>
              <select value={form.grade} onChange={(e) => set('grade', e.target.value)} className={inputCls}>
                <option value="">— Select —</option>
                {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Dimensions</label>
              <input type="text" value={form.dimensions} onChange={(e) => set('dimensions', e.target.value)}
                placeholder="e.g. 1220 × 2440mm" className={inputCls} />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="card-dark rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-steel-highest/30 pb-3">Pricing & Inventory</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Price (₦) *</label>
              <input type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)}
                placeholder="e.g. 25000" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Stock Quantity *</label>
              <input type="number" min="0" value={form.stockQty} onChange={(e) => set('stockQty', e.target.value)}
                placeholder="e.g. 500" className={inputCls} required />
            </div>
            <div>
              <label className={labelCls}>Reorder Level</label>
              <input type="number" min="0" value={form.reorderLevel} onChange={(e) => set('reorderLevel', e.target.value)}
                placeholder="e.g. 50" className={inputCls} />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="card-dark rounded-xl p-6">
          <h2 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-steel-highest/30 pb-3">Product Image</h2>
          <div
            className="border-2 border-dashed border-steel-highest/50 rounded-xl p-8 text-center cursor-pointer hover:border-amber/40 transition-colors"
            onClick={() => fileRef.current?.click()}
          >
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain" />
            ) : (
              <>
                <div className="text-4xl mb-3">🖼️</div>
                <p className="text-sm text-muted-gold">Click to upload a product image</p>
                <p className="text-xs text-muted-gold/50 mt-1">PNG, JPG up to 10MB</p>
              </>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </div>
          {imageFile && (
            <p className="text-xs text-amber mt-2">✓ {imageFile.name} selected</p>
          )}

          <div className="mt-4">
            <label className={labelCls}>Spec Sheet URL (optional)</label>
            <input type="url" value={form.specSheetUrl} onChange={(e) => set('specSheetUrl', e.target.value)}
              placeholder="https://storage.firebase.com/..." className={inputCls} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pb-6">
          <button type="button" onClick={() => router.push('/admin/inventory')}
            className="btn-ghost text-sm px-5 py-2.5">
            Cancel
          </button>
          <button type="submit" disabled={saving || success}
            className="btn-amber text-sm px-6 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center">
            {saving ? 'Creating...' : '+ Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
