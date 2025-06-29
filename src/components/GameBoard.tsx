import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy, Users, RotateCcw, Zap, Target, Brain } from 'lucide-react';
import toast from 'react-hot-toast';
import { Player, Question, GameState } from '../types/game';
import { useGameTimer } from '../hooks/useGameTimer';
import { useSound } from '../hooks/useSound';
import { questions } from '../data/questions';

interface GameBoardProps {
  players: Player[];
  onGameEnd: (finalPlayers: Player[]) => void;
  onRestart: () => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({ players: initialPlayers, onGameEnd, onRestart }) => {
  const [gameState, setGameState] = useState<GameState>({
    players: initialPlayers,
    currentQuestionIndex: 0,
    questions: [...questions].sort(() => Math.random() - 0.5).slice(0, 15),
    gameStatus: 'playing',
    currentPlayer: 0,
    timeLeft: 30,
    showAnswer: false,
    selectedAnswer: null
  });

  const { timeLeft, isRunning, startTimer, stopTimer, resetTimer, isTimeUp } = useGameTimer(30);
  const { playCorrectSound, playWrongSound } = useSound();

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
  const currentPlayer = gameState.players[gameState.currentPlayer];

  useEffect(() => {
    if (gameState.gameStatus === 'playing' && !gameState.showAnswer) {
      startTimer();
    }
  }, [gameState.currentQuestionIndex, gameState.showAnswer, startTimer]);

  useEffect(() => {
    if (isTimeUp && !gameState.showAnswer) {
      handleTimeUp();
    }
  }, [isTimeUp, gameState.showAnswer]);

  const handleTimeUp = () => {
    setGameState(prev => ({ ...prev, showAnswer: true }));
    stopTimer();
    playWrongSound();
    toast.error(`⏰ Tempo esgotado para ${currentPlayer.name}!`);
    
    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (gameState.showAnswer || !isRunning) return;

    setGameState(prev => ({ ...prev, selectedAnswer: answerIndex, showAnswer: true }));
    stopTimer();

    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      playCorrectSound();
      const timeBonus = Math.floor(timeLeft / 3);
      const difficultyMultiplier = currentQuestion.difficulty === 'hard' ? 1.5 : 
                                   currentQuestion.difficulty === 'medium' ? 1.2 : 1;
      const totalPoints = Math.floor((currentQuestion.points + timeBonus) * difficultyMultiplier);
      
      setGameState(prev => ({
        ...prev,
        players: prev.players.map(p => 
          p.id === currentPlayer.id 
            ? { ...p, score: p.score + totalPoints }
            : p
        )
      }));
      
      toast.success(`🎉 ${currentPlayer.name} acertou! +${totalPoints} pontos`);
    } else {
      playWrongSound();
      toast.error(`❌ ${currentPlayer.name} errou!`);
    }

    setTimeout(() => {
      nextQuestion();
    }, 3000);
  };

