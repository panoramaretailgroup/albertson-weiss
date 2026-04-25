"use client";

import PanelShell from "@/components/panel/PanelShell";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { Download, FileText, ExternalLink } from "lucide-react";
import { useState } from "react";

interface ContractDoc {
  id: string;
  name: string;
  date: string;
  url: string;
}

const documents: ContractDoc[] = [
  {
    id: "c1",
    name: "Contrato Jeep Wrangler Rubicon 2025",
    date: "08/03/2026",
    url: "#",
  },
  {
    id: "c2",
    name: "Contrato Ford Mustang GT 2022",
    date: "02/04/2026",
    url: "#",
  },
];

export default function PerfilPage() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName:
      (user?.user_metadata?.full_name as string | undefined) || "Carlos GarcÃ­a",
    email: user?.email || "carlos@example.com",
    phone:
      (user?.user_metadata?.phone as string | undefined) || "+34 600 000 000",
  });

  const [pwForm, setPwForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });
  const [pwError, setPwError] = useState<string | null>(null);
  const [changingPw, setChangingPw] = useState(false);

  const [prefs, setPrefs] = useState({
    emailUpdates: true,
    emailMilestones: true,
    emailReturns: true,
    emailMarketing: false,
  });

  const handleSave = async () => {
    setSaving(true);
    setSuccess(null);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setEditing(false);
    setSuccess("Perfil actualizado correctamente.");
    setTimeout(() => setSuccess(null), 4000);
  };

  const handleChangePw = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError(null);
    if (pwForm.next !== pwForm.confirm) {
      setPwError("Las contraseÃ±as no coinciden.");
      return;
    }
    if (pwForm.next.length < 8) {
      setPwError("MÃ­nimo 8 caracteres.");
      return;
    }
    setChangingPw(true);
    await new Promise((r) => setTimeout(r, 800));
    setChangingPw(false);
    setPwForm({ current: "", next: "", confirm: "" });
    setSuccess("ContraseÃ±a actualizada correctamente.");
    setTimeout(() => setSuccess(null), 4000);
  };

  return (
    <PanelShell breadcrumb="Cuenta">
      <div className="px-4 sm:px-6 lg:px-8 py-8 mx-auto max-w-[1280px]">
        <div className="mb-8">
          <h1 className="font-serif text-2xl font-light text-text">
            Mi cuenta
          </h1>
          <p className="mt-1 text-sm font-light text-muted">
            Gestiona tus datos personales, seguridad y preferencias.
          </p>
        </div>

        {success && (
          <div className="mb-6 border border-green/30 bg-green/5 text-green px-4 py-3 font-sans text-[12px]">
            {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            {/* Personal data */}
            <Card title="Datos personales">
              <FormRow label="Nombre completo">
                <TextInput
                  value={form.fullName}
                  onChange={(v) => setForm((f) => ({ ...f, fullName: v }))}
                  disabled={!editing}
                />
              </FormRow>
              <FormRow label="Email" helper="El email no se puede modificar.">
                <TextInput value={form.email} disabled />
              </FormRow>
              <FormRow label="TelÃ©fono">
                <TextInput
                  value={form.phone}
                  onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                  disabled={!editing}
                />
              </FormRow>

              <div className="pt-4 flex gap-2">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="font-sans font-normal text-[10px] uppercase tracking-[0.22em] border border-text text-text px-5 py-2.5 hover:bg-text hover:text-white transition-colors"
                  >
                    Editar
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="font-sans font-normal text-[10px] uppercase tracking-[0.22em] bg-text text-white px-5 py-2.5 hover:bg-text transition-colors disabled:opacity-50"
                    >
                      {saving ? "Guardando..." : "Guardar cambios"}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="font-sans font-normal text-[10px] uppercase tracking-[0.22em] text-muted hover:text-text transition-colors"
                    >
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </Card>

            {/* Password */}
            <Card title="Cambiar contraseÃ±a">
              <form onSubmit={handleChangePw} className="space-y-4">
                {pwError && (
                  <div className="border border-red-200 bg-red-50 text-red-600 px-3 py-2 font-sans text-[11px]">
                    {pwError}
                  </div>
                )}
                <FormRow label="ContraseÃ±a actual">
                  <TextInput
                    type="password"
                    value={pwForm.current}
                    onChange={(v) => setPwForm((p) => ({ ...p, current: v }))}
                    required
                  />
                </FormRow>
                <FormRow
                  label="Nueva contraseÃ±a"
                  helper="MÃ­nimo 8 caracteres."
                >
                  <TextInput
                    type="password"
                    value={pwForm.next}
                    onChange={(v) => setPwForm((p) => ({ ...p, next: v }))}
                    required
                  />
                </FormRow>
                <FormRow label="Confirmar nueva contraseÃ±a">
                  <TextInput
                    type="password"
                    value={pwForm.confirm}
                    onChange={(v) => setPwForm((p) => ({ ...p, confirm: v }))}
                    required
                  />
                </FormRow>
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={changingPw}
                    className="font-sans font-normal text-[10px] uppercase tracking-[0.22em] bg-text text-white px-5 py-2.5 hover:bg-text transition-colors disabled:opacity-50"
                  >
                    {changingPw ? "Actualizando..." : "Actualizar contraseÃ±a"}
                  </button>
                </div>
              </form>
            </Card>

            {/* Preferences */}
            <Card title="Preferencias de notificaciones">
              <div className="space-y-4">
                <Toggle
                  label="Actualizaciones de vehÃ­culos"
                  description="Emails cuando se avanza una fase logÃ­stica."
                  checked={prefs.emailUpdates}
                  onChange={(v) =>
                    setPrefs((p) => ({ ...p, emailUpdates: v }))
                  }
                />
                <Toggle
                  label="Hitos importantes"
                  description="Emails cuando se completa un milestone."
                  checked={prefs.emailMilestones}
                  onChange={(v) =>
                    setPrefs((p) => ({ ...p, emailMilestones: v }))
                  }
                />
                <Toggle
                  label="Retornos y liquidaciones"
                  description="Emails cuando se liquida una operaciÃ³n."
                  checked={prefs.emailReturns}
                  onChange={(v) =>
                    setPrefs((p) => ({ ...p, emailReturns: v }))
                  }
                />
                <Toggle
                  label="Novedades y oportunidades"
                  description="Emails sobre nuevos vehÃ­culos y contenido."
                  checked={prefs.emailMarketing}
                  onChange={(v) =>
                    setPrefs((p) => ({ ...p, emailMarketing: v }))
                  }
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card title="Documentos">
              {documents.length > 0 ? (
                <ul className="divide-y divide-rule">
                  {documents.map((doc) => (
                    <li key={doc.id} className="py-3 first:pt-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <FileText
                          className="h-4 w-4 text-muted mt-1 shrink-0"
                          strokeWidth={1.5}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-sans text-[12px] text-text leading-snug">
                            {doc.name}
                          </div>
                          <div className="num text-[10px] text-muted mt-0.5">
                            {doc.date}
                          </div>
                        </div>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 p-1 text-muted hover:text-text transition-colors"
                          aria-label="Descargar"
                        >
                          <Download className="h-4 w-4" strokeWidth={1.5} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-sans text-[12px] text-muted">
                  AÃºn no tienes documentos disponibles.
                </p>
              )}
            </Card>

            <Card title="Recursos legales">
              <ul className="space-y-3 font-sans text-[12px] text-muted">
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 hover:text-text transition-colors"
                  >
                    TÃ©rminos y condiciones
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 hover:text-text transition-colors"
                  >
                    PolÃ­tica de privacidad
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1 hover:text-text transition-colors"
                  >
                    DivulgaciÃ³n de riesgos
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

// â”€â”€ Reusable primitives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className=" border border-rule bg-[#f8f5ef] p-6">
      <h2 className="font-serif text-lg font-light text-text mb-5">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormRow({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block font-sans font-normal text-[9px] uppercase tracking-[0.22em] text-muted mb-1.5">
        {label}
      </label>
      {children}
      {helper && (
        <p className="mt-1 font-sans text-[10px] text-muted">{helper}</p>
      )}
    </div>
  );
}

function TextInput({
  value,
  onChange,
  type = "text",
  disabled = false,
  required = false,
}: {
  value: string;
  onChange?: (v: string) => void;
  type?: string;
  disabled?: boolean;
  required?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      required={required}
      className={cn(
        "w-full border border-rule bg-[#f8f5ef] px-3 py-2.5 font-sans text-[13px] text-text transition-colors focus:outline-none focus:border-text",
        disabled && "bg-ivory-deep text-muted cursor-not-allowed"
      )}
    />
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="font-sans text-[12px] text-text font-medium">
          {label}
        </div>
        <p className="mt-0.5 font-sans text-[11px] text-muted">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative shrink-0 h-6 w-11 transition-colors",
          checked ? "bg-amber" : "bg-rule"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 bg-[#f8f5ef] transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
