import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

export default function Chart({ data }) {
  return (
    <motion.div className="glass-card rounded-[2rem] p-8">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-base font-bold text-white tracking-wide">Portfolio Evolution</h3>
        <select className="bg-white/5 hover:bg-white/10 text-white text-xs font-bold rounded-xl px-4 py-2 border border-white/5 focus:outline-none transition-all cursor-pointer">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="auroraGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="date" stroke="rgba(255,255,255,0.15)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} />
          <YAxis stroke="rgba(255,255,255,0.15)" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} axisLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#090d16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }} />
          <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} fill="url(#auroraGlow)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}