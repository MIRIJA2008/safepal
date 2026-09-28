import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function AssetList({ assets }) {
  return (
    <motion.div className="glass-card rounded-[2rem] p-8">
      <h3 className="text-base font-bold mb-6 text-white tracking-wide">Your Assets</h3>
      <div className="space-y-2">
        {assets.map((asset, idx) => {
          const isPositive = asset.change.startsWith("+");
          return (
            <div key={asset.symbol} className="flex justify-between items-center p-3 rounded-2xl hover:bg-white/[0.02] transition-all duration-200 group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white text-xs font-bold border border-white/5">
                  {asset.symbol.slice(0, 3)}
                </div>
                <div>
                  <p className="font-bold text-sm text-white">{asset.symbol}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{asset.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-bold text-sm text-white">${asset.value.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{asset.amount} {asset.symbol}</p>
                </div>
                <span className={`text-xs font-bold ${isPositive ? "text-emerald-400" : "text-rose-400"}`}>
                  {asset.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}