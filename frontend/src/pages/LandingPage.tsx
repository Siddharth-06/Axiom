import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; //
import { 
  TrendingUp, 
  Play, 
  ArrowRight, 
  BarChart3, 
  Target, 
  Code2, 
  Lightbulb, 
  Shield,
  Zap,
  ChevronDown,
  Github,
  BookOpen,
  Activity,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate(); //
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      icon: <BarChart3 className="w-6 h-6" />,
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
      icon: <Activity className="w-6 h-6" />,
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
      description: 'Learn algorithmic trading without risking real money or needing live market access.'
    }
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Choose Your Mode',
      description: 'Select between Sandbox mode for free exploration or Challenge mode to test specific scenarios.'
    },
    {
      step: '02',
      title: 'Configure Strategy',
      description: 'Set up your trading strategy parameters - entry rules, exit conditions, and risk management.'
    },
    {
      step: '03',
      title: 'Run Simulation',
      description: 'Execute your strategy against synthetic market data and watch it perform in real-time.'
    },
    {
      step: '04',
      title: 'Analyze Results',
      description: 'Review detailed performance metrics and understand why your strategy succeeded or failed.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
          
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"
            style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.03}px)` }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
            style={{ transform: `translate(${scrollY * -0.05}px, ${scrollY * 0.03}px)` }}
          />
          
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 mb-8"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-slate-300">Educational Algorithmic Trading Simulator</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-white">Master</span>{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Algorithmic Trading
            </span>
            <br />
            <span className="text-white">Without Risk</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Axiom is a simulation-first platform that helps you understand how trading strategies 
            behave under different market conditions — no real money, no live markets, no black-box predictions.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
              onClick={() => navigate('/challenge')} 
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Getting Started
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 px-8 py-6 text-lg font-semibold rounded-xl transition-all hover:scale-105"
              onClick={() => navigate('/sandbox')}
            >
              <Play className="w-5 h-5 mr-2" />
              Simulation
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">0</div>
              <div className="text-sm text-slate-500 mt-1">Real Money Risked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">∞</div>
              <div className="text-sm text-slate-500 mt-1">Simulations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">100%</div>
              <div className="text-sm text-slate-500 mt-1">Educational</div>
            </div>
          </motion.div>

          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => scrollToSection('features')}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </section>

      
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Powerful Features
              </span>{' '}
              <span className="text-white">for Learning</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to understand algorithmic trading strategies without the complexity or risk.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="group p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:bg-slate-800/50"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 text-emerald-400 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section id="how-it-works" className="py-24 relative bg-slate-900/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">How It</span>{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Works
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 max-w-2xl mx-auto">
              Get started with Axiom in four simple steps.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="relative">
                <div className="text-6xl font-bold text-slate-800 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-slate-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      
      <section id="about" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  About
                </span>{' '}
                <span className="text-white">Axiom</span>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants} className="prose prose-invert max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Learning algorithmic trading today often requires advanced mathematics, heavy coding, 
                or experimentation with real financial risk. Axiom addresses this gap by providing 
                a safe, educational environment where you can explore trading strategies.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 my-10">
                <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                  <h4 className="text-emerald-400 font-semibold mb-2">Our Mission</h4>
                  <p className="text-slate-400 text-sm">
                    To make algorithmic trading education accessible to everyone, regardless of 
                    technical background or financial resources.
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800">
                  <h4 className="text-cyan-400 font-semibold mb-2">Our Approach</h4>
                  <p className="text-slate-400 text-sm">
                    Focus on understanding why strategies work, not on predicting markets or 
                    generating profits.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-400 text-xs">!</span>
                  </div>
                  <div>
                    <h4 className="text-amber-400 font-semibold mb-1">Disclaimer</h4>
                    <p className="text-slate-400 text-sm">
                      Axiom is strictly for educational purposes. It does not provide financial advice 
                      and does not execute real trades. Past simulation performance does not indicate 
                      future results.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Ready to Start</span>{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Learning?
              </span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 mb-8">
              Dive into the world of algorithmic trading with zero risk. Explore strategies, 
              run simulations, and understand how markets work.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all hover:scale-105"
                onClick={() => navigate('/challenge')}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Try Challenges
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-slate-700 bg-slate-900/50 hover:bg-slate-800 text-slate-200 px-8 py-6 text-lg font-semibold rounded-xl transition-all hover:scale-105"
                onClick={() => navigate('/sandbox')}
              >
                <Activity className="w-5 h-5 mr-2" />
                Go to Sandbox
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;