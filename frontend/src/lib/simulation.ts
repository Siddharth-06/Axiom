import type { SimulationInput, SimulationResult, Condition } from '@/types/challenge';


export type SignalType = 'RSI' | 'VOLATILITY' | 'MA_SHORT' | 'MA_LONG' | 'PRICE' | 'VOLATILITY_MA';

<<<<<<< HEAD
// Compute RSI for a price series
=======

>>>>>>> 10bb505 (serious meow)
export function computeRSI(prices: number[], period: number = 14): number[] {
  const rsi: number[] = new Array(prices.length).fill(50);
  
  if (prices.length < period + 1) return rsi;
  
  let gains = 0;
  let losses = 0;
  
  
  for (let i = 1; i <= period; i++) {
    const change = prices[i] - prices[i - 1];
    if (change > 0) gains += change;
    else losses -= change;
  }
  
  let avgGain = gains / period;
  let avgLoss = losses / period;
  
  for (let i = period; i < prices.length; i++) {
    const change = prices[i] - prices[i - 1];
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? -change : 0;
    
    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;
    
    if (avgLoss === 0) {
      rsi[i] = 100;
    } else {
      const rs = avgGain / avgLoss;
      rsi[i] = 100 - (100 / (1 + rs));
    }
  }
  
  return rsi;
}


export function computeSMA(prices: number[], period: number): number[] {
  const sma: number[] = new Array(prices.length).fill(0);
  
  for (let i = period - 1; i < prices.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += prices[i - j];
    }
    sma[i] = sum / period;
  }
  
  return sma;
}


export function computeVolatility(prices: number[], period: number = 20): number[] {
  const vol: number[] = new Array(prices.length).fill(0);
  
  for (let i = period - 1; i < prices.length; i++) {
    let sum = 0;
    for (let j = 0; j < period; j++) {
      sum += prices[i - j];
    }
    const mean = sum / period;
    
    let sumSq = 0;
    for (let j = 0; j < period; j++) {
      sumSq += Math.pow(prices[i - j] - mean, 2);
    }
    vol[i] = Math.sqrt(sumSq / period);
  }
  
  return vol;
}


export function computeAllSignals(prices: number[]) {
  return {
    PRICE: prices,
    RSI: computeRSI(prices, 14),
    MA_SHORT: computeSMA(prices, 20),
    MA_LONG: computeSMA(prices, 50),
    VOLATILITY: computeVolatility(prices, 20),
    VOLATILITY_MA: computeSMA(computeVolatility(prices, 20), 50)
  };
}


export function getSignal(signals: ReturnType<typeof computeAllSignals>, type: SignalType, t: number): number {
  return signals[type][t] || 0;
}


export function evaluateCondition(
  signals: ReturnType<typeof computeAllSignals>,
  condition: Condition,
  t: number
): boolean {
  const left = getSignal(signals, condition.lhs, t);
  
  let right: number;
  if (condition.rhs_type === 'SIGNAL' && condition.rhs_signal) {
    right = getSignal(signals, condition.rhs_signal, t);
  } else {
    right = condition.rhs_value || 0;
  }
  
  switch (condition.op) {
    case '>': return left > right;
    case '<': return left < right;
    case '=': return Math.abs(left - right) < 0.0001;
    default: return false;
  }
}


export function runSimulation(input: SimulationInput): SimulationResult {
  const prices = input.prices || [];
  const signals = computeAllSignals(prices);
  
  const trades: SimulationResult['trades'] = [];
  let inPosition = false;
  let entryPrice = 0;
  let equity = 0;
  let winCount = 0;
  let tradeCount = 0;
  let maxDrawdown = 0;
  let peak = 0;
  
  
  const startIndex = Math.min(50, prices.length - 1);
  
  for (let t = startIndex; t < prices.length; t++) {
    
    let buySignal = input.strategy.buy.length > 0;
    for (const condition of input.strategy.buy) {
      if (!evaluateCondition(signals, condition, t)) {
        buySignal = false;
        break;
      }
    }
    
    
    let sellSignal = input.strategy.sell.length > 0;
    for (const condition of input.strategy.sell) {
      if (!evaluateCondition(signals, condition, t)) {
        sellSignal = false;
        break;
      }
    }
    
    
    if (!inPosition && buySignal) {
      inPosition = true;
      entryPrice = prices[t];
      trades.push({ t, type: 'BUY', price: prices[t] });
    } else if (inPosition && sellSignal) {
      inPosition = false;
      const pnl = prices[t] - entryPrice;
      equity += pnl;
      tradeCount++;
      if (pnl > 0) winCount++;
      trades.push({ t, type: 'SELL', price: prices[t], pnl });
      
      
      peak = Math.max(peak, equity);
      const dd = peak - equity;
      if (dd > maxDrawdown) maxDrawdown = dd;
    }
  }
  
  return {
    prices,
    trades,
    metrics: {
      total_pnl: Math.round(equity * 100) / 100,
      num_trades: tradeCount,
      win_rate: tradeCount > 0 ? Math.round((winCount / tradeCount) * 100) / 100 : 0,
      max_drawdown: Math.round(maxDrawdown * 100) / 100
    }
  };
}


export function checkObjectives(
  result: SimulationResult,
  objectives: { type: string; target: number; description: string }[]
): boolean[] {
  return objectives.map(obj => {
    switch (obj.type) {
      case 'profit':
        return result.metrics.total_pnl >= obj.target;
      case 'win_rate':
        return result.metrics.win_rate >= obj.target;
      case 'max_drawdown':
        return result.metrics.max_drawdown <= obj.target;
      case 'survival':
<<<<<<< HEAD
        return result.metrics.total_pnl > -5; // Survived if not catastrophic loss
=======
        return result.metrics.total_pnl > -5;
>>>>>>> 10bb505 (serious meow)
      case 'trades':
        return result.metrics.num_trades >= obj.target;
      default:
        return false;
    }
  });
}
