import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Play, Plus, X, TrendingUp, ArrowLeft, RotateCcw, Trophy, 
  Activity, Shield, CheckCircle2, AlertCircle, ChevronRight,
  Target, Lightbulb, BarChart3, DollarSign, Percent, Hash
} from 'lucide-react';
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, ReferenceDot
} from 'recharts';
import { challenges, getChallengeById } from '@/data/challenges';
import { runSimulation, checkObjectives } from '@/lib/simulation';
import type { Challenge, Condition, SimulationResult } from '@/types/challenge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const indicators = [
  { value: 'RSI', label: 'RSI', description: 'Relative Strength Index' },
  { value: 'VOLATILITY', label: 'Volatility', description: 'Price volatility' },
  { value: 'VOLATILITY_MA', label: 'Volatility MA', description: 'Volatility moving average' },
  { value: 'MA_SHORT', label: 'MA (Short)', description: 'Short moving average (20)' },
  { value: 'MA_LONG', label: 'MA (Long)', description: 'Long moving average (50)' },
  { value: 'PRICE', label: 'Price', description: 'Current price' },
];

const operators = [
  { value: '<', label: '<', description: 'Less than' },
  { value: '>', label: '>', description: 'Greater than' },
];


function ChallengeCard({ 
  challenge, 
  onSelect 
}: { 
  challenge: Challenge; 
  onSelect: (c: Challenge) => void;
}) {
  const difficultyConfig = {
    easy: { color: 'emerald', icon: TrendingUp, bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30', badgeColor: 'border-emerald-500/50 text-emerald-400' },
    medium: { color: 'amber', icon: Activity, bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30', badgeColor: 'border-amber-500/50 text-amber-400' },
    hard: { color: 'rose', icon: Shield, bgColor: 'bg-rose-500/10', borderColor: 'border-rose-500/30', badgeColor: 'border-rose-500/50 text-rose-400' },
  };

  const config = difficultyConfig[challenge.difficulty];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(challenge)}
      className={`
        group cursor-pointer relative overflow-hidden
        bg-slate-900/50 border border-slate-800 rounded-xl
        hover:${config.borderColor} transition-all duration-300
        hover:shadow-lg hover:shadow-${config.color}-500/10
      `}
    >
      <div className={`absolute inset-0 ${config.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${config.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 text-${config.color}-400`} />
          </div>
          <Badge variant="outline" className={config.badgeColor}>
            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
          </Badge>
        </div>

        <h3 className="text-xl font-semibold text-slate-200 mb-2 group-hover:text-white transition-colors">
          {challenge.name}
        </h3>
        
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">
          {challenge.description}
        </p>
        
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="px-2 py-1 rounded bg-slate-800">
            {challenge.prices.length} periods
          </span>
          <span className="px-2 py-1 rounded bg-slate-800">
            {challenge.objectives.length} objectives
          </span>
        </div>

        <div className="mt-4 flex items-center text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
          Start Challenge <ChevronRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
}


function RuleRow({ 
  rule, 
  onUpdate, 
  onRemove
}: { 
  rule: Condition; 
  onUpdate: (r: Condition) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
      <Select
        value={rule.lhs}
        onValueChange={(v) => onUpdate({ ...rule, lhs: v as Condition['lhs'] })}
      >
        <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-slate-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700">
          {indicators.map(opt => (
            <SelectItem key={opt.value} value={opt.value} className="text-slate-200">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={rule.op}
        onValueChange={(v) => onUpdate({ ...rule, op: v as Condition['op'] })}
      >
        <SelectTrigger className="w-[80px] bg-slate-900 border-slate-700 text-slate-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700">
          {operators.map(opt => (
            <SelectItem key={opt.value} value={opt.value} className="text-slate-200">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={rule.rhs_type}
        onValueChange={(v) => onUpdate({ 
          ...rule, 
          rhs_type: v as Condition['rhs_type'],
          rhs_value: v === 'CONSTANT' ? 30 : undefined,
          rhs_signal: v === 'SIGNAL' ? 'PRICE' : undefined
        })}
      >
        <SelectTrigger className="w-[120px] bg-slate-900 border-slate-700 text-slate-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-slate-900 border-slate-700">
          <SelectItem value="CONSTANT" className="text-slate-200">Constant</SelectItem>
          <SelectItem value="SIGNAL" className="text-slate-200">Signal</SelectItem>
        </SelectContent>
      </Select>

      {rule.rhs_type === 'CONSTANT' ? (
        <Input
          type="number"
          step="0.1"
          value={rule.rhs_value || 0}
          onChange={(e) => onUpdate({ ...rule, rhs_value: parseFloat(e.target.value) })}
          className="w-[100px] bg-slate-900 border-slate-700 text-slate-200"
        />
      ) : (
        <Select
          value={rule.rhs_signal || 'PRICE'}
          onValueChange={(v) => onUpdate({ ...rule, rhs_signal: v as Condition['rhs_signal'] })}
        >
          <SelectTrigger className="w-[140px] bg-slate-900 border-slate-700 text-slate-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-slate-700">
            {indicators.map(opt => (
              <SelectItem key={opt.value} value={opt.value} className="text-slate-200">
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-slate-500 hover:text-rose-400 hover:bg-rose-500/10"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}


function PriceChart({ 
  prices, 
  trades = [], 
  height = 400 
}: { 
  prices: number[]; 
  trades?: SimulationResult['trades'];
  height?: number;
}) {
  const data = useMemo(() => {
    return prices.map((p, i) => ({ t: i, price: p }));
  }, [prices]);

  const buyTrades = useMemo(() => trades.filter(t => t.type === 'BUY'), [trades]);
  const sellTrades = useMemo(() => trades.filter(t => t.type === 'SELL'), [trades]);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const yDomain = [minPrice - priceRange * 0.1, maxPrice + priceRange * 0.1];

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          
          <XAxis 
            dataKey="t" 
            stroke="#475569"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#475569' }}
          />
          
          <YAxis 
            domain={yDomain}
            stroke="#475569"
            tick={{ fill: '#64748b', fontSize: 12 }}
            tickLine={{ stroke: '#475569' }}
            tickFormatter={(v) => v.toFixed(1)}
          />
          
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              color: '#e2e8f0'
            }}
            labelStyle={{ color: '#94a3b8' }}
            formatter={(value: number) => [value.toFixed(2), 'Price']}
            labelFormatter={(label) => `Period: ${label}`}
          />

          <Area
            type="monotone"
            dataKey="price"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#priceGradient)"
            dot={false}
            activeDot={{ r: 4, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
          />

          {buyTrades.map((trade, i) => (
            <ReferenceDot
              key={`buy-${i}`}
              x={trade.t}
              y={trade.price}
              r={6}
              fill="#10b981"
              stroke="#fff"
              strokeWidth={2}
            />
          ))}

          {sellTrades.map((trade, i) => (
            <ReferenceDot
              key={`sell-${i}`}
              x={trade.t}
              y={trade.price}
              r={6}
              fill="#f43f5e"
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      {trades.length > 0 && (
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
            <span className="text-xs text-slate-400">Buy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white" />
            <span className="text-xs text-slate-400">Sell</span>
          </div>
        </div>
      )}
    </div>
  );
}


function MetricsPanel({ metrics }: { metrics: SimulationResult['metrics'] }) {
  const pnlTrend = metrics.total_pnl > 0 ? 'positive' : metrics.total_pnl < 0 ? 'negative' : 'neutral';
  const winRateTrend = metrics.win_rate > 0.5 ? 'positive' : metrics.win_rate < 0.3 ? 'negative' : 'neutral';

  const trendColors = {
    positive: 'text-emerald-400',
    negative: 'text-rose-400',
    neutral: 'text-slate-400'
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Total P&L</p>
              <p className={`text-2xl font-bold ${trendColors[pnlTrend]}`}>
                {`${metrics.total_pnl >= 0 ? '+' : ''}${metrics.total_pnl.toFixed(2)}`}
              </p>
            </div>
            <DollarSign className="w-5 h-5 text-slate-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Win Rate</p>
              <p className={`text-2xl font-bold ${trendColors[winRateTrend]}`}>
                {`${(metrics.win_rate * 100).toFixed(1)}%`}
              </p>
            </div>
            <Percent className="w-5 h-5 text-slate-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Trades</p>
              <p className="text-2xl font-bold text-slate-300">{metrics.num_trades}</p>
            </div>
            <Hash className="w-5 h-5 text-slate-500" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Max Drawdown</p>
              <p className={`text-2xl font-bold ${metrics.max_drawdown > 5 ? 'text-rose-400' : 'text-slate-300'}`}>
                {metrics.max_drawdown.toFixed(2)}
              </p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function ChallengeMode() {
  const navigate = useNavigate();
  const { challengeId } = useParams();
  
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    challengeId ? getChallengeById(challengeId) || null : null
  );
  
  const [strategy, setStrategy] = useState<{ buy: Condition[]; sell: Condition[] }>({
    buy: [],
    sell: []
  });
  
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [objectivesMet, setObjectivesMet] = useState<boolean[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('strategy');

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
    setStrategy({ buy: [], sell: [] });
    setResult(null);
    setObjectivesMet(null);
    setActiveTab('strategy');
    navigate(`/challenge/${challenge.id}`);
  };

  const handleBack = () => {
    setSelectedChallenge(null);
    setResult(null);
    setObjectivesMet(null);
    navigate('/challenge');
  };

  const addCondition = (type: 'buy' | 'sell') => {
    const newCondition: Condition = {
      lhs: 'RSI',
      op: '<',
      rhs_type: 'CONSTANT',
      rhs_value: 30
    };
    
    setStrategy(prev => ({
      ...prev,
      [type]: [...prev[type], newCondition]
    }));
  };

  const updateCondition = (type: 'buy' | 'sell', index: number, updates: Partial<Condition>) => {
    setStrategy(prev => ({
      ...prev,
      [type]: prev[type].map((c, i) => i === index ? { ...c, ...updates } : c)
    }));
  };

  const removeCondition = (type: 'buy' | 'sell', index: number) => {
    setStrategy(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleRunSimulation = useCallback(async () => {
  if (!selectedChallenge) return;
  if (strategy.buy.length === 0 || strategy.sell.length === 0) {
    return toast.error('Define buy and sell rules');
  }

  setLoading(true);

  try {
    
     const input = {

        market: 'Challenge',

        timesteps: selectedChallenge.prices.length,

        seed: 42,

        strategy,

        prices: selectedChallenge.prices

      };



      const simResult = runSimulation(input);

      setResult(simResult);

    
    const objRes = checkObjectives(simResult, selectedChallenge.objectives);
    setObjectivesMet(objRes);
    
    if (objRes.every(o => o)) toast.success('Challenge completed!');
    setActiveTab('results');
  } catch (error) {
    toast.error('Could not connect to backend at port 8000');
    console.error(error);
  } finally {
    setLoading(false);
  }
}, [selectedChallenge, strategy]);

  const handleReset = () => {
    setStrategy({ buy: [], sell: [] });
    setResult(null);
    setObjectivesMet(null);
  };

  
  if (!selectedChallenge) {
    return (
      <div className="min-h-[calc(100vh-64px-80px)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-[1800px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 text-slate-100">Challenge Mode</h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Test your algorithmic trading strategies against predefined market scenarios. 
              Learn, adapt, and master different market behaviors.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {challenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ChallengeCard
                  challenge={challenge}
                  onSelect={handleSelectChallenge}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-200">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-400">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">1</div>
                    <h4 className="text-slate-200 font-medium">Select Challenge</h4>
                    <p className="text-sm">Choose from easy, medium, or hard scenarios with distinct market behaviors.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">2</div>
                    <h4 className="text-slate-200 font-medium">Build Strategy</h4>
                    <p className="text-sm">Compose buy and sell rules using technical indicators and conditions.</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">3</div>
                    <h4 className="text-slate-200 font-medium">Test & Learn</h4>
                    <p className="text-sm">Run simulations, analyze results, and refine your approach.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  
  const allObjectivesMet = objectivesMet?.every(o => o);

  return (
    <div className="min-h-[calc(100vh-64px-80px)] p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-slate-400 hover:text-slate-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <h1 className="text-xl font-semibold text-slate-200">{selectedChallenge.name}</h1>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`
                    ${selectedChallenge.difficulty === 'easy' ? 'border-emerald-500/50 text-emerald-400' : ''}
                    ${selectedChallenge.difficulty === 'medium' ? 'border-amber-500/50 text-amber-400' : ''}
                    ${selectedChallenge.difficulty === 'hard' ? 'border-rose-500/50 text-rose-400' : ''}
                  `}
                >
                  {selectedChallenge.difficulty.charAt(0).toUpperCase() + selectedChallenge.difficulty.slice(1)}
                </Badge>
                <span className="text-xs text-slate-500">{selectedChallenge.behavior}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="border-slate-700 text-slate-400 hover:text-slate-200"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handleRunSimulation}
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Activity className="w-4 h-4 mr-2" />
                </motion.div>
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              Run Simulation
            </Button>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-slate-900 border border-slate-800">
            <TabsTrigger value="strategy" className="data-[state=active]:bg-slate-800">
              Strategy Builder
            </TabsTrigger>
            <TabsTrigger value="chart" className="data-[state=active]:bg-slate-800">
              Price Chart
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-slate-800" disabled={!result}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="strategy" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Strategy Builder */}
              <div className="lg:col-span-2 space-y-6">
                {/* Buy Conditions */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-200 flex items-center gap-2">
                        <Badge className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30">BUY</Badge>
                        Conditions
                      </CardTitle>
                      <span className="text-xs text-slate-500">All conditions must be met (AND logic)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {strategy.buy.length === 0 && (
                      <div className="text-center py-6 text-slate-500 text-sm border border-dashed border-slate-700 rounded-lg">
                        No buy conditions defined
                      </div>
                    )}
                    {strategy.buy.map((condition, index) => (
                      <RuleRow
                        key={index}
                        rule={condition}
                        onUpdate={(updates) => updateCondition('buy', index, updates)}
                        onRemove={() => removeCondition('buy', index)}
                      />
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addCondition('buy')}
                      className="w-full border-slate-700 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Buy Condition
                    </Button>
                  </CardContent>
                </Card>

                {/* Sell Conditions */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-slate-200 flex items-center gap-2">
                        <Badge className="bg-rose-500/20 text-rose-400 hover:bg-rose-500/30">SELL</Badge>
                        Conditions
                      </CardTitle>
                      <span className="text-xs text-slate-500">All conditions must be met (AND logic)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {strategy.sell.length === 0 && (
                      <div className="text-center py-6 text-slate-500 text-sm border border-dashed border-slate-700 rounded-lg">
                        No sell conditions defined
                      </div>
                    )}
                    {strategy.sell.map((condition, index) => (
                      <RuleRow
                        key={index}
                        rule={condition}
                        onUpdate={(updates) => updateCondition('sell', index, updates)}
                        onRemove={() => removeCondition('sell', index)}
                      />
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addCondition('sell')}
                      className="w-full border-slate-700 text-slate-400 hover:text-rose-400 hover:border-rose-500/50 hover:bg-rose-500/10"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Sell Condition
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Objectives */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-slate-200 flex items-center gap-2">
                      <Target className="w-5 h-5 text-amber-400" />
                      Objectives
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {selectedChallenge.objectives.map((obj, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`
                            w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-medium
                            ${objectivesMet && objectivesMet[i] ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}
                          `}>
                            {objectivesMet && objectivesMet[i] ? '✓' : i + 1}
                          </div>
                          <div>
                            <p className="text-slate-300 text-sm">{obj.description}</p>
                            <p className="text-slate-500 text-xs">
                              Target: {obj.type === 'win_rate' ? `${(obj.target * 100).toFixed(0)}%` : 
                                       obj.type === 'max_drawdown' ? `< ${obj.target}%` :
                                       obj.target}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Hints */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-slate-200 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-cyan-400" />
                      Hints
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedChallenge.hints.map((hint, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-cyan-500 flex-shrink-0">•</span>
                          {hint}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Why This Works */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-slate-200 text-sm">Why This Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {selectedChallenge.whyItWorks.map((reason, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                          <span className="text-emerald-500 flex-shrink-0">→</span>
                          {reason}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chart">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-slate-200">Price Action</CardTitle>
              </CardHeader>
              <CardContent>
                <PriceChart 
                  prices={selectedChallenge.prices}
                  trades={result?.trades || []}
                  height={400}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            {result && objectivesMet && (
              <div className="space-y-6">
                {/* Challenge Result */}
                <Card className={`
                  border-2 
                  ${allObjectivesMet ? 'bg-emerald-950/20 border-emerald-500/50' : 'bg-slate-900/50 border-slate-800'}
                `}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {allObjectivesMet ? (
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-amber-400" />
                          </div>
                        )}
                        <div>
                          <CardTitle className={allObjectivesMet ? 'text-emerald-400' : 'text-amber-400'}>
                            {allObjectivesMet ? 'Challenge Completed!' : 'Challenge Incomplete'}
                          </CardTitle>
                          <p className="text-slate-500 text-sm">
                            {objectivesMet.filter(o => o).length} of {objectivesMet.length} objectives met
                          </p>
                        </div>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={allObjectivesMet ? 'border-emerald-500/50 text-emerald-400' : 'border-amber-500/50 text-amber-400'}
                      >
                        {allObjectivesMet ? 'PASSED' : 'RETRY NEEDED'}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium text-slate-400">Objective Results</h4>
                      <div className="space-y-2">
                        {selectedChallenge.objectives.map((obj, i) => (
                          <div 
                            key={i} 
                            className={`
                              flex items-center justify-between p-3 rounded-lg
                              ${objectivesMet[i] ? 'bg-emerald-500/10' : 'bg-rose-500/10'}
                            `}
                          >
                            <div className="flex items-center gap-3">
                              {objectivesMet[i] ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-rose-400" />
                              )}
                              <span className={objectivesMet[i] ? 'text-emerald-300' : 'text-rose-300'}>
                                {obj.description}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className={`
                                text-sm font-medium
                                ${objectivesMet[i] ? 'text-emerald-400' : 'text-rose-400'}
                              `}>
                                {obj.type === 'profit' && `${result.metrics.total_pnl >= 0 ? '+' : ''}${result.metrics.total_pnl.toFixed(2)}`}
                                {obj.type === 'win_rate' && `${(result.metrics.win_rate * 100).toFixed(1)}%`}
                                {obj.type === 'max_drawdown' && `${result.metrics.max_drawdown.toFixed(2)}`}
                                {obj.type === 'trades' && `${result.metrics.num_trades}`}
                                {obj.type === 'survival' && (result.metrics.total_pnl > -5 ? 'Yes' : 'No')}
                              </span>
                              <span className="text-slate-500 text-xs ml-2">
                                (target: {obj.type === 'win_rate' ? `${(obj.target * 100).toFixed(0)}%` : 
                                          obj.type === 'max_drawdown' ? `< ${obj.target}` :
                                          obj.target})
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {!allObjectivesMet && (
                      <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <p className="text-amber-400 text-sm">
                          <strong>Tip:</strong> Review the hints and adjust your strategy. 
                          Consider the market behavior: <em>{selectedChallenge.behavior}</em>
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Metrics */}
                <MetricsPanel metrics={result.metrics} />

                {/* Trade Chart */}
                <Card className="bg-slate-900/50 border-slate-800">
                  <CardHeader>
                    <CardTitle className="text-slate-200">Trade Visualization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PriceChart 
                      prices={selectedChallenge.prices}
                      trades={result.trades}
                      height={400}
                    />
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
