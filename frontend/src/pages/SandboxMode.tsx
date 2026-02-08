import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Plus, 
  X, 
  TrendingUp, 
  TrendingDown, 
  Activity,
  Settings,
  BarChart3,
  DollarSign,
  Percent,
  Hash,
  Loader2,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Rule {
  lhs: string;
  op: '<' | '>';
  rhs_type: 'CONSTANT' | 'SIGNAL';
<<<<<<< HEAD
  rhs_value: number;
=======
  rhs_value: number | null;
>>>>>>> 10bb505 (serious meow)
  rhs_signal?: string;
}

interface Strategy {
  buy: Rule[];
  sell: Rule[];
}

interface SimulationResult {
  prices: number[];
  trades: Array<{
    t: number;
    type: 'BUY' | 'SELL';
    pnl?: number;
  }>;
  metrics: {
    total_pnl: number;
    max_drawdown: number;
    win_rate: number;
    num_trades: number;
  };
}

const indicators = [
  { value: 'RSI', label: 'RSI', description: 'Relative Strength Index' },
  { value: 'VOLATILITY', label: 'Volatility', description: 'Price volatility' },
  { value: 'VOLATILITY_MA', label: 'Volatility MA', description: 'Volatility moving average' },
  { value: 'MA', label: 'MA (Short)', description: 'Short moving average' },
  { value: 'MA_LONG', label: 'MA (Long)', description: 'Long moving average' },
  { value: 'Price', label: 'Price', description: 'Current price' },
];

const operators = [
  { value: '<', label: '<', description: 'Less than' },
  { value: '>', label: '>', description: 'Greater than' },
];

const rhsTypes = [
  { value: 'CONSTANT', label: 'Value', description: 'Constant numeric value' },
  { value: 'SIGNAL', label: 'Signal', description: 'Another indicator' },
];

