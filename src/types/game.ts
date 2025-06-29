export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  avatar: string;
  isActive: boolean;
}

export interface GameState {
  players: Player[];
  currentQuestionIndex: number;
  questions: Question[];
  gameStatus: 'setup' | 'playing' | 'finished';
  currentPlayer: number;
  timeLeft: number;
  showAnswer: boolean;
  selectedAnswer: number | null;
}

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  totalTime: number;
  averageTime: number;
}