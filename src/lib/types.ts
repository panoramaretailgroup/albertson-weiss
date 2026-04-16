export type UserRole = "investor" | "admin";

export type CarStatus = "open" | "funded" | "in_transit" | "sold" | "completed";

export type InvestmentStatus = "active" | "completed" | "cancelled";

export type NotificationType = "info" | "update" | "milestone" | "return";

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  verified: boolean;
  created_at: string;
}

export interface LogisticsPhase {
  phase: number;
  name: string;
  completed: boolean;
  date: string | null;
  photos: string[];
  tracking?: Record<string, string>;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  vin: string | null;
  engine: string | null;
  mileage_km: number | null;
  color: string | null;
  equipment: string[];
  purchase_price_usd: number | null;
  target_sale_price_eur: number | null;
  investment_needed_eur: number;
  investment_collected_eur: number;
  estimated_return_pct: number;
  estimated_duration_days: number;
  status: CarStatus;
  logistics_phase: number;
  logistics_phases: LogisticsPhase[];
  shipping_container: string | null;
  shipping_carrier: string | null;
  shipping_route: string | null;
  shipping_eta: string | null;
  photos_showcase: string[];
  photos_exterior: string[];
  photos_interior: string[];
  photos_detail: string[];
  thumbnail: string | null;
  created_at: string;
  updated_at: string;
}

export interface Investment {
  id: string;
  user_id: string;
  car_id: string;
  amount_eur: number;
  expected_return_eur: number | null;
  actual_return_eur: number | null;
  status: InvestmentStatus;
  contract_url: string | null;
  invested_at: string;
  completed_at: string | null;
  // Joined fields
  car?: Car;
  user?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  car_id: string | null;
  created_at: string;
}

export interface CarUpdate {
  id: string;
  car_id: string;
  phase: number | null;
  title: string;
  description: string | null;
  photos: string[];
  created_at: string;
}
