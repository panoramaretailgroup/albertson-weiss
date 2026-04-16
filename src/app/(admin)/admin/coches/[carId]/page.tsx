"use client";

import AdminShell from "@/components/admin/AdminShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import TagInput from "@/components/admin/TagInput";
import { ROUTES, CAR_STATUSES } from "@/lib/constants";
// formatDate available for future use
import type { CarStatus, LogisticsPhase } from "@/lib/types";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// Real vehicle data
const initialCar = {
  id: "jeep-wrangler-2025", brand: "Jeep", model: "Wrangler Rubicon", year: "2025",
  vin: "1C4PJXFG2SW566069", engine: "3.6L Pentastar V6", mileage_km: "13802",
  color: "Black",
  equipment: ["Tracción 4x4 Rock-Trac", "Techo removible Freedom Top", "Uconnect 12.3\"", "Apple CarPlay", "LED headlights", "Asientos calefactados cuero", "BFGoodrich KO2", "Dana 44 HD Axles"],
  purchase_price_usd: "", target_sale_price_eur: "",
  investment_needed_eur: "47000", estimated_return_pct: "25", estimated_duration_days: "90",
  shipping_container: "MEDU9510693", shipping_carrier: "MSC",
  shipping_route: "Oakland, US → Rodman, PA → Rotterdam, NL", shipping_eta: "2026-05-15",
  status: "in_transit" as CarStatus,
};

const initialPhases: LogisticsPhase[] = [
  { phase: 1, name: "Comprado en subasta", completed: true, date: "2026-03-09", photos: [] },
  { phase: 2, name: "En tránsito a almacén USA", completed: true, date: "2026-03-10", photos: [] },
  { phase: 3, name: "En almacén USA", completed: true, date: "2026-03-11", photos: [] },
  { phase: 4, name: "Contenedor cargado", completed: true, date: "2026-04-04", photos: [] },
  { phase: 5, name: "En tránsito marítimo", completed: false, date: null, photos: [] },
  { phase: 6, name: "Descargado en puerto Europa", completed: false, date: null, photos: [] },
  { phase: 7, name: "Listo para entrega", completed: false, date: null, photos: [] },
];

const statusFlow: CarStatus[] = ["open", "funded", "in_transit", "sold", "completed"];

const statusBadgeColor: Record<CarStatus, "gold" | "green" | "blue" | "gray" | "red"> = {
  open: "gold", funded: "blue", in_transit: "blue", sold: "green", completed: "green",
};

