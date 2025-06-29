import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, RotateCcw, Users } from 'lucide-react';
import { Player } from '../types/game';

interface GameResultsProps {
  players: Player[];
  onRestart: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({ players, onRestart }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const totalQuestions = 10;

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 0: return <Trophy className="w-8 h-8 text-yellow-500" />;
      case 1: return <Medal className="w-8 h-8 text-gray-400" />;
      case 2: return <Award className="w-8 h-8 text-amber-600" />;
      default: return <div className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 font-bold">{position + 1}</div>;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 0: return 'from-yellow-400 to-yellow-600';
      case 1: return 'from-gray-300 to-gray-500';
      case 2: return 'from-amber-400 to-amber-600';
      default: return 'from-gray-200 to-gray-400';
    }
  };

  const getPositionText = (position: number) => {
    switch (position) {
      case 0: return '🥇 Campeão';
      case 1: return '🥈 Vice-Campeão';
      case 2: return '🥉 Terceiro Lugar';
      default: return `${position + 1}º Lugar`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-4"
          >
            <Trophy className="w-10 h-10 text-yellow-800" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2">Jogo Finalizado!</h1>
          <p className="text-primary-200 text-lg">Confira os resultados do Quiz Challenge</p>
        </motion.div>

        {/* Winner Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-2xl p-8 mb-8 text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">{winner.avatar}</div>
          <h2 className="text-3xl font-bold text-yellow-900 mb-2">{winner.name}</h2>
          <p className="text-yellow-800 text-xl font-semibold mb-4">🏆 CAMPEÃO 🏆</p>
          <div className="bg-white/20 rounded-xl p-4 inline-block">
            <p className="text-yellow-900 font-bold text-2xl">{winner.score} pontos</p>
          </div>
        </motion.div>

        {/* Rankings */}
        <div className="space-y-4 mb-8">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`bg-gradient-to-r ${getPositionColor(index)} rounded-xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getPositionIcon(index)}
                  <div className="text-4xl">{player.avatar}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{player.name}</h3>
                    <p className="text-white/80 font-medium">{getPositionText(index)}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{player.score}</div>
                  <div className="text-white/80 text-sm">pontos</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Game Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl p-6 mb-8 shadow-xl"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users className="w-6 h-6" />
            Estatísticas do Jogo
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-primary-600">{totalQuestions}</div>
              <div className="text-gray-600 text-sm">Perguntas</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-success-600">{players.length}</div>
              <div className="text-gray-600 text-sm">Jogadores</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">{Math.max(...players.map(p => p.score))}</div>
              <div className="text-gray-600 text-sm">Maior Pontuação</div>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(players.reduce((sum, p) => sum + p.score, 0) / players.length)}
              </div>
              <div className="text-gray-600 text-sm">Média de Pontos</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Jogar Novamente
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            <Users className="w-5 h-5" />
            Novos Jogadores
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};