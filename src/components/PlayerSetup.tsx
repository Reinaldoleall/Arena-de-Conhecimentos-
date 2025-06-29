import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2, Play } from 'lucide-react';
import { Player } from '../types/game';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

const avatars = ['👤', '🧑', '👩', '🧔', '👱', '🧑‍🦱', '👩‍🦱', '🧑‍🦰', '👩‍🦰', '🧑‍🦲'];

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Omit<Player, 'score' | 'isActive'>[]>([
    { id: '1', name: '', avatar: '👤' },
    { id: '2', name: '', avatar: '🧑' }
  ]);

  const addPlayer = () => {
    if (players.length < 6) {
      const newPlayer = {
        id: Date.now().toString(),
        name: '',
        avatar: avatars[players.length % avatars.length]
      };
      setPlayers([...players, newPlayer]);
    }
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const updatePlayer = (id: string, field: 'name' | 'avatar', value: string) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(p => p.name.trim() !== '');
    if (validPlayers.length >= 2) {
      const gamePlayers: Player[] = validPlayers.map((p, index) => ({
        ...p,
        score: 0,
        isActive: index === 0
      }));
      onStartGame(gamePlayers);
    }
  };

  const canStart = players.filter(p => p.name.trim() !== '').length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4"
          >
            <Users className="w-8 h-8 text-primary-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Challenge</h1>
          <p className="text-gray-600">Configure os jogadores para começar o desafio</p>
        </div>

        <div className="space-y-4 mb-8">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex-shrink-0">
                <select
                  value={player.avatar}
                  onChange={(e) => updatePlayer(player.id, 'avatar', e.target.value)}
                  className="text-2xl bg-transparent border-none outline-none cursor-pointer"
                >
                  {avatars.map(avatar => (
                    <option key={avatar} value={avatar}>{avatar}</option>
                  ))}
                </select>
              </div>
              
              <input
                type="text"
                placeholder={`Jogador ${index + 1}`}
                value={player.name}
                onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                maxLength={20}
              />
              
              {players.length > 2 && (
                <button
                  onClick={() => removePlayer(player.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {players.length < 6 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addPlayer}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Adicionar Jogador
            </motion.button>
          )}
          
          <motion.button
            whileHover={{ scale: canStart ? 1.02 : 1 }}
            whileTap={{ scale: canStart ? 0.98 : 1 }}
            onClick={handleStartGame}
            disabled={!canStart}
            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              canStart
                ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-5 h-5" />
            Iniciar Jogo
          </motion.button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Mínimo de 2 jogadores • Máximo de 6 jogadores
        </div>
      </motion.div>
    </div>
  );
};