import { type ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Layout({ children, currentPage, onPageChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <div className="w-64 flex-shrink-0">
          <Sidebar currentPage={currentPage} onPageChange={onPageChange} />
        </div>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
