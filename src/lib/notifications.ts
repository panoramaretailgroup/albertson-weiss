import { createClient } from "@/lib/supabase/client";
import type { NotificationType } from "@/lib/types";

const supabase = createClient();

export async function createNotification(
  userId: string,
  title: string,
  message: string,
  type: NotificationType = "info",
  carId?: string
) {
  const { data, error } = await supabase
    .from("notifications")
    .insert({
      user_id: userId,
      title,
      message,
      type,
      car_id: carId ?? null,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markAsRead(notificationId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", notificationId);

  if (error) throw error;
}

export async function markAllAsRead(userId: string) {
  const { error } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw error;
}

export async function getUnreadCount(userId: string): Promise<number> {
  const { count, error } = await supabase
    .from("notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("read", false);

  if (error) throw error;
  return count ?? 0;
}

export async function getUserNotifications(
  userId: string,
  limit = 20,
  offset = 0
) {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}
