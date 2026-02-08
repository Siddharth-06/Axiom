import { motion } from 'framer-motion';
import { 
  Activity, 
  Code2, 
  Cpu, 
  GitBranch, 
  Layers, 
  Shield, 
  Zap,
  TrendingUp,
  BarChart3,
  BookOpen,
  Users,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target
} from 'lucide-react';

const About = () => {
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

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Synthetic Market Simulations',
      description: 'Test strategies on artificially generated market data with different regimes - trending, sideways, and mean reversion.'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Deterministic Results',
      description: 'Use seeded randomness to reproduce exact same market conditions for consistent strategy testing.'
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Parameter-Based Strategies',
      description: 'Configure strategies using simple parameters without writing complex code or scripts.'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Clear Performance Metrics',
      description: 'Get comprehensive metrics including PnL, drawdown, win rate, and trade history.'
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Explainable Logic',
      description: 'Every strategy decision is transparent and understandable - no black-box predictions.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Risk-Free Learning',
      description: 'Learn algorithmic trading concepts without risking real money or dealing with live markets.'
    }
  ];

  const techStack = [
    {
      layer: 'Frontend',
      icon: <Layers className="w-5 h-5" />,
      tech: 'React + TypeScript + Vite + Tailwind CSS',
      description: 'Modern, responsive UI with real-time charting and interactive controls'
    },
    {
      layer: 'Backend',
      icon: <GitBranch className="w-5 h-5" />,
      tech: 'Flask (Python)',
      description: 'Lightweight orchestration layer that bridges frontend and engine'
    },
    {
      layer: 'Engine',
      icon: <Cpu className="w-5 h-5" />,
      tech: 'C++ High-Performance Core',
      description: 'Custom-built simulation engine for strategy execution and metric computation'
    }
  ];

  const team = [
    { name: 'Siddharth', role: 'Project Lead & Engine Developer', github: 'Siddharth-06' },
    { name: 'Manas Agrawal', role: 'Frontend & UI Developer', github: 'ManasAgrawal098' },
    { name: 'Qafirnaal', role: 'Backend & Integration', github: 'qafirnaal' },
  ];

  const strategies = [
    {
      name: 'RSI Oversold/Overbought',
      description: 'Classic mean reversion strategy using Relative Strength Index',
      buy: 'RSI < 30',
      sell: 'RSI > 70'
    },
    {
      name: 'Moving Average Crossover',
      description: 'Trend following strategy using short and long moving averages',
      buy: 'MA_SHORT > MA_LONG',
      sell: 'MA_SHORT < MA_LONG'
    },
    {
      name: 'Volatility Breakout',
      description: 'Enter trades when volatility exceeds its moving average',
      buy: 'VOLATILITY > VOLATILITY_MA',
      sell: 'Price < MA'
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px-80px)]">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[150px] opacity-20"
          style={{ background: 'var(--axiom-accent)' }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-[150px] opacity-10"
          style={{ background: 'var(--axiom-success)' }}
        />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-5xl mx-auto text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-2xl flex items-center justify-center animate-pulse-glow"
              style={{ 
                background: 'linear-gradient(135deg, var(--axiom-accent) 0%, #00c8ff 100%)',
              }}
            >
              <Activity className="w-10 h-10" style={{ color: 'var(--axiom-bg)' }} />
            </div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="axiom-gradient-text">AXIOM</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl sm:text-2xl mb-4"
            style={{ color: 'var(--axiom-text-dim)' }}
          >
            Educational Algorithmic Trading Simulator
          </motion.p>

          <motion.p 
            variants={itemVariants}
            className="text-base max-w-2xl mx-auto mb-8"
            style={{ color: 'var(--axiom-text-muted)' }}
          >
            A simulation-first platform designed to help you understand how algorithmic trading 
            strategies behave under different market conditions — without real money, live markets, 
            or black-box predictions.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: 'var(--axiom-panel)', border: '1px solid var(--axiom-border)' }}
            >
              <Zap className="w-4 h-4 text-[var(--axiom-accent)]" />
              <span style={{ color: 'var(--axiom-text-dim)' }}>High-Performance C++ Engine</span>
            </div>
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: 'var(--axiom-panel)', border: '1px solid var(--axiom-border)' }}
            >
              <CheckCircle2 className="w-4 h-4 text-[var(--axiom-success)]" />
              <span style={{ color: 'var(--axiom-text-dim)' }}>Deterministic Results</span>
            </div>
            <div 
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm"
              style={{ background: 'var(--axiom-panel)', border: '1px solid var(--axiom-border)' }}
            >
              <BookOpen className="w-4 h-4 text-[var(--axiom-warning)]" />
              <span style={{ color: 'var(--axiom-text-dim)' }}>Educational Focus</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--axiom-border)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why AXIOM?</h2>
            <p className="text-base" style={{ color: 'var(--axiom-text-dim)' }}>
              Learning algorithmic trading today often requires advanced mathematics, heavy coding, 
              or experimentation with real financial risk. AXIOM addresses this gap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
