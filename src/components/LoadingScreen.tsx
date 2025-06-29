import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target } from 'lucide-react';
import { Player } from '../types/game';

interface LoadingScreenProps {
  players: Player[];
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ players }) => {
  const loadingSteps = [
    { icon: Brain, text: 'Preparando perguntas...', delay: 0 },
    { icon: Zap, text: 'Configurando desafios...', delay: 0.5 },
    { icon: Target, text: 'Iniciando batalha...', delay: 1 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Quiz Challenge</h1>
          <p className="text-purple-200">Prepare-se para o desafio!</p>
        </motion.div>

        <div className="space-y-4 mb-8">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center justify-center gap-3 text-white"
            >
              <step.icon className="w-5 h-5 text-purple-400" />
              <span>{step.text}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
            >
              <div className="text-3xl mb-2">{player.avatar}</div>
              <div className="text-white font-semibold">{player.name}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto max-w-xs"
        />
      </div>
    </div>
  );
};