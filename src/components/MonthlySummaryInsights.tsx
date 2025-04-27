import { useMonthlySummaries } from '../hooks/useMonthlySummaries';
import { MonthlyAccountSummary } from '../types/MonthlyAccountSummary';

export function MonthlySummaryInsights() {
  const { data: summaries = [] } = useMonthlySummaries();
  const totalIncome = (summaries as MonthlyAccountSummary[]).reduce((sum: number, s: MonthlyAccountSummary) => sum + parseFloat(s.income), 0);
  const avgBalance = summaries.length ? (summaries as MonthlyAccountSummary[]).reduce((sum: number, s: MonthlyAccountSummary) => sum + parseFloat(s.end_balance), 0) / summaries.length : 0;
  // Trend: compare last month vs previous
  let trend = null;
  if (summaries.length > 1) {
    const sorted = [...(summaries as MonthlyAccountSummary[])].sort((a: MonthlyAccountSummary, b: MonthlyAccountSummary) => new Date(b.month).getTime() - new Date(a.month).getTime());
    const last = sorted[0];
    const prev = sorted[1];
    const diff = parseFloat(last.end_balance) - parseFloat(prev.end_balance);
    trend = diff > 0 ? `Up by ₹${diff.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : `Down by ₹${Math.abs(diff).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow mt-4">
      <h2 className="text-lg font-bold mb-2">Insights</h2>
      <p>Total Income: ₹{totalIncome.toLocaleString()}</p>
      <p>Average Month-End Balance: ₹{avgBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
      {trend && <p>Last Month Trend: {trend}</p>}
      {summaries.length === 0 && <p>No data yet. Add a summary above.</p>}
    </div>
  );
}
