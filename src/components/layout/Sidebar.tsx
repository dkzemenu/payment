import { BarChart3, CreditCard, Home } from "lucide-react";

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigation = [
  { name: "Dashboard", page: "dashboard", icon: Home },
  { name: "Payments", page: "payments", icon: CreditCard },
  { name: "Analytics", page: "analytics", icon: BarChart3 },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-sm border-r min-h-screen">
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
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left
                  ${
                    isActive
                      ? "bg-primary-100 text-primary-900 border-r-2 border-primary-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                <Icon
                  className={`
                  mr-3 h-5 w-5
                  ${
                    isActive
                      ? "text-primary-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }
                `}
                />
                {item.name}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
