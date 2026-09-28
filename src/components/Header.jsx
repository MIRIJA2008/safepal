import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, ChevronDown, User, ShieldAlert, ArrowDownLeft, Milestone } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Exemple de fausses données de notifications riches
  const notifications = [
    {
      id: 1,
      title: "Transaction Confirmed",
      desc: "Received +0.54 ETH from external ledger",
      time: "12m ago",
      icon: ArrowDownLeft,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      id: 2,
      title: "New Login Detected",
      desc: "Authorized from Chrome via Windows 11",
      time: "2h ago",
      icon: ShieldAlert,
      color: "text-amber-400",
      bg: "bg-amber-500/10"
    },
    {
      id: 3,
      title: "Network Gas Update",
      desc: "Gas fees dropped below 15 Gwei. Optimal time to swap",
      time: "5h ago",
      icon: Milestone,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10"
    }
  ];

  const navigateTo = (e, path) => {
    e.preventDefault();
    setIsProfileOpen(false);
    setIsNotificationsOpen(false);
    window.history.pushState({}, "", path);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-30 bg-[#030712]/60 backdrop-blur-md border-b border-white/[0.04] py-4 flex items-center justify-between"
    >
      {/* Barre de recherche */}
      <div className="hidden md:flex items-center bg-white/5 rounded-xl px-4 py-2.5 border border-white/5 focus-within:border-indigo-500 transition-all duration-200">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search assets, transactions..."
          className="bg-transparent outline-none px-3 text-xs w-64 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="flex items-center gap-4">
        
        {/* ENRICHISSEMENT : LE BOUTON DE NOTIFICATION INTERACTIF */}
        <div className="relative">
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              setIsProfileOpen(false); // Ferme l'autre menu s'il est ouvert
            }}
            className="relative p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all"
          >
            <Bell size={18} className="text-gray-300" />
            {/* Badge lumineux indiquant qu'il y a des notifications non lues */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,1)] animate-pulse" />
          </motion.button>

          {/* Menu déroulant des notifications */}
          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-80 bg-[#090d16] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 space-y-1"
              >
                <div className="p-3 flex justify-between items-center border-b border-white/5 mb-1">
                  <span className="text-xs font-bold text-white">Recent Updates</span>
                  <button className="text-[10px] text-indigo-400 hover:underline font-semibold">Mark all read</button>
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-1">
                  {notifications.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div 
                        key={item.id} 
                        className="p-3 rounded-xl hover:bg-white/[0.02] flex gap-3 items-start transition-colors cursor-pointer"
                      >
                        <div className={`p-2 rounded-lg ${item.bg} ${item.color} shrink-0`}>
                          <IconComponent size={14} />
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex justify-between items-baseline gap-2">
                            <h5 className="text-xs font-bold text-white">{item.title}</h5>
                            <span className="text-[9px] text-gray-500 font-medium shrink-0">{item.time}</span>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-normal">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bouton Profil d'utilisateur */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationsOpen(false); // Ferme les notifications si ouvertes
            }}
            className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-2 border border-white/5 hover:border-indigo-500 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-400 flex items-center justify-center font-bold text-white text-xs">
              JD
            </div>
            <span className="text-xs font-bold text-white tracking-wide">John Doe</span>
            <ChevronDown size={14} className="text-gray-400" />
          </motion.button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 mt-3 w-48 bg-[#090d16] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 p-1"
              >
                <div className="py-1">
                  <a href="/profile" onClick={(e) => navigateTo(e, "/profile")} className="block px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-indigo-400 rounded-lg transition">Profile</a>
                  <a href="/settings" onClick={(e) => navigateTo(e, "/settings")} className="block px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/5 hover:text-indigo-400 rounded-lg transition">Settings</a>
                  <hr className="border-white/5 my-1" />
                  <a href="/" onClick={(e) => navigateTo(e, "/")} className="block px-4 py-2.5 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition">Disconnect</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.header>
  );
}