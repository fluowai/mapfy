import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Users, 
  MapPin, 
  Star, 
  FileText, 
  Settings, 
  Bell,
  LogOut,
  Menu,
  X,
  Trophy,
  Calendar,
  CheckCircle2,
  FileBarChart,
  FileSearch
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3 w-full text-left transition-all duration-200 rounded-lg group",
      active 
        ? "bg-blue-50 text-blue-600 font-medium" 
        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
    )}
  >
    <Icon size={20} className={cn(active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-900")} />
    <span>{label}</span>
  </button>
);

export const Layout = ({ children, activeTab, setActiveTab }: { 
  children: React.ReactNode, 
  activeTab: string, 
  setActiveTab: (tab: string) => void 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'prospecting', label: 'Prospecção', icon: Search },
    { id: 'profile_analysis', label: 'Análise de Perfil', icon: FileSearch },
    { id: 'competitors', label: 'Concorrentes', icon: Trophy },
    { id: 'clients', label: 'Clientes', icon: Users },
    { id: 'locations', label: 'Unidades', icon: MapPin },
    { id: 'reviews', label: 'Avaliações', icon: Star },
    { id: 'posts', label: 'Postagens', icon: Calendar },
    { id: 'tasks', label: 'Tarefas', icon: CheckCircle2 },
    { id: 'alerts', label: 'Alertas', icon: Bell },
    { id: 'reports', label: 'Relatórios', icon: FileBarChart },
    { id: 'proposals', label: 'Propostas', icon: FileText },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
          <span className="text-xl font-bold tracking-tight">MAPFY</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left text-gray-500 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-bottom border-gray-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 bg-gray-100 rounded-full border border-gray-200"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          {children}
        </div>
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <aside className="absolute inset-y-0 left-0 w-64 bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">M</div>
                <span className="text-xl font-bold tracking-tight">MAPFY</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  active={activeTab === item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                />
              ))}
            </nav>
          </aside>
        </div>
      )}
    </div>
  );
};
