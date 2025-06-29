import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Trash2, Play, Crown, Gamepad2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Player } from '../types/game';

interface PlayerSetupProps {
  onStartGame: (players: Player[]) => void;
}

const avatars = [
  '🎯', '⚡', '🔥', '💎', '🚀', '⭐', '🎪', '🎨', '🎭', '🎪',
  '🦄', '🐉', '🦅', '🐺', '🦁', '🐯', '🐸', '🦋', '🐙', '🦊'
];

const playerColors = [
  'from-blue-500 to-cyan-500',
  'from-purple-500 to-pink-500',
  'from-green-500 to-emerald-500',
  'from-orange-500 to-red-500',
  'from-yellow-500 to-orange-500',
  'from-indigo-500 to-purple-500'
];

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame }) => {
  const [players, setPlayers] = useState<Omit<Player, 'score' | 'isActive'>[]>([
    { id: '1', name: '', avatar: '🎯' },
    { id: '2', name: '', avatar: '⚡' }
  ]);

  const addPlayer = () => {
    if (players.length < 6) {
      const newPlayer = {
        id: Date.now().toString(),
        name: '',
        avatar: avatars[players.length % avatars.length]
      };
      setPlayers([...players, newPlayer]);
      toast.success('Novo jogador adicionado!');
    } else {
      toast.error('Máximo de 6 jogadores permitido!');
    }
  };

  const removePlayer = (id: string) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
      toast.success('Jogador removido!');
    } else {
      toast.error('Mínimo de 2 jogadores necessário!');
    }
  };

  const updatePlayer = (id: string, field: 'name' | 'avatar', value: string) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleStartGame = () => {
    const validPlayers = players.filter(p => p.name.trim() !== '');
    
    if (validPlayers.length < 2) {
      toast.error('Pelo menos 2 jogadores devem ter nomes!');
      return;
    }

    // Check for duplicate names
    const names = validPlayers.map(p => p.name.trim().toLowerCase());
    const uniqueNames = new Set(names);
    
    if (names.length !== uniqueNames.size) {
      toast.error('Nomes dos jogadores devem ser únicos!');
      return;
    }

    const gamePlayers: Player[] = validPlayers.map((p, index) => ({
      ...p,
      score: 0,
      isActive: index === 0
    }));
    
    toast.success('Iniciando o jogo!');
    onStartGame(gamePlayers);
  };

  const canStart = players.filter(p => p.name.trim() !== '').length >= 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-4xl border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6"
          >
            <Crown className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Quiz Challenge
          </h1>
          <p className="text-purple-200 text-lg">Configure os jogadores e prepare-se para a batalha mental!</p>
        </div>

        {/* Game Rules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-4">
            <Gamepad2 className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Como Jogar</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-purple-200">
            <div className="text-center">
              <div className="text-2xl mb-2">⏱️</div>
              <p className="text-sm">30 segundos por pergunta</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm">Pontos por velocidade</p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🏆</div>
              <p className="text-sm">Maior pontuação vence</p>
            </div>
          </div>
        </motion.div>

        {/* Players Setup */}
        <div className="space-y-4 mb-8">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r ${playerColors[index % playerColors.length]} shadow-lg`}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative flex items-center gap-6">
                <div className="flex-shrink-0">
                  <select
                    value={player.avatar}
                    onChange={(e) => updatePlayer(player.id, 'avatar', e.target.value)}
                    className="text-4xl bg-transparent border-none outline-none cursor-pointer appearance-none"
                  >
                    {avatars.map(avatar => (
                      <option key={avatar} value={avatar}>{avatar}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-white/80 text-sm font-medium mb-2">
                    Jogador {index + 1}
                  </label>
                  <input
                    type="text"
                    placeholder={`Digite o nome do jogador ${index + 1}`}
                    value={player.name}
                    onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:ring-2 focus:ring-white/50 focus:border-transparent outline-none transition-all"
                    maxLength={15}
                  />
                </div>
                
                {players.length > 2 && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removePlayer(player.id)}
                    className="p-3 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-colors border border-red-400/30"
                  >
                    <Trash2 className="w-5 h-5 text-red-300" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {players.length < 6 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addPlayer}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all backdrop-blur-sm"
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
            className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all ${
              canStart
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/25'
                : 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Play className="w-6 h-6" />
            Iniciar Batalha
          </motion.button>
        </div>

        <div className="mt-6 text-center text-purple-300 text-sm">
          <Users className="w-4 h-4 inline mr-2" />
          Mínimo: 2 jogadores • Máximo: 6 jogadores
        </div>
      </motion.div>
    </div>
  );
};