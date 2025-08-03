import { useAnalytics } from "../hooks/useAnalytics";
import { formatProcessingTime } from "../utils/helpers";

export function Analytics() {
  const { data: analytics, isLoading } = useAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">No analytics data available</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Payment processing insights and metrics</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Processing Time
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-primary-600">
            {formatProcessingTime(analytics.averageProcessingTime)}
          </p>
          <p className="text-sm text-gray-500">Average processing time</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Current TPS
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600">
            {analytics.currentTPS.toFixed(1)}
          </p>
          <p className="text-sm text-gray-500">Transactions per second</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            Success Rate
          </h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600">
            {analytics.totalPayments > 0
              ? Math.round(
                  (analytics.statusCounts.COMPLETED / analytics.totalPayments) *
                    100
                )
              : 0}
            %
          </p>
          <p className="text-sm text-gray-500">Completed payments</p>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
          Payment Status Distribution
        </h3>
        <div className="space-y-3">
          {Object.entries(analytics.statusCounts).map(([status, count]) => (
            <div key={status} className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {status.toLowerCase().replace("_", " ")}
              </span>
              <div className="flex items-center space-x-2">
                <div className="flex-1 sm:w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${
                        analytics.totalPayments > 0
                          ? (count / analytics.totalPayments) * 100
                          : 0
                      }%`,
                      backgroundColor:
                        status === "COMPLETED"
                          ? "#22c55e"
                          : status === "PENDING"
                          ? "#f59e0b"
                          : status === "IN_PROGRESS"
                          ? "#3b82f6"
                          : "#ef4444",
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 min-w-[2rem] text-right">
                  {count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
