import { NextResponse } from "next/server";
import { getStrategies } from "@/lib/db";

export async function GET() {
  const strategies = await getStrategies();
  return NextResponse.json({ strategies });
}
