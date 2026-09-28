import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./components/Sidebar";
import PortfolioCard from "./components/PortfolioCard";
import Chart from "./components/Chart";
import AssetList from "./components/AssetList";
import TransactionList from "./components/TransactionList";
import Header from "./components/Header";
import { assets, transactions, chartData } from "./data/mockData";
import { 
  ArrowLeftRight, BellRing, ShieldCheck, Cpu, 
  KeyRound, Eye, Smartphone, DollarSign, Globe, Sliders,
  User, Mail, ShieldAlert, History, Copy, CheckCircle
} from "lucide-react";

function App() {
  const totalBalance = assets.reduce((sum, asset) => sum + asset.value, 0);
  const change = "+12.5%";
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const marketOverview = [
    { name: "Bitcoin", symbol: "BTC", price: "$68,420", change: "+2.4%", up: true },
    { name: "Ethereum", symbol: "ETH", price: "$3,540", change: "-0.8%", up: false },
    { name: "Solana", symbol: "SOL", price: "$145.20", change: "+5.1%", up: true },
  ];

  useEffect(() => {
    if (!document.getElementById("tailwind-cdn")) {
      const script = document.createElement("script");
      script.id = "tailwind-cdn";
      script.src = "https://cdn.tailwindcss.com";
      document.head.appendChild(script);
    }
    if (!document.getElementById("custom-premium-styles")) {
      const style = document.createElement("style");
      style.id = "custom-premium-styles";
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body {
          font-family: 'Plus Jakarta Sans', sans-serif !important;
          margin: 0;
          background-color: #030712 !important;
          color: #9ca3af;
          overflow-x: hidden;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.02) !important;
          backdrop-filter: blur(24px) !important;
          -webkit-backdrop-filter: blur(24px) !important;
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }
        .glass-card:hover {
          background: rgba(255, 255, 255, 0.04) !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
          transform: translateY(-2px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(99, 102, 241, 0.1) !important;
        }
      `;
      document.head.appendChild(style);
    }

    const handleUrlChange = () => {
      const path = window.location.pathname;
      if (path === "/portfolio") setCurrentPage("Portfolio");
      else if (path === "/analytics") setCurrentPage("Analytics");
      else if (path === "/security") setCurrentPage("Security");
      else if (path === "/settings") setCurrentPage("Settings");
      else if (path === "/profile") setCurrentPage("Profile");
      else setCurrentPage("Dashboard");
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case "Dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {marketOverview.map((coin) => (
                <div key={coin.symbol} className="glass-card rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-500 font-bold">{coin.symbol} / USD</span>
                    <p className="text-lg font-bold text-white mt-0.5">{coin.price}</p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${coin.up ? "text-emerald-400 bg-emerald-500/10" : "text-rose-400 bg-rose-500/10"}`}>
                    {coin.change}
                  </span>
                </div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <PortfolioCard totalBalance={totalBalance} change={change} />
              </div>
              
              <div className="glass-card rounded-[2rem] p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                    <ArrowLeftRight size={16} className="text-indigo-400" /> Quick Swap
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/5 p-3 rounded-xl flex justify-between items-center border border-white/5">
                      <input type="number" defaultValue="1" className="bg-transparent outline-none text-white font-bold w-2/3" />
                      <span className="text-xs font-bold text-gray-300 bg-white/10 px-2 py-1 rounded-md">ETH</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl flex justify-between items-center border border-white/5">
                      <input type="text" value="3540.20" disabled className="bg-transparent text-gray-400 font-bold w-2/3" />
                      <span className="text-xs font-bold text-gray-300 bg-white/10 px-2 py-1 rounded-md">USDT</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs py-3 rounded-xl mt-4 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
                  Execute Swap
                </button>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Chart data={chartData} />
              <AssetList assets={assets} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TransactionList transactions={transactions} />
              </div>

              <div className="glass-card rounded-[2rem] p-6 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <BellRing size={16} className="text-indigo-400" /> Security & Updates
                </h4>
                <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 flex gap-3">
                  <ShieldCheck className="text-indigo-400 shrink-0" size={18} />
                  <div>
                    <p className="text-xs font-bold text-white">Biometric protection active</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">Your hardware wallet signature is fully encrypted.</p>
                  </div>
                </div>
                <div className="p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">System Network</span>
                  <p className="text-xs font-bold text-white mt-1">Mainnet gas price is optimal</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Perfect time to rebalance portfolio assets.</p>
                </div>
              </div>
            </div>
          </>
        );

      case "Portfolio":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: "Staking Rewards", val: "$1,240.50", sub: "+4.2% this week" },
                { label: "NFT Valuation", val: "3.45 ETH", sub: "$12,213.00" },
                { label: "DeFi Allocations", val: "$8,430.00", sub: "2 protocols active" },
                { label: "Free Capital", val: "$3,105.00", sub: "Available to trade" },
              ].map((stat, i) => (
                <div key={i} className="glass-card rounded-2xl p-5">
                  <p className="text-xs text-gray-500 font-semibold">{stat.label}</p>
                  <p className="text-xl font-bold text-white mt-1">{stat.val}</p>
                  <p className="text-xs text-indigo-400 mt-1 font-medium">{stat.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <AssetList assets={assets} />
              </div>
              <div className="glass-card rounded-[2rem] p-6 space-y-4">
                <h3 className="text-sm font-bold text-white mb-2">Asset Distribution</h3>
                {assets.map((asset) => (
                  <div key={asset.symbol} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-white">{asset.symbol}</span>
                      <span className="text-gray-400">{Math.floor(Math.random() * 40) + 10}%</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.floor(Math.random() * 60) + 20}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Chart data={chartData} />
              </div>
              <div className="glass-card rounded-[2rem] p-6 space-y-6">
                <h3 className="text-sm font-bold text-white">Performance Insights</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400 mt-0.5"><Cpu size={16} /></div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Highest ROI Month</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">March 2026 registered an increase of +24.8% due to spot positions.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="p-2 bg-indigo-500/10 rounded-xl text-indigo-400 mt-0.5"><Sliders size={16} /></div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Volatility Tracker</h4>
                      <p className="text-[11px] text-gray-500 mt-0.5">Your current portfolio volatility profile is moderate-low.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <TransactionList transactions={transactions} />
          </div>
        );

      case "Security":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card rounded-[2rem] p-8 space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <KeyRound className="text-indigo-400" size={20} /> Access Control
              </h3>
              <div className="space-y-4">
                {[
                  { title: "Two-Factor Authentication (2FA)", desc: "Adds an extra layer of security to your transactions.", active: true, icon: Smartphone },
                  { title: "Hardware Wallet Signature", desc: "Requires physical confirmation on SafePal X1 device.", active: true, icon: ShieldCheck },
                  { title: "Anti-Phishing Code", desc: "Verifies that official emails from our support are authentic.", active: false, icon: Eye },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white/[0.01] rounded-2xl border border-white/5 flex justify-between items-center">
                    <div className="flex gap-4 items-start max-w-[80%]">
                      <div className="p-2 bg-white/5 rounded-xl text-gray-300 mt-0.5"><item.icon size={16} /></div>
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.title}</h4>
                        <p className="text-[11px] text-gray-500 mt-1">{item.desc}</p>
                      </div>
                    </div>
                    <button className={`text-[10px] font-bold px-3 py-1.5 rounded-xl transition-all ${item.active ? "bg-indigo-500/20 text-indigo-300" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}>
                      {item.active ? "Enabled" : "Setup"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-[2rem] p-8 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Device Management</h3>
                <p className="text-xs text-gray-500">Review all active devices authorized to sign transactions or observe balances.</p>
                <div className="mt-6 space-y-3">
                  <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">iPhone 15 Pro (Current)</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Paris, France • Active now</p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md">Primary</span>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-white">SafePal Hardware Wallet X1</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">Paired via Bluetooth LE</p>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">Paired</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold text-xs py-3 rounded-xl mt-6 hover:bg-rose-500/20 transition-all">
                Revoke All Other Sessions
              </button>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div className="glass-card rounded-[2rem] p-8 max-w-4xl">
            <h3 className="text-lg font-bold text-white mb-6">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 flex items-center gap-2"><DollarSign size={14} /> Local Currency</label>
                <select className="w-full bg-white/5 text-white text-xs rounded-xl p-3 border border-white/5 focus:outline-none cursor-pointer">
                  <option>USD ($) - United States Dollar</option>
                  <option>EUR (€) - Euro</option>
                  <option>GBP (£) - British Pound</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 flex items-center gap-2"><Globe size={14} /> Primary Node Endpoint</label>
                <select className="w-full bg-white/5 text-white text-xs rounded-xl p-3 border border-white/5 focus:outline-none cursor-pointer">
                  <option>Cloudflare Global Anycast (Recommended)</option>
                  <option>Alchemy Secure Node Infrastructure</option>
                  <option>Localhost RPC Proxy Portal</option>
                </select>
              </div>
            </div>
            <hr className="border-white/5 my-8" />
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-xs font-bold text-white">Advanced Metadata Mode</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Fetches contract bytecode validations dynamically from blockchain explorers.</p>
              </div>
              <div className="w-10 h-6 bg-indigo-600 rounded-full p-1 flex items-center justify-end cursor-pointer"><div className="w-4 h-4 bg-white rounded-full" /></div>
            </div>
            <div className="mt-8 flex justify-end gap-4">
              <button className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all">Discard</button>
              <button className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30">Save Modifications</button>
            </div>
          </div>
        );

      case "Profile":
        return (
          <div className="space-y-8 max-w-5xl">
            {/* Haut de page : Carte d'identité principale */}
            <div className="glass-card rounded-[2rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="w-24 h-24 bg-gradient-to-tr from-indigo-500 via-purple-500 to-sky-400 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-xl relative group">
                  JD
                  <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs font-bold transition-opacity cursor-pointer">Edit</div>
                </div>
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    <h2 className="text-2xl font-extrabold text-white">John Doe</h2>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle size={10} /> Verified Verified
                    </span>
                  </div>
                  <p className="text-xs text-indigo-400 font-semibold mt-1">john.doe@safepal.crypto</p>
                  <p className="text-xs text-gray-500 mt-3">Account Level: <span className="text-white font-semibold">Tier 3 Premium</span></p>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none bg-white/5 hover:bg-white/10 text-white border border-white/5 font-bold text-xs px-5 py-3 rounded-xl transition-all">
                  Export CSV Data
                </button>
              </div>
            </div>

            {/* Grille d'informations détaillées */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Colonne 1 & 2 : Informations personnelles et clés publiques */}
              <div className="md:col-span-2 space-y-6">
                <div className="glass-card rounded-[2rem] p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <User size={16} className="text-indigo-400" /> Account Identity Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/[0.01] p-3.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Full Name</span>
                      <span className="text-xs text-white font-bold mt-1 block">John Anthony Doe</span>
                    </div>
                    <div className="bg-white/[0.01] p-3.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Country of Residence</span>
                      <span className="text-xs text-white font-bold mt-1 block">France (EU)</span>
                    </div>
                    <div className="bg-white/[0.01] p-3.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Registration Date</span>
                      <span className="text-xs text-white font-bold mt-1 block">January 14, 2024</span>
                    </div>
                    <div className="bg-white/[0.01] p-3.5 rounded-xl border border-white/5">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">Linked Mobile Node</span>
                      <span className="text-xs text-white font-bold mt-1 block">+33 6 •••• ••89</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-[2rem] p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-indigo-400" /> Registered Public Web3 Keys
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { network: "Ethereum/EVM Mainnet", address: "0x71C...3529", icon: "💎" },
                      { network: "Solana Network Node", address: "8xT5...mPq9", icon: "☀️" },
                      { network: "Bitcoin Legacy Segment", address: "bc1q...7x8p", icon: "🪙" },
                    ].map((key, idx) => (
                      <div key={idx} className="p-3 bg-white/[0.01] border border-white/5 rounded-xl flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <span className="text-sm">{key.icon}</span>
                          <div>
                            <p className="text-[11px] text-white font-bold">{key.network}</p>
                            <p className="text-[10px] text-gray-500 font-mono mt-0.5">{key.address}</p>
                          </div>
                        </div>
                        <button className="text-gray-500 hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-white/5">
                          <Copy size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne 3 : Niveau de KYC & Logs d'activité */}
              <div className="space-y-6">
                <div className="glass-card rounded-[2rem] p-6 text-center space-y-4 relative overflow-hidden">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-2 border border-emerald-500/20">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Fiat Gateway Verification</h4>
                    <p className="text-[11px] text-gray-500 mt-1">Limits for single day wire transfers and fiat on-ramps.</p>
                  </div>
                  <div className="py-2 px-4 bg-white/5 rounded-xl border border-white/5 text-left">
                    <div className="flex justify-between text-[10px] font-bold text-gray-400">
                      <span>Daily Limit Usage</span>
                      <span className="text-white">$0 / $50,000</span>
                    </div>
                    <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-400 h-full w-[0%]" />
                    </div>
                  </div>
                </div>

                <div className="glass-card rounded-[2rem] p-6 space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <History size={14} className="text-indigo-400" /> Recent Security Logs
                  </h3>
                  <div className="space-y-3">
                    {[
                      { action: "Login Authorized", info: "Chrome • Windows 11", time: "2 hours ago" },
                      { action: "API Key Generated", info: "Read-only access", time: "Yesterday" },
                      { action: "2FA Verification Pass", info: "IP: 192.168.1.45", time: "3 days ago" },
                    ].map((log, idx) => (
                      <div key={idx} className="text-[11px] border-b border-white/[0.03] pb-2 last:border-none last:pb-0">
                        <div className="flex justify-between font-bold text-white">
                          <span>{log.action}</span>
                          <span className="text-gray-500 font-normal text-[10px]">{log.time}</span>
                        </div>
                        <p className="text-gray-500 text-[10px] mt-0.5">{log.info}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen relative bg-[#030712]">
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[500px] h-[500px] rounded-full bg-sky-500/10 blur-[130px] pointer-events-none" />
      <Sidebar />
      <main className="ml-64 p-10 w-full max-w-[1600px] mx-auto space-y-8 relative z-10">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
}

export default App;