import type { Challenge } from '@/types/challenge';

export const challenges: Challenge[] = [
  {
    id: 'mean-reversion-basics',
    name: 'Mean Reversion Basics',
    difficulty: 'easy',
    description: 'A stable market oscillating around a mean value with low volatility. Perfect for learning RSI-based strategies.',
    behavior: 'Oscillates around 100, low volatility',
    whyItWorks: [
      'Clear RSI signals',
      'Predictable reversions',
      'Visually calm'
    ],
    prices: [
      100, 99.5, 99, 98.7, 99.2, 99.8,
      100.3, 100.8, 101.2, 100.7, 100.1,
      99.6, 99.1, 98.9, 99.4, 100,
      100.5, 101, 101.3, 100.9, 100.2,
      99.7, 99.2, 98.8, 99.3, 99.9,
      100.4, 100.9, 101.1, 100.6
    ],
    objectives: [
      { type: 'profit', target: 2.0, description: 'Achieve positive P&L' },
      { type: 'trades', target: 3, description: 'Complete at least 3 trades' }
    ],
    hints: [
      'Look for RSI values below 30 to identify oversold conditions',
      'Sell when RSI rises above 70 (overbought)',
      'The price tends to return to the mean (100)'
    ]
  },
  {
    id: 'false-comfort',
    name: 'False Comfort',
    difficulty: 'medium',
    description: 'A sideways market that lulls you into complacency before sudden volatility shocks test your risk management.',
    behavior: 'Range-bound + sudden spikes',
    whyItWorks: [
      'Looks safe → isn\'t',
      'Punishes naive momentum',
      'Teaches volatility awareness'
    ],
    prices: [
      100, 100.2, 99.8, 100.1, 99.9,
      100.3, 99.7, 100.0, 99.8, 100.1,
      103.5, 101.2, 99.6, 100.0,
      100.2, 99.9, 100.1, 99.7,
      96.8, 98.9, 100.1,
      100.0, 99.8, 100.2,
      102.9, 101.0, 99.5, 100.0
    ],
    objectives: [
      { type: 'profit', target: 1.0, description: 'Survive with positive P&L' },
      { type: 'max_drawdown', target: 3.0, description: 'Keep max drawdown below 3%' },
      { type: 'win_rate', target: 0.4, description: 'Maintain 40%+ win rate' }
    ],
    hints: [
      'Volatility spikes can be detected using volatility indicators',
      'Don\'t chase breakouts - they often reverse quickly',
      'Consider using volatility-based position sizing'
    ]
  },
  {
    id: 'regime-shock',
    name: 'Regime Shock',
    difficulty: 'hard',
    description: 'The ultimate test: stability followed by a crash and chaotic recovery. Survival is the only victory. ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ',
    behavior: 'Stability → crash → chaotic recovery',
    whyItWorks: [
      'Emotional chart',
      'Clear regime break',
      'Survival > profit'
    ],
    prices: [
      100, 100.4, 100.8, 101.2, 101.5,
      101.8, 102.0, 101.9,
      96.5, 92.3, 88.7, 85.1, 82.9,
      84.2, 87.6, 91.8,
      89.4, 93.1, 90.2,
      95.6, 92.0, 97.4,
      94.1, 99.3, 96.8,
      101.2, 98.7, 103.5
    ],
    objectives: [
      { type: 'survival', target: 1, description: 'Survive the crash' },
      { type: 'max_drawdown', target: 5.0, description: 'Limit drawdown to under 5%' },
      { type: 'trades', target: 2, description: 'Execute at least 2 trades' }
    ],
    hints: [
      'The crash is sudden - watch for volatility expansion',
      'Traditional mean reversion fails during regime changes',
      'Sometimes the best trade is no trade'
    ]
  }
];

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(c => c.id === id);
};

export const getChallengesByDifficulty = (difficulty: Challenge['difficulty']) => {
  return challenges.filter(c => c.difficulty === difficulty);
};
