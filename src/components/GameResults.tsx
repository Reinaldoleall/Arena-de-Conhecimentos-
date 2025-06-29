import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Trophy, Medal, Award, RotateCcw, Users, Crown, Star, Zap } from 'lucide-react';
import { Player } from '../types/game';

interface GameResultsProps {
  players: Player[];
  onRestart: () => void;
}

export const GameResults: React.FC<GameResultsProps> = ({ players, onRestart }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const totalQuestions = 15;

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 0: return <Crown className="w-8 h-8 text-yellow-400" />;
      case 1: return <Medal className="w-8 h-8 text-gray-300" />;
      case 2: return <Award className="w-8 h-8 text-amber-500" />;
      default: return (
        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full text-white font-bold">
          {position + 1}
        </div>
      );
    }
  };

  const getPositionGradient = (position: number) => {
    switch (position) {
      case 0: return 'from-yellow-400 via-yellow-500 to-yellow-600';
      case 1: return 'from-gray-300 via-gray-400 to-gray-500';
      case 2: return 'from-amber-400 via-amber-500 to-amber-600';
      default: return 'from-slate-400 via-slate-500 to-slate-600';
    }
  };

  const getPositionText = (position: number) => {
    switch (position) {
      case 0: return '🏆 CAMPEÃO';
      case 1: return '🥈 Vice-Campeão';
      case 2: return '🥉 Terceiro Lugar';
      default: return `${position + 1}º Lugar`;
    }
  };

  const getPerformanceLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return { level: 'Excepcional', icon: Crown, color: 'text-yellow-400' };
    if (percentage >= 60) return { level: 'Excelente', icon: Star, color: 'text-purple-400' };
    if (percentage >= 40) return { level: 'Bom', icon: Zap, color: 'text-blue-400' };
    return { level: 'Regular', icon: Trophy, color: 'text-gray-400' };
  };

  const maxScore = Math.max(...players.map(p => p.score));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full mb-6 shadow-lg shadow-yellow-500/25"
          >
            <Trophy className="w-12 h-12 text-yellow-900" />
          </motion.div>
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Batalha Finalizada!
          </h1>
          <p className="text-purple-200 text-xl">Os resultados do Quiz Challenge estão aqui</p>
        </motion.div>

        {/* Winner Spotlight */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
          className="relative overflow-hidden bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl p-8 mb-8 text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent"></div>
          <div className="relative">
            <div className="text-8xl mb-4">{winner.avatar}</div>
            <h2 className="text-4xl font-bold text-yellow-900 mb-2">{winner.name}</h2>
            <p className="text-yellow-800 text-2xl font-bold mb-6">👑 CAMPEÃO ABSOLUTO 👑</p>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 inline-block">
              <p className="text-yellow-900 font-bold text-3xl">{winner.score}</p>
              <p className="text-yellow-800 text-lg">pontos conquistados</p>
            </div>
          </div>
        </motion.div>

        {/* Rankings */}
        <div className="space-y-4 mb-8">
          {sortedPlayers.map((player, index) => {
            const performance = getPerformanceLevel(player.score, maxScore);
            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`relative overflow-hidden bg-gradient-to-r ${getPositionGradient(index)} rounded-2xl p-6 shadow-xl`}
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {getPositionIcon(index)}
                    <div className="text-5xl">{player.avatar}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{player.name}</h3>
                      <p className="text-white/90 font-semibold text-lg">{getPositionText(index)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <performance.icon className={`w-4 h-4 ${performance.color}`} />
                        <span className={`text-sm font-medium ${performance.color}`}>
                          {performance.level}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{player.score}</div>
                    <div className="text-white/80 text-sm">pontos</div>
                    <div className="text-white/60 text-xs">
                      {Math.round((player.score / maxScore) * 100)}% do máximo
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Game Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 shadow-xl border border-white/20"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-purple-400" />
            Estatísticas da Batalha
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-purple-400 mb-2">{totalQuestions}</div>
              <div className="text-purple-200">Perguntas</div>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-green-400 mb-2">{players.length}</div>
              <div className="text-purple-200">Jogadores</div>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-yellow-400 mb-2">{maxScore}</div>
              <div className="text-purple-200">Maior Pontuação</div>
            </div>
            
            <div className="text-center p-6 bg-white/5 rounded-2xl border border-white/10">
              <div className="text-3xl font-bold text-pink-400 mb-2">
                {Math.round(players.reduce((sum, p) => sum + p.score, 0) / players.length)}
              </div>
              <div className="text-purple-200">Média de Pontos</div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRestart}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/25 hover:shadow-xl transition-all"
          >
            <RotateCcw className="w-6 h-6" />
            Nova Batalha
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-lg backdrop-blur-sm border border-white/20 transition-all"
          >
            <Users className="w-6 h-6" />
            Novos Jogadores
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};