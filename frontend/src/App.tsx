import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { TrendingUp, Home, Trophy, Info } from 'lucide-react';
import { Button } from './components/ui/button';
import ChallengeMode from './pages/ChallengeMode';
import  SandboxMode  from './pages/SandboxMode';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import myLogo from './logo.png'
import './App.css';



function Layout() {
  const location = useLocation();
  const isChallenge = location.pathname.startsWith('/challenge');

  // redirection logic for future use
  // const handleRedirect = () => {
  //   console.log("attempting")
  //   window.location.href = 'http://localhost:9999/';
  // };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-6 rounded-lg object-contain transition-transform hover:scale-110">
                <img src={myLogo} alt='Logo' />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  AXIOM
                </h1>
                <p className="text-xs text-slate-400">Algorithmic Trading Sandbox</p>
              </div>
            </Link>

            <nav className="flex items-center gap-2">
              <Link to="/sandbox">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`${location.pathname === '/' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 hover:text-slate-200'}`}
                  
                >
                  <Home className="w-4 h-4 mr-2" />
                  Sandbox
                </Button>
              </Link>
              
              <Link to="/challenge">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`${isChallenge ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Trophy className="w-4 h-4 mr-2" />
                  Challenges
                </Button>
              </Link>
              <Link to="/about">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className={`${location.pathname === '/about' ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Info className="w-4 h-4 mr-2" />
                  About
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
              <Route path="/sandbox" element={<SandboxMode />} />
              <Route path="/challenge" element={<ChallengeMode />} />
              <Route path="/challenge/:challengeId" element={<ChallengeMode />} />
              <Route path="/about" element={<About/>} />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      
      <footer className="border-t border-slate-800 bg-slate-900/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>AXIOM - Educational Algorithmic Trading Sandbox</span>
            </div>
            <div className="text-slate-600 text-xs">
              For educational purposes only. Not financial advice.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}




function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
