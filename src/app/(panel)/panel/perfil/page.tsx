"use client";

import PanelShell from "@/components/panel/PanelShell";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { FileText, ExternalLink } from "lucide-react";
import { useState } from "react";

// Placeholder contracts
const placeholderContracts = [
  { id: "c1", name: "Contrato Jeep Wrangler Rubicon 2023", date: "01/02/2024", url: "#" },
  { id: "c2", name: "Contrato Ford Mustang GT 2022", date: "10/02/2024", url: "#" },
];

export default function PerfilPage() {
  const { user } = useAuth();

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: user?.user_metadata?.phone || "",
  });

  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleSaveProfile = async () => {
    setSaving(true);
    setSuccess(null);
    // TODO: Update user metadata in Supabase
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
    setEditing(false);
    setSuccess("Perfil actualizado correctamente.");
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    if (passwordForm.newPassword !== passwordForm.confirm) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setChangingPassword(true);
    // TODO: supabase.auth.updateUser({ password: passwordForm.newPassword })
    await new Promise((r) => setTimeout(r, 1000));
    setChangingPassword(false);
    setPasswordForm({ current: "", newPassword: "", confirm: "" });
    setSuccess("Contraseña actualizada correctamente.");
  };

  return (
    <PanelShell breadcrumb="Mi perfil">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Mi perfil</h1>
      </div>

      {success && (
        <div className="mb-6 rounded-lg border border-green/30 bg-green/5 px-4 py-3 text-sm text-green">
          {success}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal data */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Datos personales
              </h2>
              {!editing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="text-gold hover:text-gold/80"
                >
                  Editar
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                variant="light"
                value={form.fullName}
                disabled={!editing}
                onChange={(e) =>
                  setForm({ ...form, fullName: (e.target as HTMLInputElement).value })
                }
              />
              <Input
                label="Email"
                type="email"
                variant="light"
                value={form.email}
                disabled
                helperText="El email no se puede modificar"
              />
              <Input
                label="Teléfono"
                type="text"
                variant="light"
                value={form.phone}
                disabled={!editing}
                onChange={(e) =>
                  setForm({ ...form, phone: (e.target as HTMLInputElement).value })
                }
              />
            </div>

            {editing && (
              <div className="mt-6 flex gap-3">
                <Button
                  variant="primary"
                  size="sm"
                  loading={saving}
                  onClick={handleSaveProfile}
                >
                  Guardar cambios
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(false)}
                >
                  Cancelar
                </Button>
              </div>
            )}
          </div>

          {/* Change password */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Seguridad
            </h2>

            <form onSubmit={handleChangePassword} className="space-y-4">
              {passwordError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {passwordError}
                </div>
              )}

              <Input
                label="Contraseña actual"
                type="password"
                variant="light"
                value={passwordForm.current}
                required
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    current: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <Input
                label="Nueva contraseña"
                type="password"
                variant="light"
                value={passwordForm.newPassword}
                required
                helperText="Mínimo 8 caracteres"
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <Input
                label="Confirmar nueva contraseña"
                type="password"
                variant="light"
                value={passwordForm.confirm}
                required
                onChange={(e) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirm: (e.target as HTMLInputElement).value,
                  })
                }
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={changingPassword}
              >
                Cambiar contraseña
              </Button>
            </form>
          </div>

          {/* Preferences */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Preferencias
            </h2>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Notificaciones por email
                </p>
                <p className="text-xs text-gray-500">
                  Recibe actualizaciones sobre tus inversiones por email
                </p>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  emailNotifications ? "bg-gold" : "bg-gray-200"
                }`}
                role="switch"
                aria-checked={emailNotifications}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                    emailNotifications ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Avatar card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
              <span className="text-2xl font-semibold text-gold">
                {(form.fullName || "U")
                  .split(" ")
                  .map((n: string) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
            </div>
            <p className="mt-3 text-base font-semibold text-gray-900">
              {form.fullName || "Usuario"}
            </p>
            <p className="text-sm text-gray-500">{form.email}</p>
            <div className="mt-3">
              <span className="inline-flex rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                Inversor
              </span>
            </div>
          </div>

          {/* Contracts */}
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900">
              Documentos y contratos
            </h3>
            {placeholderContracts.length > 0 ? (
              <div className="mt-4 space-y-3">
                {placeholderContracts.map((contract) => (
                  <a
                    key={contract.id}
                    href={contract.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                  >
                    <FileText className="h-5 w-5 shrink-0 text-gold" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {contract.name}
                      </p>
                      <p className="text-xs text-gray-400">{contract.date}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 shrink-0 text-gray-300" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-400">
                No hay documentos disponibles.
              </p>
            )}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}