const SandboxMode = () => {
  // State
  const [market, setMarket] = useState<'Trending' | 'Sideways' | 'Mean Reversion'>('Trending');
  const [timesteps, setTimesteps] = useState(1000);
  const [seed, setSeed] = useState(42);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const [strategy, setStrategy] = useState<Strategy>({
    buy: [{ lhs: 'RSI', op: '<', rhs_type: 'CONSTANT', rhs_value: 30 }],
    sell: [{ lhs: 'RSI', op: '>', rhs_type: 'CONSTANT', rhs_value: 70 }],
  });

  
  const handleUpdateRule = (side: 'buy' | 'sell', index: number, field: keyof Rule, value: any) => {
    const newRules = [...strategy[side]];
    newRules[index] = { ...newRules[index], [field]: value };
    setStrategy({ ...strategy, [side]: newRules });
  };

  const addRule = (side: 'buy' | 'sell') => {
    setStrategy({
      ...strategy,
      [side]: [...strategy[side], { lhs: 'Price', op: '>', rhs_type: 'CONSTANT', rhs_value: 0 }],
    });
  };

  const removeRule = (side: 'buy' | 'sell', index: number) => {
    if (strategy[side].length <= 1) return;
    const newRules = strategy[side].filter((_, i) => i !== index);
    setStrategy({ ...strategy, [side]: newRules });
  };

  const handleRunSimulation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const payloadStrategy = {
        buy: strategy.buy.map(r => ({
          lhs: r.lhs,
          op: r.op,
          rhs_type: r.rhs_type,
          rhs_value: r.rhs_type === 'CONSTANT' ? r.rhs_value : 0,
          rhs_signal: r.rhs_type === 'SIGNAL' ? (r.rhs_signal || 'RSI') : 'Price',
        })),
        sell: strategy.sell.map(r => ({
          lhs: r.lhs,
          op: r.op,
          rhs_type: r.rhs_type,
          rhs_value: r.rhs_type === 'CONSTANT' ? r.rhs_value : 0,
          rhs_signal: r.rhs_type === 'SIGNAL' ? (r.rhs_signal || 'RSI') : 'Price',
        })),
      };

      const response = await fetch('http://localhost:8000/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          market,
          timesteps,
          seed,
          strategy: payloadStrategy,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    } catch (e: any) {
      console.error(e);
      setError(e.message || 'Failed to run simulation');
    } finally {
      setLoading(false);
    }
  };

  
  const priceSeries = useMemo(() => {
    if (!result?.prices) return [];
    return result.prices.map((p, i) => ({ t: i, price: p }));
  }, [result]);

  const pnlSeries = useMemo(() => {
    if (!result?.prices) return [];
    let currentPnl = 0;
    const series = [];
    const tradeMap: Record<number, number> = {};
    
    if (result.trades) {
      result.trades.forEach(t => {
        if (t.type === 'SELL' && t.pnl) tradeMap[t.t] = t.pnl;
      });
    }
    
    for (let i = 0; i < result.prices.length; i++) {
      if (tradeMap[i]) currentPnl += tradeMap[i];
      series.push({ t: i, pnl: currentPnl });
    }
    return series;
  }, [result]);

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-64px-80px)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        
        <AnimatePresence>
          {showSuccessToast && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className="fixed top-20 left-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
              style={{ 
                background: 'var(--axiom-success)',
                color: 'var(--axiom-bg)'
              }}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Simulation completed successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>

        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className="fixed top-20 left-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg"
              style={{ 
                background: 'var(--axiom-danger)',
                color: 'white'
              }}
            >
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold">{error}</span>
              <button 
                onClick={() => setError(null)}
                className="ml-2 hover:opacity-70"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="axiom-panel p-5 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-4 h-4" style={{ color: 'var(--axiom-accent)' }} />
                <span className="axiom-label">Strategy Configuration</span>
              </div>

              
              <div className="mb-6">
                <label className="axiom-label block mb-3">Market Regime</label>
                <div className="grid grid-cols-1 gap-2">
                  {(['Trending', 'Sideways', 'Mean Reversion'] as const).map((m) => (
                    <motion.button
                      key={m}
                      onClick={() => setMarket(m)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-300
                        ${market === m 
                          ? 'border-[var(--axiom-accent)] bg-[var(--axiom-accent)]/10' 
                          : 'border-[var(--axiom-border)] hover:border-[var(--axiom-border-hover)]'
                        }
                      `}
                    >
                      {m === 'Trending' && <TrendingUp className={`w-4 h-4 ${market === m ? 'text-[var(--axiom-accent)]' : 'text-[var(--axiom-text-dim)]'}`} />}
                      {m === 'Sideways' && <Activity className={`w-4 h-4 ${market === m ? 'text-[var(--axiom-accent)]' : 'text-[var(--axiom-text-dim)]'}`} />}
                      {m === 'Mean Reversion' && <TrendingDown className={`w-4 h-4 ${market === m ? 'text-[var(--axiom-accent)]' : 'text-[var(--axiom-text-dim)]'}`} />}
                      <span className={`text-sm font-medium ${market === m ? 'text-white' : 'text-[var(--axiom-text-dim)]'}`}>
                        {m}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              
              <div className="mb-6 space-y-4">
                <div>
                  <label className="axiom-label block mb-2">Timesteps</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--axiom-text-dim)]" />
                    <input
                      type="number"
                      value={timesteps}
                      onChange={(e) => setTimesteps(Number(e.target.value))}
                      className="axiom-input w-full pl-10 pr-4 py-2.5 text-sm"
                      min={100}
                      max={10000}
                    />
                  </div>
                </div>
                <div>
                  <label className="axiom-label block mb-2">Random Seed</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--axiom-text-dim)]" />
                    <input
                      type="number"
                      value={seed}
                      onChange={(e) => setSeed(Number(e.target.value))}
                      className="axiom-input w-full pl-10 pr-4 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              
              <div className="mb-4">
                <label className="axiom-label block mb-3">Logic Gate</label>
                <div className="flex border-b border-[var(--axiom-border)]">
                  <button
                    onClick={() => setActiveTab('buy')}
                    className={`axiom-tab flex-1 ${activeTab === 'buy' ? 'active' : ''}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <TrendingUp className="w-3 h-3" />
                      Buy
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab('sell')}
                    className={`axiom-tab flex-1 ${activeTab === 'sell' ? 'active' : ''}`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <TrendingDown className="w-3 h-3" />
                      Sell
                    </span>
                  </button>
                </div>
              </div>

              
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                <AnimatePresence mode="popLayout">
                  {strategy[activeTab].map((rule, idx) => (
                    <motion.div
                      key={idx}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-3 rounded-lg border border-[var(--axiom-border)] bg-[var(--axiom-panel-hover)]"
                    >
                      <div className="grid grid-cols-4 gap-2 items-center">
                        
                        <div className="relative">
                          <select
                            value={rule.lhs}
                            onChange={(e) => handleUpdateRule(activeTab, idx, 'lhs', e.target.value)}
                            className="axiom-select w-full text-xs py-2"
                          >
                            {indicators.map((i) => (
                              <option key={i.value} value={i.value}>{i.label}</option>
                            ))}
                          </select>
                        </div>

                        
                        <div className="relative">
                          <select
                            value={rule.op}
                            onChange={(e) => handleUpdateRule(activeTab, idx, 'op', e.target.value)}
                            className="axiom-select w-full text-xs py-2 text-center"
                          >
                            {operators.map((op) => (
                              <option key={op.value} value={op.value}>{op.label}</option>
                            ))}
                          </select>
                        </div>

                        
                        <div className="relative">
                          <select
                            value={rule.rhs_type}
                            onChange={(e) => handleUpdateRule(activeTab, idx, 'rhs_type', e.target.value)}
                            className="axiom-select w-full text-xs py-2"
                          >
                            {rhsTypes.map((t) => (
                              <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                          </select>
                        </div>

                        
                        <div className="flex items-center gap-1">
                          {rule.rhs_type === 'CONSTANT' ? (
                            <input
                              type="number"
<<<<<<< HEAD
                              value={rule.rhs_value}
                              onChange={(e) => handleUpdateRule(activeTab, idx, 'rhs_value', Number(e.target.value))}
=======
                              value={rule.rhs_value ?? ""}
                              onChange={(e) => {
                                const v = e.target.value;
                                handleUpdateRule(
                                  activeTab,
                                  idx,
                                  'rhs_value',
                                  v === "" ? null : Number(v)
                                );
                              }}
>>>>>>> 10bb505 (serious meow)
                              className="axiom-input w-full text-xs py-2 px-1000"
                            />
                          ) : (
                            <select
                              value={rule.rhs_signal || 'RSI'}
                              onChange={(e) => handleUpdateRule(activeTab, idx, 'rhs_signal', e.target.value)}
                              className="axiom-select w-full text-xs py-2"
                            >
                              {indicators.map((i) => (
                                <option key={i.value} value={i.value}>{i.label}</option>
                              ))}
                            </select>
                          )}
                          <button
                            onClick={() => removeRule(activeTab, idx)}
                            disabled={strategy[activeTab].length <= 1}
                            className="p-1.5 rounded hover:bg-[var(--axiom-danger)]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                          >
                            <X className="w-3 h-3 text-[var(--axiom-danger)]" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              
              <motion.button
                onClick={() => addRule(activeTab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-3 py-2.5 rounded-lg border border-dashed border-[var(--axiom-border)] text-[var(--axiom-text-dim)] hover:text-[var(--axiom-accent)] hover:border-[var(--axiom-accent)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add Condition
              </motion.button>

              
              <motion.button
                onClick={handleRunSimulation}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="axiom-button w-full mt-6 py-3.5 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Running Simulation...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Run Simulation
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          
          <motion.div variants={itemVariants} className="lg:col-span-6">
            <div className="space-y-6">
              
              <div className="axiom-panel p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" style={{ color: 'var(--axiom-accent)' }} />
                    <span className="axiom-label">Price Evolution</span>
                  </div>
                  {result && (
                    <span className="text-xs mono" style={{ color: 'var(--axiom-text-dim)' }}>
                      {result.prices.length} data points
                    </span>
                  )}
                </div>
                <div className="h-[280px] grid-bg rounded-lg p-4">
                  {priceSeries.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[var(--axiom-text-dim)]">
                      <Activity className="w-12 h-12 mb-3 opacity-30" />
                      <p className="text-sm">Run simulation to see price data</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={priceSeries}>
                        <defs>
                          <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--axiom-accent)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--axiom-accent)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="var(--axiom-border)" vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="t" hide />
                        <YAxis 
                          domain={['auto', 'auto']} 
                          hide 
                          tickFormatter={(v) => v.toFixed(2)}
                        />
                        <Tooltip 
                          contentStyle={{
                            background: 'var(--axiom-panel)',
                            border: '1px solid var(--axiom-border)',
                            borderRadius: '8px',
                          }}
                          labelStyle={{ color: 'var(--axiom-text-dim)' }}
                          itemStyle={{ color: 'var(--axiom-accent)', fontFamily: 'JetBrains Mono' }}
                          formatter={(value: number) => [value.toFixed(4), 'Price']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="var(--axiom-accent)" 
                          strokeWidth={2}
                          fill="url(#priceGradient)"
                          dot={false}
                          activeDot={{ r: 4, fill: 'var(--axiom-accent)', stroke: 'var(--axiom-bg)', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              
              <div className="axiom-panel p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" style={{ color: 'var(--axiom-success)' }} />
                    <span className="axiom-label">Cumulative PnL</span>
                  </div>
                  {result && (
                    <span 
                      className={`text-xs mono font-bold ${result.metrics.total_pnl >= 0 ? 'text-[var(--axiom-success)]' : 'text-[var(--axiom-danger)]'}`}
                    >
                      {result.metrics.total_pnl >= 0 ? '+' : ''}{result.metrics.total_pnl.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="h-[280px] grid-bg rounded-lg p-4">
                  {pnlSeries.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-[var(--axiom-text-dim)]">
                      <DollarSign className="w-12 h-12 mb-3 opacity-30" />
                      <p className="text-sm">Run simulation to see PnL data</p>
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={pnlSeries}>
                        <defs>
                          <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--axiom-success)" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="var(--axiom-success)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid stroke="var(--axiom-border)" vertical={false} strokeDasharray="3 3" />
                        <XAxis dataKey="t" hide />
                        <YAxis hide />
                        <Tooltip 
                          contentStyle={{
                            background: 'var(--axiom-panel)',
                            border: '1px solid var(--axiom-border)',
                            borderRadius: '8px',
                          }}
                          labelStyle={{ color: 'var(--axiom-text-dim)' }}
                          itemStyle={{ color: 'var(--axiom-success)', fontFamily: 'JetBrains Mono' }}
                          formatter={(value: number) => [`${value >= 0 ? '+' : ''}${value.toFixed(2)}`, 'PnL']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="pnl" 
                          stroke="var(--axiom-success)" 
                          strokeWidth={2}
                          fill="url(#pnlGradient)"
                          dot={false}
                          activeDot={{ r: 4, fill: 'var(--axiom-success)', stroke: 'var(--axiom-bg)', strokeWidth: 2 }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="axiom-panel p-5 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4" style={{ color: 'var(--axiom-accent)' }} />
                <span className="axiom-label">Performance Metrics</span>
              </div>

              {result?.metrics ? (
                <div className="grid grid-cols-1 gap-4">
                  {/* Total PnL */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="axiom-metric-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="axiom-metric-label">Total PnL</span>
                      <DollarSign className="w-4 h-4 text-[var(--axiom-text-dim)]" />
                    </div>
                    <div 
                      className="axiom-metric-value"
                      style={{ 
                        color: result.metrics.total_pnl >= 0 ? 'var(--axiom-success)' : 'var(--axiom-danger)'
                      }}
                    >
                      {result.metrics.total_pnl >= 0 ? '+' : ''}{result.metrics.total_pnl.toFixed(2)}
                    </div>
                  </motion.div>

                  {/* Max Drawdown */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="axiom-metric-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="axiom-metric-label">Max Drawdown</span>
                      <TrendingDown className="w-4 h-4 text-[var(--axiom-text-dim)]" />
                    </div>
                    <div className="axiom-metric-value" style={{ color: 'var(--axiom-danger)' }}>
                      {result.metrics.max_drawdown.toFixed(2)}
                    </div>
                  </motion.div>

                  {/* Win Rate */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="axiom-metric-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="axiom-metric-label">Win Rate</span>
                      <Percent className="w-4 h-4 text-[var(--axiom-text-dim)]" />
                    </div>
                    <div 
                      className="axiom-metric-value"
                      style={{ 
                        color: result.metrics.win_rate >= 0.5 ? 'var(--axiom-success)' : 'var(--axiom-warning)'
                      }}
                    >
                      {(result.metrics.win_rate * 100).toFixed(1)}%
                    </div>
                  </motion.div>

                  {/* Trade Count */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="axiom-metric-card"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="axiom-metric-label">Total Trades</span>
                      <Hash className="w-4 h-4 text-[var(--axiom-text-dim)]" />
                    </div>
                    <div className="axiom-metric-value" style={{ color: 'var(--axiom-accent)' }}>
                      {result.metrics.num_trades}
                    </div>
                  </motion.div>

                  {/* Trade List */}
                  {result.trades && result.trades.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4"
                    >
                      <span className="axiom-label block mb-3">Recent Trades</span>
                      <div className="max-h-[200px] overflow-y-auto space-y-2">
                        {result.trades.slice(-10).map((trade, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-2 rounded-lg bg-[var(--axiom-panel-hover)] text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <span 
                                className={`w-2 h-2 rounded-full ${
                                  trade.type === 'BUY' ? 'bg-[var(--axiom-success)]' : 'bg-[var(--axiom-danger)]'
                                }`}
                              />
                              <span className="text-[var(--axiom-text-dim)]">{trade.type}</span>
                            </div>
                            <span className="mono text-[var(--axiom-text-dim)]">t={trade.t}</span>
                            {trade.pnl !== undefined && (
                              <span 
                                className={`mono font-medium ${
                                  trade.pnl >= 0 ? 'text-[var(--axiom-success)]' : 'text-[var(--axiom-danger)]'
                                }`}
                              >
                                {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="h-[300px] flex flex-col items-center justify-center text-[var(--axiom-text-dim)]">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-pulse-glow"
                    style={{ background: 'var(--axiom-panel-hover)' }}
                  >
                    <Activity className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-sm">Ready to simulate</p>
                  <p className="text-xs mt-1 opacity-60">Configure and run to see metrics</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SandboxMode;
