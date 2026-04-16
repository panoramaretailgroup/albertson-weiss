"use client";

import AdminShell from "@/components/admin/AdminShell";
import Badge from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

const allUsers = [
  { id: "u1", name: "Carlos García", email: "carlos@example.com", phone: "+34 612 345 678", registered: "2023-08-15", verified: true, investments: 4, totalInvested: 45000 },
  { id: "u2", name: "María López", email: "maria@example.com", phone: "+34 623 456 789", registered: "2023-10-01", verified: true, investments: 2, totalInvested: 35000 },
  { id: "u3", name: "Pedro Sánchez", email: "pedro@example.com", phone: "+34 634 567 890", registered: "2024-01-10", verified: true, investments: 1, totalInvested: 18000 },
  { id: "u4", name: "Ana Martín", email: "ana@example.com", phone: "+34 645 678 901", registered: "2023-09-12", verified: true, investments: 1, totalInvested: 25000 },
  { id: "u5", name: "Luis Fernández", email: "luis@example.com", phone: "+34 656 789 012", registered: "2024-02-20", verified: false, investments: 0, totalInvested: 0 },
  { id: "u6", name: "Elena Ruiz", email: "elena@example.com", phone: null, registered: "2024-02-22", verified: false, investments: 0, totalInvested: 0 },
];

export default function AdminUsuariosPage() {
  return (
    <AdminShell breadcrumb="Usuarios">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Gestión de usuarios</h1>
        <p className="mt-1 text-sm text-gray-500">
          {allUsers.length} usuarios registrados · {allUsers.filter((u) => u.verified).length} verificados
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-4 py-3 font-medium text-gray-500">Usuario</th>
                <th className="px-4 py-3 font-medium text-gray-500">Teléfono</th>
                <th className="px-4 py-3 font-medium text-gray-500">Registro</th>
                <th className="px-4 py-3 font-medium text-gray-500">Estado</th>
                <th className="px-4 py-3 font-medium text-gray-500">Inversiones</th>
                <th className="px-4 py-3 font-medium text-gray-500">Total invertido</th>
                <th className="px-4 py-3 font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.phone ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{formatDate(user.registered)}</td>
                  <td className="px-4 py-3">
                    <Badge color={user.verified ? "green" : "gray"}>
                      {user.verified ? "Verificado" : "Pendiente"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-900">{user.investments}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {user.totalInvested > 0 ? formatCurrency(user.totalInvested) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className={
                        user.verified
                          ? "text-xs text-gray-400 hover:text-red-500 transition-colors"
                          : "text-xs font-medium text-gold hover:text-gold/80 transition-colors"
                      }
                    >
                      {user.verified ? "Desverificar" : "Verificar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
