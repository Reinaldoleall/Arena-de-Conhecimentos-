import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Trophy, Users, RotateCcw } from 'lucide-react';
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
    questions: [...questions].sort(() => Math.random() - 0.5).slice(0, 10),
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
      const timeBonus = Math.floor(timeLeft / 5);
      const totalPoints = currentQuestion.points + timeBonus;
      
      setGameState(prev => ({
        ...prev,
        players: prev.players.map(p => 
          p.id === currentPlayer.id 
            ? { ...p, score: p.score + totalPoints }
            : p
        )
      }));
    } else {
      playWrongSound();
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success-100 text-success-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-danger-100 text-danger-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAnswerButtonClass = (index: number) => {
    if (!gameState.showAnswer) {
      return 'bg-white hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-300 text-gray-800';
    }

    if (index === currentQuestion.correctAnswer) {
      return 'bg-success-500 border-2 border-success-600 text-white';
    }

    if (index === gameState.selectedAnswer && index !== currentQuestion.correctAnswer) {
      return 'bg-danger-500 border-2 border-danger-600 text-white';
    }

    return 'bg-gray-200 border-2 border-gray-300 text-gray-500';
  };

  if (gameState.gameStatus === 'finished') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.button>
            
            <div className="text-white">
              <h1 className="text-2xl font-bold">Quiz Challenge</h1>
              <p className="text-primary-200">
                Pergunta {gameState.currentQuestionIndex + 1} de {gameState.questions.length}
              </p>
            </div>
          </div>

          {/* Timer */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold ${
              timeLeft <= 10 ? 'bg-danger-500 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <Clock className="w-5 h-5" />
            {timeLeft}s
          </motion.div>
        </div>

        {/* Players */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {gameState.players.map((player) => (
            <motion.div
              key={player.id}
              layout
              className={`p-4 rounded-xl transition-all ${
                player.isActive 
                  ? 'bg-white shadow-lg ring-4 ring-yellow-400' 
                  : 'bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{player.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold truncate ${
                    player.isActive ? 'text-gray-900' : 'text-white'
                  }`}>
                    {player.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    <span className="font-bold">{player.score}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Question Card */}
        <motion.div
          key={gameState.currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentPlayer.avatar}</span>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Vez de {currentPlayer.name}
                </h2>
                <p className="text-gray-600">Categoria: {currentQuestion.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                {currentQuestion.difficulty === 'easy' ? 'Fácil' : 
                 currentQuestion.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </span>
              <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                {currentQuestion.points} pts
              </span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
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
                className={`p-4 rounded-xl font-semibold text-left transition-all ${getAnswerButtonClass(index)}`}
              >
                <span className="font-bold mr-3">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </motion.button>
            ))}
          </div>

          {gameState.showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gray-50 rounded-xl"
            >
              <p className="text-gray-700">
                <span className="font-semibold">Resposta correta:</span>{' '}
                {String.fromCharCode(65 + currentQuestion.correctAnswer)}. {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
              {gameState.selectedAnswer === currentQuestion.correctAnswer && (
                <p className="text-success-600 font-semibold mt-2">
                  🎉 Parabéns! +{currentQuestion.points + Math.floor(timeLeft / 5)} pontos
                </p>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Progress Bar */}
        <div className="bg-white/20 rounded-full h-2 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100}%` }}
            className="bg-white h-full rounded-full"
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
};