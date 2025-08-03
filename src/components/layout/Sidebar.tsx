import { BarChart3, CreditCard, Home, X } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onClose?: () => void;
}

const navigation = [
  { name: "Dashboard", page: "dashboard", icon: Home },
  { name: "Payments", page: "payments", icon: CreditCard },
  { name: "Analytics", page: "analytics", icon: BarChart3 },
];

export function Sidebar({ currentPage, onPageChange, onClose }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-sm border-r min-h-screen lg:relative">
      {/* Mobile close button */}
      {onClose && (
        <div className="lg:hidden flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            type="button"
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            onClick={onClose}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" />
          </button>
        </div>
      )}
      
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.page;

            return (
              <button
                key={item.name}
                onClick={() => onPageChange(item.page)}
                className={`
                  group flex items-center px-2 py-3 text-sm font-medium rounded-md w-full text-left transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary-100 text-primary-900 border-r-2 border-primary-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`
                  mr-3 h-5 w-5 flex-shrink-0
                  ${
                    isActive
                      ? "text-primary-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }
                `}
                />
                <span className="truncate">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
