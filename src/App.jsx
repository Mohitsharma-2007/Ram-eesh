import React, { useState } from 'react';
import BoltStyleChat from './components/ui/bolt-style-chat';
import LandingPage from './components/LandingPage';
import About from './components/About';
import Academics from './components/Academics';
import Placements from './components/Placements';

function App() {
  const [view, setView] = useState('landing'); // landing | chat | about | academics | placements

  const handleStart = () => {
    setView('chat');
  };

  return (
    <div className="app-container">
      {view === 'landing' && <LandingPage onStart={handleStart} onNavigate={setView} />}
      {view === 'chat' && <BoltStyleChat onBack={() => setView('landing')} onNavigate={setView} />}
      {view === 'about' && <About onBack={() => setView('landing')} />}
      {view === 'academics' && <Academics onBack={() => setView('landing')} />}
      {view === 'placements' && <Placements onBack={() => setView('landing')} />}
    </div>
  );
}

export default App;
