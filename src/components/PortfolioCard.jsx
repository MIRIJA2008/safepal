import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

export default function PortfolioCard({ totalBalance, change }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#1e40af] rounded-[2rem] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10"
    >
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
      
      <p className="text-white/60 text-xs font-bold uppercase tracking-widest">Total Balance</p>
      <h2 className="text-5xl font-black mt-2 text-white tracking-tight">
        ${totalBalance.toLocaleString()}
      </h2>
      
      <div className="flex items-center gap-2 mt-4">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-sky-300 flex items-center gap-1 border border-white/5">
          <ArrowUpRight size={14} /> {change}
        </span>
        <span className="text-white/40 text-xs font-medium">vs last month</span>
      </div>
      
      <div className="mt-8 flex gap-4 relative z-10">
        <button className="flex-1 bg-white hover:bg-gray-100 text-gray-900 shadow-xl px-6 py-3.5 rounded-2xl transition-all font-bold text-sm tracking-wide">
          Deposit
        </button>
        <button className="flex-1 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-6 py-3.5 rounded-2xl transition-all font-bold text-sm tracking-wide">
          Withdraw
        </button>
      </div>
    </motion.div>
  );
}