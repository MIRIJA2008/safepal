import { motion } from "framer-motion";
import { Home, Wallet, LineChart, Settings, LogOut, Shield } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/" },
    { name: "Portfolio", icon: Wallet, path: "/portfolio" },
    { name: "Analytics", icon: LineChart, path: "/analytics" },
    { name: "Security", icon: Shield, path: "/security" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  const handleNavigation = (e, path) => {
    e.preventDefault();
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <div className="w-64 bg-[#030712]/40 backdrop-blur-3xl h-screen fixed left-0 top-0 p-6 border-r border-white/[0.04] flex flex-col justify-between z-40">
      <div>
        <div className="text-xl font-extrabold text-white mb-12 flex items-center gap-3 tracking-tight p-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.5)]">
            <Shield className="text-white" size={16} />
          </div>
          SafePal
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.path}
              onClick={(e) => handleNavigation(e, item.path)}
              className="group flex items-center space-x-3 text-gray-400 hover:text-white font-semibold text-sm transition-all duration-200 p-3.5 rounded-xl hover:bg-white/[0.03] relative"
            >
              <item.icon size={18} className="text-gray-400 group-hover:text-indigo-400 transition-colors" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      <div>
        <a href="#" onClick={(e) => e.preventDefault()} className="flex items-center space-x-3 text-gray-500 hover:text-red-400 font-semibold text-sm p-3.5 rounded-xl transition-all">
          <LogOut size={18} />
          <span>Disconnect</span>
        </a>
      </div>
    </div>
  );
}