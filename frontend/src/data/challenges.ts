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
<<<<<<< HEAD
      100, 99.5, 99, 98.7, 99.2, 99.8,
      100.3, 100.8, 101.2, 100.7, 100.1,
      99.6, 99.1, 98.9, 99.4, 100,
      100.5, 101, 101.3, 100.9, 100.2,
      99.7, 99.2, 98.8, 99.3, 99.9,
      100.4, 100.9, 101.1, 100.6
    ],
=======
      100.0, 99.8, 99.5, 99.2, 99.0, 99.3, 99.7, 100.1, 100.5, 100.8,
      101.0, 100.7, 100.3, 99.9, 99.5, 99.2, 99.0, 99.4, 99.9, 100.3,
      100.7, 101.0, 101.2, 100.9, 100.4, 100.0, 99.6, 99.3, 99.1, 99.4,
      99.8, 100.2, 100.6, 101.0, 101.3, 101.0, 100.6, 100.1, 99.7, 99.4,
      99.2, 99.5, 99.9, 100.4, 100.8, 101.1, 101.3, 101.0, 100.5, 100.1,
      99.7, 99.3, 99.1, 99.4, 99.8, 100.2, 100.6, 101.0, 101.2, 100.9,
      100.4, 100.0, 99.6, 99.3, 99.1, 99.4, 99.8, 100.3, 100.7, 101.0,
      101.2, 100.9, 100.5, 100.1, 99.7, 99.4, 99.2, 99.5, 99.9, 100.3,
      100.7, 101.0, 101.2, 100.9, 100.5, 100.1, 99.7, 99.4, 99.2, 99.6
    ],

>>>>>>> 10bb505 (serious meow)
    objectives: [
      { type: 'profit', target: 2.0, description: 'Achieve positive P&L' },
      { type: 'trades', target: 3, description: 'Complete at least 3 trades' }
    ],
    hints: [
      'Look for RSI values below 30 to identify oversold conditions',
      'Sell when RSI rises above 70 (overbought)',
      'The price tends to return to the mean (100)'
<<<<<<< HEAD
=======
    ],
    resources: [
      { 
      title: 'Understanding RSI', 
      url: 'https://www.investopedia.com/terms/r/rsi.asp', 
      type: 'Guide' 
      },
      { 
      title: 'Mean Reversion Strategies', 
      url: 'https://www.investopedia.com/terms/m/meanreversion.asp', 
      type: 'Guide' 
      }
>>>>>>> 10bb505 (serious meow)
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
<<<<<<< HEAD
      100, 100.2, 99.8, 100.1, 99.9,
      100.3, 99.7, 100.0, 99.8, 100.1,
      103.5, 101.2, 99.6, 100.0,
      100.2, 99.9, 100.1, 99.7,
      96.8, 98.9, 100.1,
      100.0, 99.8, 100.2,
      102.9, 101.0, 99.5, 100.0
=======
      100.0, 100.2, 99.9, 100.1, 99.8, 100.0, 100.3, 99.7, 100.1, 99.9,
      100.2, 100.0, 99.8, 100.1, 99.9, 100.0, 100.2, 99.8, 100.0, 99.7,
      103.5, 101.8, 100.4, 99.9, 100.1, 99.8, 100.0, 99.9, 100.2, 99.8,
      100.0, 99.7, 96.5, 98.2, 99.6, 100.1, 99.9, 100.2, 99.8, 100.0,
      100.1, 99.7, 100.0, 99.8, 100.2, 99.9, 100.0, 100.1, 99.8, 100.0,
      102.8, 101.2, 100.0, 99.7, 100.0, 99.9, 100.1, 99.8, 100.0, 99.7,
      100.0, 99.8, 100.1, 99.9, 100.0, 100.2, 99.8, 100.0, 99.7, 100.0,
      97.0, 98.9, 99.8, 100.1, 99.9, 100.2, 99.8, 100.0, 99.7, 100.0,
      100.1, 99.9, 100.2, 99.8, 100.0, 99.7, 100.0, 100.1, 99.8, 100.0

>>>>>>> 10bb505 (serious meow)
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
<<<<<<< HEAD
=======
    ],
    resources: [
      {
        title: "Take advantage of market volatility",
        url: "https://stockaxis.com/blogs/take-advantage-of-market-volatility",
        type: "article"
      },
      {
        title: "Fake breakouts",
        url: "https://www.fxgiants.com/fxg/how-to-spot-fake-breakouts-in-a-high-volatility-market/",
        type: "article"
      }

>>>>>>> 10bb505 (serious meow)
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
<<<<<<< HEAD
      100, 100.4, 100.8, 101.2, 101.5,
      101.8, 102.0, 101.9,
      96.5, 92.3, 88.7, 85.1, 82.9,
      84.2, 87.6, 91.8,
      89.4, 93.1, 90.2,
      95.6, 92.0, 97.4,
      94.1, 99.3, 96.8,
      101.2, 98.7, 103.5
=======
      100.0, 100.4, 100.8, 101.2, 101.6, 101.9, 102.2, 102.4, 102.6, 102.8,
      103.0, 103.2, 103.4, 103.6, 103.8, 104.0, 104.2, 104.4, 104.6, 104.8,
      100.5, 96.0, 92.3, 88.7, 85.2, 82.0, 79.5, 77.8, 76.2, 75.0,
      74.5, 74.0, 73.8, 74.2, 75.1, 76.8, 78.5, 80.9, 83.2, 85.6,
      88.9, 86.3, 89.8, 87.1, 91.5, 88.0, 93.4, 90.2, 95.0, 91.8,
      96.7, 93.0, 98.5, 95.2, 100.3, 97.1, 102.0, 98.8, 103.5, 100.2,
      104.8, 101.5, 106.2, 103.0, 108.5, 105.1, 110.8, 107.0, 112.3, 109.0,
      114.0, 110.5, 116.8, 113.2, 118.5, 115.0, 120.2, 116.7, 121.5, 118.0
>>>>>>> 10bb505 (serious meow)
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
<<<<<<< HEAD
=======
    ],
    resources: [
      {
        title: "Market Regime Shift",
        url: "https://www.ecb.europa.eu/press/financial-stability-publications/fsr/focus/2018/pdf/ecb~bcaaae16c3.fsrbox201805_03.pdf",
        type: "article"
      },
      {
        title: "Market Specefic Strategies",
        url: "https://www.quantconnect.com/forum/discussion/14818/rage-against-the-regimes-the-illusion-of-market-specific-strategies/",
        type: "article"
      }
>>>>>>> 10bb505 (serious meow)
    ]
  }
];

export const getChallengeById = (id: string): Challenge | undefined => {
  return challenges.find(c => c.id === id);
};

export const getChallengesByDifficulty = (difficulty: Challenge['difficulty']) => {
  return challenges.filter(c => c.difficulty === difficulty);
};
