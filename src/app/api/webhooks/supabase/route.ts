import { NextRequest, NextResponse } from "next/server";

export async function POST(_request: NextRequest) {
  // TODO: Implement Supabase webhook handler
  // Verify webhook signature
  // Handle database change events (e.g., investment status changes, car updates)

  return NextResponse.json({ received: true });
}
