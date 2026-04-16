"use client";

import AdminShell from "@/components/admin/AdminShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import TagInput from "@/components/admin/TagInput";
import { ROUTES } from "@/lib/constants";
import { Upload } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

interface CarForm {
  brand: string;
  model: string;
  year: string;
  vin: string;
  engine: string;
  mileage_km: string;
  color: string;
  equipment: string[];
  purchase_price_usd: string;
  target_sale_price_eur: string;
  investment_needed_eur: string;
  estimated_return_pct: string;
  estimated_duration_days: string;
  shipping_container: string;
  shipping_carrier: string;
  shipping_route: string;
  shipping_eta: string;
}

const defaultForm: CarForm = {
  brand: "", model: "", year: "", vin: "", engine: "", mileage_km: "", color: "",
  equipment: [],
  purchase_price_usd: "", target_sale_price_eur: "", investment_needed_eur: "",
  estimated_return_pct: "25", estimated_duration_days: "90",
  shipping_container: "", shipping_carrier: "", shipping_route: "", shipping_eta: "",
};

type PhotoCategory = "exterior" | "interior" | "detail";

interface PhotoUpload {
  file: File;
  preview: string;
  category: PhotoCategory;
}

export default function AdminNuevoCochePage() {
  const router = useRouter();
  const [form, setForm] = useState<CarForm>(defaultForm);
  const [photos, setPhotos] = useState<PhotoUpload[]>([]);
  const [thumbnailIdx, setThumbnailIdx] = useState<number | null>(null);
  const [activePhotoTab, setActivePhotoTab] = useState<PhotoCategory>("exterior");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof CarForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handlePhotos = (files: FileList | null, category: PhotoCategory) => {
    if (!files) return;
    const newPhotos: PhotoUpload[] = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      category,
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    if (thumbnailIdx === index) setThumbnailIdx(null);
    if (thumbnailIdx !== null && thumbnailIdx > index) setThumbnailIdx(thumbnailIdx - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // TODO: Upload photos to Supabase Storage
    // TODO: Create car record in Supabase
    await new Promise((r) => setTimeout(r, 1500));
    setSaving(false);
    router.push(ROUTES.adminCoches);
  };

  const categoryPhotos = photos.filter((p) => p.category === activePhotoTab);

  return (
    <AdminShell breadcrumb="Nuevo coche">
      <Link href={ROUTES.adminCoches} className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Volver a coches
      </Link>

      <h1 className="text-2xl font-semibold text-gray-900 mb-8">Añadir nuevo coche</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Section 1: Basic info */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Información básica</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Marca" type="text" variant="light" required placeholder="Ej: Jeep" value={form.brand} onChange={(e) => updateField("brand", (e.target as HTMLInputElement).value)} />
            <Input label="Modelo" type="text" variant="light" required placeholder="Ej: Wrangler Rubicon" value={form.model} onChange={(e) => updateField("model", (e.target as HTMLInputElement).value)} />
            <Input label="Año" type="number" variant="light" required placeholder="2023" value={form.year} onChange={(e) => updateField("year", (e.target as HTMLInputElement).value)} />
            <Input label="VIN" type="text" variant="light" placeholder="1C4HJXFG5PW123456" value={form.vin} onChange={(e) => updateField("vin", (e.target as HTMLInputElement).value)} />
            <Input label="Motor" type="text" variant="light" placeholder="3.6L V6" value={form.engine} onChange={(e) => updateField("engine", (e.target as HTMLInputElement).value)} />
            <Input label="Kilometraje (km)" type="number" variant="light" placeholder="12000" value={form.mileage_km} onChange={(e) => updateField("mileage_km", (e.target as HTMLInputElement).value)} />
            <Input label="Color" type="text" variant="light" placeholder="Negro" value={form.color} onChange={(e) => updateField("color", (e.target as HTMLInputElement).value)} />
          </div>
          <div className="mt-4">
            <TagInput label="Equipamiento" value={form.equipment} onChange={(tags) => setForm((prev) => ({ ...prev, equipment: tags }))} placeholder="Escribe y pulsa Enter para añadir" />
          </div>
        </section>

        {/* Section 2: Financial */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Datos financieros</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Precio de compra (USD)" type="number" variant="light" placeholder="28000" value={form.purchase_price_usd} onChange={(e) => updateField("purchase_price_usd", (e.target as HTMLInputElement).value)} />
            <Input label="Precio objetivo venta (EUR)" type="number" variant="light" placeholder="58000" value={form.target_sale_price_eur} onChange={(e) => updateField("target_sale_price_eur", (e.target as HTMLInputElement).value)} />
            <Input label="Inversión necesaria (EUR)" type="number" variant="light" required placeholder="45000" value={form.investment_needed_eur} onChange={(e) => updateField("investment_needed_eur", (e.target as HTMLInputElement).value)} helperText="Lo que verán los inversores" />
            <Input label="Rentabilidad estimada (%)" type="number" variant="light" placeholder="25" value={form.estimated_return_pct} onChange={(e) => updateField("estimated_return_pct", (e.target as HTMLInputElement).value)} />
            <Input label="Duración estimada (días)" type="number" variant="light" placeholder="90" value={form.estimated_duration_days} onChange={(e) => updateField("estimated_duration_days", (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        {/* Section 3: Photos */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Fotos de showcase</h2>

          <div className="flex gap-2 mb-4">
            {(["exterior", "interior", "detail"] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActivePhotoTab(cat)}
                className={
                  activePhotoTab === cat
                    ? "rounded-full bg-gray-900 px-3.5 py-1.5 text-xs font-medium text-white"
                    : "rounded-full border border-gray-200 px-3.5 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition-colors"
                }
              >
                {cat === "exterior" ? "Exterior" : cat === "interior" ? "Interior" : "Detalles"}
              </button>
            ))}
          </div>

          {/* Upload area */}
          <div
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 p-8 text-center hover:border-gold/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handlePhotos(e.dataTransfer.files, activePhotoTab); }}
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-600">Arrastra imágenes o haz click para seleccionar</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG hasta 10MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handlePhotos(e.target.files, activePhotoTab)}
            />
          </div>

          {/* Photo grid */}
          {categoryPhotos.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {photos.map((photo, index) => {
                if (photo.category !== activePhotoTab) return null;
                const isThumbnail = thumbnailIdx === index;
                return (
                  <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border border-gray-200">
{/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.preview} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button type="button" onClick={() => setThumbnailIdx(index)} className={`rounded-md px-2 py-1 text-[10px] font-medium ${isThumbnail ? "bg-gold text-black" : "bg-white/80 text-gray-700 hover:bg-white"}`}>
                        {isThumbnail ? "Principal" : "Hacer principal"}
                      </button>
                      <button type="button" onClick={() => removePhoto(index)} className="rounded-md bg-red-500 px-2 py-1 text-[10px] font-medium text-white">
                        Eliminar
                      </button>
                    </div>
                    {isThumbnail && (
                      <span className="absolute left-1 top-1 rounded bg-gold px-1.5 py-0.5 text-[9px] font-bold text-black">PRINCIPAL</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Section 4: Shipping (optional) */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Información de envío</h2>
          <p className="text-sm text-gray-500 mb-6">Opcional. Se puede completar después.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Contenedor" type="text" variant="light" placeholder="MEDU9510693" value={form.shipping_container} onChange={(e) => updateField("shipping_container", (e.target as HTMLInputElement).value)} />
            <Input label="Naviera" type="text" variant="light" placeholder="MSC" value={form.shipping_carrier} onChange={(e) => updateField("shipping_carrier", (e.target as HTMLInputElement).value)} />
            <Input label="Ruta" type="text" variant="light" placeholder="Oakland → Rotterdam" value={form.shipping_route} onChange={(e) => updateField("shipping_route", (e.target as HTMLInputElement).value)} />
            <Input label="ETA" type="text" variant="light" placeholder="2024-03-15" value={form.shipping_eta} onChange={(e) => updateField("shipping_eta", (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <Button type="submit" variant="primary" size="lg" loading={saving}>
            Publicar vehículo
          </Button>
          <Link href={ROUTES.adminCoches} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
            Cancelar
          </Link>
        </div>
      </form>
    </AdminShell>
  );
}