<<<<<<< HEAD
                //initial={{ opacity: 0, y: 20 }}
                //whileInView={{ opacity: 1, y: 0 }}
                //viewport={{ once: true }}
                //transition={{ duration: 0.5, delay: idx * 0.1 }}
                //whileHover={{ y: -5, borderColor: 'var(--axiom-accent)' }}
=======
                // initial={{ opacity: 0, y: 20 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true }}
                // transition={{ duration: 0.5, delay: idx * 0.1 }}
                // whileHover={{ y: -5, borderColor: 'var(--axiom-accent)' }}
>>>>>>> 10bb505 (serious meow)
                className="p-6 rounded-xl border transition-all duration-300"
                style={{ background: 'var(--axiom-panel)', borderColor: 'var(--axiom-border)' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: 'var(--axiom-panel-hover)' }}
                >
                  <div style={{ color: 'var(--axiom-accent)' }}>{feature.icon}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm" style={{ color: 'var(--axiom-text-dim)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      {/* Architecture Section */}
=======
      
>>>>>>> 10bb505 (serious meow)
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--axiom-border)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Architecture</h2>
            <p className="text-base" style={{ color: 'var(--axiom-text-dim)' }}>
              AXIOM follows a clean, layered architecture where each layer is independent and replaceable.
            </p>
          </div>

          <div className="space-y-4">
            {techStack.map((layer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-xl border"
                style={{ background: 'var(--axiom-panel)', borderColor: 'var(--axiom-border)' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--axiom-panel-hover)' }}
                >
                  <div style={{ color: 'var(--axiom-accent)' }}>{layer.icon}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--axiom-accent)' }}>
                      {layer.layer}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{layer.tech}</h3>
                  <p className="text-sm" style={{ color: 'var(--axiom-text-dim)' }}>
                    {layer.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

<<<<<<< HEAD
          {/* Architecture Diagram */}
=======
          
>>>>>>> 10bb505 (serious meow)
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 p-6 rounded-xl border text-center"
            style={{ background: 'var(--axiom-panel)', borderColor: 'var(--axiom-border)' }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="px-6 py-3 rounded-lg border" style={{ borderColor: 'var(--axiom-accent)', background: 'rgba(0, 242, 255, 0.05)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--axiom-accent)' }}>React Frontend</span>
              </div>
              <div className="text-2xl" style={{ color: 'var(--axiom-text-dim)' }}>↓</div>
              <div className="px-6 py-3 rounded-lg border" style={{ borderColor: 'var(--axiom-warning)', background: 'rgba(255, 184, 0, 0.05)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--axiom-warning)' }}>Flask Backend</span>
              </div>
              <div className="text-2xl" style={{ color: 'var(--axiom-text-dim)' }}>↓</div>
              <div className="px-6 py-3 rounded-lg border" style={{ borderColor: 'var(--axiom-success)', background: 'rgba(34, 255, 136, 0.05)' }}>
                <span className="text-sm font-medium" style={{ color: 'var(--axiom-success)' }}>C++ Engine</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

<<<<<<< HEAD
      {/* Example Strategies Section */}
=======
      
>>>>>>> 10bb505 (serious meow)
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--axiom-border)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Example Strategies</h2>
            <p className="text-base" style={{ color: 'var(--axiom-text-dim)' }}>
              AXIOM supports various classic algorithmic trading strategies out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategies.map((strategy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-xl border"
                style={{ background: 'var(--axiom-panel)', borderColor: 'var(--axiom-border)' }}
              >
                <h3 className="text-lg font-semibold mb-2">{strategy.name}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--axiom-text-dim)' }}>
                  {strategy.description}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[var(--axiom-success)]/20 text-[var(--axiom-success)] font-mono">
                      BUY
                    </span>
                    <span className="mono" style={{ color: 'var(--axiom-text-dim)' }}>
                      {strategy.buy}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-[var(--axiom-danger)]/20 text-[var(--axiom-danger)] font-mono">
                      SELL
                    </span>
                    <span className="mono" style={{ color: 'var(--axiom-text-dim)' }}>
                      {strategy.sell}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      {/* Team Section */}
=======
      
>>>>>>> 10bb505 (serious meow)
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--axiom-border)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Users className="w-5 h-5" style={{ color: 'var(--axiom-accent)' }} />
              <h2 className="text-2xl sm:text-3xl font-bold">Team</h2>
            </div>
            <p className="text-base" style={{ color: 'var(--axiom-text-dim)' }}>
              AXIOM is built by a team of undergraduate engineers with interests in systems programming, 
              quantitative finance, and simulation-based learning.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map((member, idx) => (
              <motion.a
                key={idx}
                href={`https://github.com/${member.github}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'var(--axiom-accent)' }}
                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-300"
                style={{ background: 'var(--axiom-panel)', borderColor: 'var(--axiom-border)' }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'var(--axiom-panel-hover)' }}
                >
                  <Github className="w-6 h-6" style={{ color: 'var(--axiom-accent)' }} />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm" style={{ color: 'var(--axiom-text-dim)' }}>
                    {member.role}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 ml-2" style={{ color: 'var(--axiom-text-dim)' }} />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      {/* Disclaimer Section */}
=======
      
>>>>>>> 10bb505 (serious meow)
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t" style={{ borderColor: 'var(--axiom-border)' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div 
            className="p-6 rounded-xl border flex items-start gap-4"
            style={{ 
              background: 'rgba(255, 71, 87, 0.05)', 
              borderColor: 'rgba(255, 71, 87, 0.3)' 
            }}
          >
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: 'var(--axiom-danger)' }} />
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--axiom-danger)' }}>
                Educational Disclaimer
              </h3>
              <p className="text-sm mb-3" style={{ color: 'var(--axiom-text-dim)' }}>
                AXIOM is strictly for <strong>educational purposes</strong>. It does not provide financial advice, 
                investment recommendations, or real trading functionality.
              </p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--axiom-text-muted)' }}>
                <li>• No real money is involved</li>
                <li>• No connection to live markets</li>
                <li>• Past simulation performance does not guarantee future results</li>
                <li>• Always consult a financial advisor before making investment decisions</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

<<<<<<< HEAD
      {/* GitHub CTA */}
=======

>>>>>>> 10bb505 (serious meow)
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Open Source</h2>
          <p className="text-base mb-6" style={{ color: 'var(--axiom-text-dim)' }}>
            AXIOM is open source. Check out the code, contribute, or fork it for your own projects.
          </p>
          <motion.a
            href="https://github.com/Siddharth-06/AXIOM---algo-trading-sandbox"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            style={{ 
              background: 'var(--axiom-panel)',
              border: '1px solid var(--axiom-border)',
              color: 'var(--axiom-text)'
            }}
          >
            <Github className="w-5 h-5" />
            View on GitHub
            <ExternalLink className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
