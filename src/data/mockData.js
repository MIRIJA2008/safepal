export const assets = [
  { symbol: "BTC", name: "Bitcoin", amount: 0.125, value: 4250, change: "+5.2%" },
  { symbol: "ETH", name: "Ethereum", amount: 3.2, value: 8960, change: "+2.1%" },
  { symbol: "BNB", name: "Binance Coin", amount: 12.5, value: 3125, change: "-1.3%" },
  { symbol: "SOL", name: "Solana", amount: 45, value: 1125, change: "+8.7%" },
];

export const transactions = [
  { id: 1, type: "send", asset: "BTC", amount: "0.05", value: "$2,100", date: "2025-03-20" },
  { id: 2, type: "receive", asset: "ETH", amount: "1.2", value: "$3,360", date: "2025-03-18" },
  { id: 3, type: "buy", asset: "SOL", amount: "20", value: "$500", date: "2025-03-15" },
];

export const chartData = [
  { date: "2025-03-01", value: 18500 },
  { date: "2025-03-05", value: 19200 },
  { date: "2025-03-10", value: 18800 },
  { date: "2025-03-15", value: 20100 },
  { date: "2025-03-20", value: 21500 },
];