export default function AdminCarDetailPage({
  params: _params,
}: {
  params: { carId: string };
}) {
  const [form, setForm] = useState(initialCar);
  const [phases, setPhases] = useState(initialPhases);
  const [status, setStatus] = useState(initialCar.status);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  // Update form
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updatePhase, setUpdatePhase] = useState("");
  const [publishingUpdate, setPublishingUpdate] = useState(false);

  // Complete form
  const [salePrice, setSalePrice] = useState("");
  const [completing, setCompleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const togglePhase = (phaseNum: number) => {
    setPhases((prev) =>
      prev.map((p) => {
        if (p.phase === phaseNum) {
          return {
            ...p,
            completed: !p.completed,
            date: !p.completed ? new Date().toISOString().split("T")[0] : null,
          };
        }
        return p;
      })
    );
  };

  const setPhaseDate = (phaseNum: number, date: string) => {
    setPhases((prev) =>
      prev.map((p) => (p.phase === phaseNum ? { ...p, date } : p))
    );
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(null);
    // TODO: Update car in Supabase
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setSuccess("Cambios guardados correctamente.");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleStatusChange = async (newStatus: CarStatus) => {
    if (newStatus === "completed") return; // Use the special flow
    // TODO: Update status in Supabase + notify investors
    setStatus(newStatus);
    setSuccess(`Estado cambiado a "${CAR_STATUSES[newStatus]}".`);
    setTimeout(() => setSuccess(null), 3000);
  };

  const handlePublishUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPublishingUpdate(true);
    // TODO: Create car_update + notifications in Supabase
    await new Promise((r) => setTimeout(r, 1000));
    setPublishingUpdate(false);
    setUpdateTitle("");
    setUpdateDesc("");
    setUpdatePhase("");
    setSuccess("Actualización publicada y notificaciones enviadas.");
    setTimeout(() => setSuccess(null), 3000);
  };

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompleting(true);
    // TODO: Mark car as completed
    // TODO: Calculate actual returns for each investor
    // TODO: Update investments status + actual_return_eur
    // TODO: Send notifications
    await new Promise((r) => setTimeout(r, 1500));
    setCompleting(false);
    setStatus("completed");
    setSuccess("Operación completada. Retornos calculados y notificaciones enviadas.");
    setTimeout(() => setSuccess(null), 5000);
  };

  const currentPhase = phases.filter((p) => p.completed).length + 1;
  const currentStatusIdx = statusFlow.indexOf(status);

  return (
    <AdminShell breadcrumb={`${form.brand} ${form.model}`}>
      <Link href={ROUTES.adminCoches} className="mb-4 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 transition-colors">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        Volver a coches
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {form.brand} {form.model} {form.year}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge color={statusBadgeColor[status]}>{CAR_STATUSES[status]}</Badge>
            <span className="text-sm text-gray-500">Fase {currentPhase > 7 ? 7 : currentPhase}/7</span>
          </div>
        </div>
        <Button variant="primary" loading={saving} onClick={handleSave}>Guardar cambios</Button>
      </div>

      {success && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-green/30 bg-green/5 px-4 py-3 text-sm text-green">
          <CheckCircle className="h-4 w-4 shrink-0" />
          {success}
        </div>
      )}

      <div className="space-y-8 max-w-4xl">
        {/* Basic info */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Información básica</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Marca" type="text" variant="light" value={form.brand} onChange={(e) => updateField("brand", (e.target as HTMLInputElement).value)} />
            <Input label="Modelo" type="text" variant="light" value={form.model} onChange={(e) => updateField("model", (e.target as HTMLInputElement).value)} />
            <Input label="Año" type="number" variant="light" value={form.year} onChange={(e) => updateField("year", (e.target as HTMLInputElement).value)} />
            <Input label="VIN" type="text" variant="light" value={form.vin} onChange={(e) => updateField("vin", (e.target as HTMLInputElement).value)} />
            <Input label="Motor" type="text" variant="light" value={form.engine} onChange={(e) => updateField("engine", (e.target as HTMLInputElement).value)} />
            <Input label="Kilometraje (km)" type="number" variant="light" value={form.mileage_km} onChange={(e) => updateField("mileage_km", (e.target as HTMLInputElement).value)} />
            <Input label="Color" type="text" variant="light" value={form.color} onChange={(e) => updateField("color", (e.target as HTMLInputElement).value)} />
          </div>
          <div className="mt-4">
            <TagInput label="Equipamiento" value={form.equipment} onChange={(tags) => setForm((prev) => ({ ...prev, equipment: tags }))} />
          </div>
        </section>

        {/* Financial */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Datos financieros</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Precio compra (USD)" type="number" variant="light" value={form.purchase_price_usd} onChange={(e) => updateField("purchase_price_usd", (e.target as HTMLInputElement).value)} />
            <Input label="Precio objetivo venta (EUR)" type="number" variant="light" value={form.target_sale_price_eur} onChange={(e) => updateField("target_sale_price_eur", (e.target as HTMLInputElement).value)} />
            <Input label="Inversión necesaria (EUR)" type="number" variant="light" value={form.investment_needed_eur} onChange={(e) => updateField("investment_needed_eur", (e.target as HTMLInputElement).value)} />
            <Input label="Rentabilidad estimada (%)" type="number" variant="light" value={form.estimated_return_pct} onChange={(e) => updateField("estimated_return_pct", (e.target as HTMLInputElement).value)} />
            <Input label="Duración estimada (días)" type="number" variant="light" value={form.estimated_duration_days} onChange={(e) => updateField("estimated_duration_days", (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        {/* Logistics phases */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Gestión de fases logísticas</h2>
          <div className="space-y-3">
            {phases.map((phase) => (
              <div key={phase.phase} className="flex items-center gap-4 rounded-lg border border-gray-100 p-4 hover:bg-gray-50 transition-colors">
                <button
                  type="button"
                  onClick={() => togglePhase(phase.phase)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    phase.completed
                      ? "border-green bg-green text-white"
                      : "border-gray-300 text-gray-300 hover:border-gold"
                  }`}
                  aria-label={`Marcar fase ${phase.phase} como ${phase.completed ? "pendiente" : "completada"}`}
                >
                  {phase.completed && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-gray-400">Fase {phase.phase}</span>
                    <span className={`text-sm font-medium ${phase.completed ? "text-gray-900" : "text-gray-500"}`}>
                      {phase.name}
                    </span>
                  </div>
                </div>

                <input
                  type="date"
                  value={phase.date ?? ""}
                  onChange={(e) => setPhaseDate(phase.phase, e.target.value)}
                  className="rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/30"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-md border border-gray-200 p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
                  aria-label={`Subir fotos fase ${phase.phase}`}
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" />
        </section>

        {/* Publish update */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Publicar actualización</h2>
          <form onSubmit={handlePublishUpdate} className="space-y-4">
            <Input
              label="Título"
              type="text"
              variant="light"
              required
              placeholder="Ej: Vehículo cargado en contenedor"
              value={updateTitle}
              onChange={(e) => setUpdateTitle((e.target as HTMLInputElement).value)}
            />
            <Input
              label="Descripción"
              type="textarea"
              variant="light"
              placeholder="Detalles de la actualización..."
              value={updateDesc}
              onChange={(e) => setUpdateDesc((e.target as HTMLTextAreaElement).value)}
            />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Fase relacionada</label>
              <select
                value={updatePhase}
                onChange={(e) => setUpdatePhase(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30"
              >
                <option value="">Sin fase específica</option>
                {phases.map((p) => (
                  <option key={p.phase} value={p.phase}>Fase {p.phase}: {p.name}</option>
                ))}
              </select>
            </div>
            <Button type="submit" variant="primary" size="sm" loading={publishingUpdate}>
              Publicar y notificar inversores
            </Button>
          </form>
        </section>

        {/* Shipping */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Datos de envío</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Contenedor" type="text" variant="light" value={form.shipping_container} onChange={(e) => updateField("shipping_container", (e.target as HTMLInputElement).value)} />
            <Input label="Naviera" type="text" variant="light" value={form.shipping_carrier} onChange={(e) => updateField("shipping_carrier", (e.target as HTMLInputElement).value)} />
            <Input label="Ruta" type="text" variant="light" value={form.shipping_route} onChange={(e) => updateField("shipping_route", (e.target as HTMLInputElement).value)} />
            <Input label="ETA" type="text" variant="light" value={form.shipping_eta} onChange={(e) => updateField("shipping_eta", (e.target as HTMLInputElement).value)} />
          </div>
        </section>

        {/* Change status */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Cambiar estado</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {statusFlow.map((s, idx) => {
              const isCurrent = s === status;
              const isPast = idx < currentStatusIdx;
              const isNext = idx === currentStatusIdx + 1;

              return (
                <button
                  key={s}
                  type="button"
                  disabled={!isNext || s === "completed"}
                  onClick={() => isNext && s !== "completed" && handleStatusChange(s)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isCurrent
                      ? "bg-gray-900 text-white"
                      : isPast
                        ? "bg-gray-100 text-gray-500"
                        : isNext && s !== "completed"
                          ? "border border-gold bg-gold/5 text-gold hover:bg-gold/10 cursor-pointer"
                          : "border border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {CAR_STATUSES[s]}
                </button>
              );
            })}
          </div>

          {/* Complete operation */}
          {status === "sold" && (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold text-gray-900">Completar operación</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Al completar, se calcularán los retornos reales para cada inversor y se les notificará.
              </p>
              <form onSubmit={handleComplete} className="space-y-4">
                <Input
                  label="Precio real de venta (EUR)"
                  type="number"
                  variant="light"
                  required
                  placeholder="Ej: 58000"
                  value={salePrice}
                  onChange={(e) => setSalePrice((e.target as HTMLInputElement).value)}
                  helperText="Se usará para calcular el retorno real de cada inversor"
                />
                <Button type="submit" variant="primary" size="sm" loading={completing}>
                  Completar operación y liquidar retornos
                </Button>
              </form>
            </div>
          )}

          {status !== "sold" && status !== "completed" && (
            <p className="text-sm text-gray-400">
              Avanza al estado &quot;Vendido&quot; para poder completar la operación y liquidar retornos.
            </p>
          )}

          {status === "completed" && (
            <div className="flex items-center gap-2 rounded-lg border border-green/30 bg-green/5 px-4 py-3 text-sm text-green">
              <CheckCircle className="h-4 w-4" />
              Operación completada. Los retornos han sido liquidados.
            </div>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
