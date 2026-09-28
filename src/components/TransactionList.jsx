import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownLeft, ShoppingCart } from "lucide-react";

export default function TransactionList({ transactions }) {
  const typeConfig = {
    send: { icon: ArrowUpRight, color: "text-rose-400", bg: "bg-rose-500/10" },
    receive: { icon: ArrowDownLeft, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    buy: { icon: ShoppingCart, color: "text-sky-400", bg: "bg-sky-500/10" },
  };

  return (
    <motion.div className="glass-card rounded-[2rem] p-8">
      <h3 className="text-base font-bold mb-6 text-white tracking-wide">Recent Transactions</h3>
      <div className="space-y-1">
        {transactions.map((tx) => {
          const cfg = typeConfig[tx.type] || typeConfig.buy;
          const Icon = cfg.icon;
          return (
            <div key={tx.id} className="flex justify-between items-center p-3.5 rounded-2xl hover:bg-white/[0.02] transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-2.5 rounded-xl ${cfg.bg}`}>
                  <Icon size={16} className={cfg.color} />
                </div>
                <div>
                  <p className="font-bold text-sm text-white capitalize">{tx.type} {tx.asset}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-sm text-white">{tx.amount} {tx.asset}</p>
                <p className="text-xs text-gray-500 mt-0.5">{tx.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}