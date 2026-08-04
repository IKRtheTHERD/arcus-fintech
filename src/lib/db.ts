import seedData from "./data/seed.json";

export interface Strategy {
  id: string;
  name: string;
  tagline: string;
  cagr: number;
  sharpe: number;
  maxDrawdown: number;
  beta: number;
  description: string;
  signalsPerDay: string;
  avgHoldingTime: string;
  capacity: string;
}

export interface MonthlyReturn {
  year: number;
  Jan: number;
  Feb: number;
  Mar: number;
  Apr: number;
  May: number;
  Jun: number;
  Jul: number;
  Aug: number;
  Sep: number;
  Oct: number;
  Nov: number;
  Dec: number;
  total: number;
}

export interface PerformancePoint {
  date: string;
  arcus: number;
  sp500: number;
  hedgeFund: number;
}

export interface RiskMetric {
  metric: string;
  arcus: string;
  sp500: string;
  hedgeFund: string;
  advantage: string;
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  role: string;
}

export interface Partner {
  name: string;
  role: string;
  type: string;
}

export interface ApplicationInput {
  fullName: string;
  email: string;
  phone: string;
  investableAssets: string;
  investorType: string;
  referralSource?: string;
}

export interface ApplicationRecord extends ApplicationInput {
  id: string;
  createdAt: string;
  status: string;
}

// In-memory persistent state initialized with seed data
let applicationsState: ApplicationRecord[] = [...seedData.applications];

export async function getStrategies(): Promise<Strategy[]> {
  return seedData.strategies;
}

export async function getStrategyById(id: string): Promise<Strategy | undefined> {
  return seedData.strategies.find((s) => s.id === id);
}

export async function getMonthlyReturns(): Promise<MonthlyReturn[]> {
  return seedData.monthlyReturns;
}

export async function getPerformanceSeries(
  timeframe: "1Y" | "3Y" | "5Y" = "1Y"
): Promise<PerformancePoint[]> {
  const series = seedData.performanceSeries as Record<string, PerformancePoint[]>;
  return series[timeframe] || series["1Y"];
}

export async function getRiskMetrics(): Promise<RiskMetric[]> {
  return seedData.riskMetrics;
}

export async function getTeam(): Promise<TeamMember[]> {
  return seedData.team;
}

export async function getPartners(): Promise<Partner[]> {
  return seedData.partners;
}

export async function getApplications(): Promise<ApplicationRecord[]> {
  return applicationsState;
}

export async function createApplication(
  input: ApplicationInput
): Promise<ApplicationRecord> {
  const record: ApplicationRecord = {
    ...input,
    id: `app-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    createdAt: new Date().toISOString(),
    status: "PENDING_VERIFICATION",
  };
  applicationsState.unshift(record);
  return record;
}
