import { useRateLimit } from '../../hooks/useAnalytics'
import { RateLimitWarning } from '../common/RateLimitWarning'

export function Header() {
  const { data: rateLimitInfo } = useRateLimit()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Kifiya Payment Dashboard
            </h1>
          </div>
          
          {rateLimitInfo && (
            <div className="flex items-center space-x-4">
              <RateLimitWarning rateLimitInfo={rateLimitInfo} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 