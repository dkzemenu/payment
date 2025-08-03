import { Menu, X } from "lucide-react";
import { useRateLimit } from '../../hooks/useAnalytics'
import { RateLimitWarning } from '../common/RateLimitWarning'

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { data: rateLimitInfo } = useRateLimit()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden -ml-2 mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={onMenuClick}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            
            <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
              Kifiya Payment Dashboard
            </h1>
          </div>
          
          {rateLimitInfo && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <RateLimitWarning rateLimitInfo={rateLimitInfo} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 