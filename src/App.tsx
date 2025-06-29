import React, { useState } from 'react';
import { PlayerSetup } from './components/PlayerSetup';
import { GameBoard } from './components/GameBoard';
import { GameResults } from './components/GameResults';
import { Player } from './types/game';

type GamePhase = 'setup' | 'playing' | 'results';

function App() {
  const [gamePhase, setGamePhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);

  const handleStartGame = (gamePlayers: Player[]) => {
    setPlayers(gamePlayers);
    setGamePhase('playing');
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
    <div className="App">
      {gamePhase === 'setup' && (
        <PlayerSetup onStartGame={handleStartGame} />
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