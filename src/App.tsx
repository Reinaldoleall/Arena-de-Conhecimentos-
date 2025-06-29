import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { PlayerSetup } from './components/PlayerSetup';
import { GameBoard } from './components/GameBoard';
import { GameResults } from './components/GameResults';
import { LoadingScreen } from './components/LoadingScreen';
import { Player } from './types/game';

type GamePhase = 'setup' | 'loading' | 'playing' | 'results';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);

  const handleStartGame = (gamePlayers: Player[]) => {
    setPlayers(gamePlayers);
    setGamePhase('loading');
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setGamePhase('playing');
    }, 2000);
  };

  const handleGameEnd = (finalPlayers: Player[]) => {
    setPlayers(finalPlayers);
    setGamePhase('results');
  };

  const handleRestart = () => {
    setGamePhase('setup');
    setPlayers([]);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#f1f5f9',
            border: '1px solid #475569',
          },
        }}
      />
      
      {gamePhase === 'setup' && (
        <PlayerSetup onStartGame={handleStartGame} />
      )}
      
      {gamePhase === 'loading' && (
        <LoadingScreen players={players} />
      )}
      
      {gamePhase === 'playing' && (
        <GameBoard 
          players={players} 
          onGameEnd={handleGameEnd}
          onRestart={handleRestart}
        />
      )}
      
      {gamePhase === 'results' && (
        <GameResults 
          players={players} 
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;