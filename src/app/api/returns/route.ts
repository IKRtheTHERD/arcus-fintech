import { NextResponse } from "next/server";
import { getMonthlyReturns, getPerformanceSeries, getRiskMetrics } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const timeframe = (searchParams.get("timeframe") as "1Y" | "3Y" | "5Y") || "1Y";

  const [series, monthly, risk] = await Promise.all([
    getPerformanceSeries(timeframe),
    getMonthlyReturns(),
    getRiskMetrics(),
  ]);

  return NextResponse.json({
    timeframe,
    performanceSeries: series,
    monthlyReturns: monthly,
    riskMetrics: risk,
  });
}
