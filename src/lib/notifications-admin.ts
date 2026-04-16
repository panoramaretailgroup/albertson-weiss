import { createAdminClient } from "@/lib/supabase/admin";
import type { NotificationType } from "@/lib/types";

/**
 * Server-side notification helpers using the admin client (bypasses RLS).
 * Use these from API routes or server actions.
 */

async function notifyUser(
  userId: string,
  title: string,
  message: string,
  type: NotificationType,
  carId?: string
) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    type,
    car_id: carId ?? null,
  });
  if (error) throw error;
}

async function notifyMultipleUsers(
  userIds: string[],
  title: string,
  message: string,
  type: NotificationType,
  carId?: string
) {
  const supabase = createAdminClient();
  const rows = userIds.map((userId) => ({
    user_id: userId,
    title,
    message,
    type,
    car_id: carId ?? null,
  }));
  const { error } = await supabase.from("notifications").insert(rows);
  if (error) throw error;
}

// ── Trigger helpers ───────────────────────────────────────────────────

/**
 * 1. New vehicle published → notify all verified investors
 */
export async function notifyNewVehicle(
  carId: string,
  brand: string,
  model: string,
  year: number
) {
  const supabase = createAdminClient();
  const { data: investors } = await supabase
    .from("users")
    .select("id")
    .eq("role", "investor")
    .eq("verified", true);

  if (!investors?.length) return;

  await notifyMultipleUsers(
    investors.map((u) => u.id),
    `Nueva oportunidad: ${brand} ${model} ${year}`,
    `Se ha publicado un nuevo vehículo de inversión. Rentabilidad estimada disponible en la plataforma.`,
    "info",
    carId
  );
}

/**
 * 2. Logistics phase updated → notify investors of that car
 */
export async function notifyPhaseUpdate(
  carId: string,
  brand: string,
  model: string,
  phaseName: string
) {
  const supabase = createAdminClient();
  const { data: investments } = await supabase
    .from("investments")
    .select("user_id")
    .eq("car_id", carId)
    .eq("status", "active");

  if (!investments?.length) return;

  const uniqueUserIds = Array.from(new Set(investments.map((i) => i.user_id)));

  await notifyMultipleUsers(
    uniqueUserIds,
    `Tu ${brand} ${model} ha avanzado`,
    `Nueva fase: ${phaseName}. Consulta el detalle en tu panel.`,
    "milestone",
    carId
  );
}

/**
 * 3. Car update published → notify investors
 */
export async function notifyCarUpdate(
  carId: string,
  updateTitle: string
) {
  const supabase = createAdminClient();
  const { data: investments } = await supabase
    .from("investments")
    .select("user_id")
    .eq("car_id", carId)
    .eq("status", "active");

  if (!investments?.length) return;

  const uniqueUserIds = Array.from(new Set(investments.map((i) => i.user_id)));

  await notifyMultipleUsers(
    uniqueUserIds,
    updateTitle,
    "Se ha publicado una nueva actualización sobre tu inversión.",
    "update",
    carId
  );
}

/**
 * 4. Operation completed → notify each investor with their return
 */
export async function notifyOperationCompleted(
  carId: string,
  brand: string,
  model: string,
  investments: Array<{ userId: string; returnPct: number }>
) {
  for (const inv of investments) {
    await notifyUser(
      inv.userId,
      `Inversión completada: ${brand} ${model}`,
      `Tu inversión ha sido completada. Rentabilidad obtenida: ${inv.returnPct.toFixed(1)}%. El retorno se transferirá a tu cuenta.`,
      "return",
      carId
    );
  }
}

/**
 * 5. New investment registered → notify the investor
 */
export async function notifyInvestmentRegistered(
  userId: string,
  carId: string,
  brand: string,
  model: string,
  amountEur: number
) {
  await notifyUser(
    userId,
    `Inversión registrada: ${brand} ${model}`,
    `Tu inversión de ${amountEur.toLocaleString("es-ES")} EUR ha sido registrada correctamente. Puedes seguir el progreso desde tu panel.`,
    "info",
    carId
  );
}
