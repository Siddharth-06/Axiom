// Challenge Types for AXIOM Trading Sandbox

export interface Challenge {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  behavior: string;
  whyItWorks: string[];
  prices: number[];
  objectives: ChallengeObjective[];
  hints: string[];
  resources: ChallengeResources[];
}

export interface ChallengeResources{
  title: string;
  url: string;
  type: string;
}
export interface ChallengeObjective {
  type: 'profit' | 'win_rate' | 'max_drawdown' | 'survival' | 'trades';
  target: number;
  description: string;
}

export interface ChallengeResult {
  challengeId: string;
  completed: boolean;
  metrics: {
    totalPnl: number;
    numTrades: number;
    winRate: number;
    maxDrawdown: number;
  };
  objectivesMet: boolean[];
  timestamp: number;
}

export interface Rule {
  lhs: string;
  op: '<' | '>';
  rhs_type: 'CONSTANT' | 'SIGNAL';
  rhs_value: number;
  rhs_signal?: string;
}

export interface Strategy {
  buy: Rule[];
  sell: Rule[];
}

export interface SimulationResult {
  prices: number[];
  trades: Array<{
    t: number;
    type: 'BUY' | 'SELL';
    price: number;
    pnl?: number;
  }>;
  metrics: {
    total_pnl: number;
    max_drawdown: number;
    win_rate: number;
    num_trades: number;
  };
}

export interface Condition {
  lhs: 'RSI' | 'VOLATILITY' | 'MA_SHORT' | 'MA_LONG' | 'PRICE' | 'VOLATILITY_MA';
  op: '>' | '<' | '=';
  rhs_type: 'CONSTANT' | 'SIGNAL';
  rhs_value?: number;
  rhs_signal?: 'RSI' | 'VOLATILITY' | 'MA_SHORT' | 'MA_LONG' | 'PRICE' | 'VOLATILITY_MA';
}

export interface StrategyConfig {
  name: string;
  buy: Condition[];
  sell: Condition[];
}

export interface SimulationInput {
  market: string;
  timesteps: number;
  seed: number;
  strategy: {
    buy: Condition[];
    sell: Condition[];
  };
  prices?: number[];
}