  const nextQuestion = () => {
    const nextQuestionIndex = gameState.currentQuestionIndex + 1;
    const nextPlayerIndex = (gameState.currentPlayer + 1) % gameState.players.length;

    if (nextQuestionIndex >= gameState.questions.length) {
      setGameState(prev => ({ ...prev, gameStatus: 'finished' }));
      onGameEnd(gameState.players);
      return;
    }

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextQuestionIndex,
      currentPlayer: nextPlayerIndex,
      showAnswer: false,
      selectedAnswer: null,
      players: prev.players.map((p, index) => ({
        ...p,
        isActive: index === nextPlayerIndex
      }))
    }));

    resetTimer();
  };

  const getDifficultyConfig = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': 
        return { 
          color: 'bg-green-500/20 text-green-300 border-green-500/30', 
          icon: Target,
          label: 'Fácil' 
        };
      case 'medium': 
        return { 
          color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', 
          icon: Zap,
          label: 'Médio' 
        };
      case 'hard': 
        return { 
          color: 'bg-red-500/20 text-red-300 border-red-500/30', 
          icon: Brain,
          label: 'Difícil' 
        };
      default: 
        return { 
          color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', 
          icon: Target,
          label: 'Normal' 
        };
    }
  };

  const getAnswerButtonClass = (index: number) => {
    if (!gameState.showAnswer) {
      return 'bg-white/10 hover:bg-white/20 border-2 border-white/20 hover:border-white/40 text-white backdrop-blur-sm transform hover:scale-105';
    }

    if (index === currentQuestion.correctAnswer) {
      return 'bg-green-500/30 border-2 border-green-400 text-green-100 backdrop-blur-sm';
    }

    if (index === gameState.selectedAnswer && index !== currentQuestion.correctAnswer) {
      return 'bg-red-500/30 border-2 border-red-400 text-red-100 backdrop-blur-sm';
    }

    return 'bg-gray-500/20 border-2 border-gray-500/30 text-gray-400 backdrop-blur-sm';
  };

  const difficultyConfig = getDifficultyConfig(currentQuestion.difficulty);

  if (gameState.gameStatus === 'finished') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="p-4 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-all backdrop-blur-sm border border-white/20"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.button>
            
            <div className="text-white">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Quiz Challenge
              </h1>
              <p className="text-purple-200">
                Pergunta {gameState.currentQuestionIndex + 1} de {gameState.questions.length}
              </p>
            </div>
          </div>

          {/* Timer */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-xl backdrop-blur-sm border transition-all ${
              timeLeft <= 10 
                ? 'bg-red-500/20 text-red-300 border-red-500/30 animate-pulse' 
                : 'bg-white/10 text-white border-white/20'
            }`}
          >
            <Clock className="w-6 h-6" />
            {timeLeft}s
          </motion.div>
        </div>

        {/* Players Scoreboard */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {gameState.players
            .sort((a, b) => b.score - a.score)
            .map((player, sortedIndex) => (
            <motion.div
              key={player.id}
              layout
              className={`relative overflow-hidden rounded-2xl p-4 transition-all ${
                player.isActive 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25 ring-4 ring-yellow-400/50' 
                  : 'bg-white/10 backdrop-blur-sm border border-white/20'
              }`}
            >
              {sortedIndex === 0 && (
                <div className="absolute top-2 right-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
              )}
              <div className="flex items-center gap-3">
                <span className="text-3xl">{player.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold truncate ${
                    player.isActive ? 'text-white' : 'text-white/80'
                  }`}>
                    {player.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400">{player.score}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Question Card */}
        <motion.div
          key={gameState.currentQuestionIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-8 border border-white/20"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="text-5xl">{currentPlayer.avatar}</div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">
                  Vez de {currentPlayer.name}
                </h2>
                <p className="text-purple-200">Categoria: {currentQuestion.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${difficultyConfig.color}`}>
                <difficultyConfig.icon className="w-4 h-4" />
                <span className="font-medium">{difficultyConfig.label}</span>
              </div>
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200 rounded-xl font-medium border border-purple-500/30">
                {currentQuestion.points} pts
              </span>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-8 leading-relaxed">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                whileHover={!gameState.showAnswer ? { scale: 1.02 } : {}}
                whileTap={!gameState.showAnswer ? { scale: 0.98 } : {}}
                onClick={() => handleAnswerSelect(index)}
                disabled={gameState.showAnswer}
                className={`p-6 rounded-2xl font-semibold text-left transition-all ${getAnswerButtonClass(index)}`}
              >
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white/20 rounded-full font-bold mr-4 text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {gameState.showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
              >
                <p className="text-white text-lg">
                  <span className="font-bold text-green-400">Resposta correta:</span>{' '}
                  {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}
                </p>
                {gameState.selectedAnswer === currentQuestion.correctAnswer && (
                  <p className="text-green-400 font-bold mt-3 text-lg">
                    🎉 Parabéns! +{currentQuestion.points + Math.floor(timeLeft / 3)} pontos
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white/10 rounded-full h-3 mb-4 backdrop-blur-sm border border-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100}%` }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
        
        <div className="text-center text-purple-200 text-sm">
          Progresso: {gameState.currentQuestionIndex + 1}/{gameState.questions.length}
        </div>
      </div>
    </div>
  );
};