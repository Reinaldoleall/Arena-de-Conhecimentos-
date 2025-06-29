import { Question } from '../types/game';

export const questions: Question[] = [
  {
    id: 1,
    question: "Qual é a capital do Brasil?",
    options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
    correctAnswer: 2,
    category: "Geografia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 2,
    question: "Quem pintou a obra 'A Última Ceia'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Rafael", "Donatello"],
    correctAnswer: 1,
    category: "Arte",
    difficulty: "medium",
    points: 20
  },
  {
    id: 3,
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Saturno", "Júpiter", "Netuno"],
    correctAnswer: 2,
    category: "Ciências",
    difficulty: "easy",
    points: 10
  },
  {
    id: 4,
    question: "Em que ano foi proclamada a independência do Brasil?",
    options: ["1820", "1822", "1824", "1825"],
    correctAnswer: 1,
    category: "História",
    difficulty: "medium",
    points: 20
  },
  {
    id: 5,
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctAnswer: 1,
    category: "Química",
    difficulty: "easy",
    points: 10
  },
  {
    id: 6,
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"],
    correctAnswer: 1,
    category: "Literatura",
    difficulty: "medium",
    points: 20
  },
  {
    id: 7,
    question: "Qual é o resultado de 15 × 8?",
    options: ["110", "120", "130", "140"],
    correctAnswer: 1,
    category: "Matemática",
    difficulty: "easy",
    points: 10
  },
  {
    id: 8,
    question: "Em que continente fica o Egito?",
    options: ["Ásia", "Europa", "África", "América"],
    correctAnswer: 2,
    category: "Geografia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 9,
    question: "Qual é o menor país do mundo?",
    options: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    category: "Geografia",
    difficulty: "hard",
    points: 30
  },
  {
    id: 10,
    question: "Quem desenvolveu a teoria da relatividade?",
    options: ["Isaac Newton", "Albert Einstein", "Galileu Galilei", "Stephen Hawking"],
    correctAnswer: 1,
    category: "Física",
    difficulty: "medium",
    points: 20
  },
  {
    id: 11,
    question: "Qual é o idioma mais falado no mundo?",
    options: ["Inglês", "Espanhol", "Mandarim", "Hindi"],
    correctAnswer: 2,
    category: "Linguística",
    difficulty: "medium",
    points: 20
  },
  {
    id: 12,
    question: "Em que ano aconteceu a Revolução Francesa?",
    options: ["1789", "1792", "1799", "1804"],
    correctAnswer: 0,
    category: "História",
    difficulty: "hard",
    points: 30
  },
  {
    id: 13,
    question: "Qual é o animal terrestre mais rápido do mundo?",
    options: ["Leão", "Guepardo", "Antílope", "Cavalo"],
    correctAnswer: 1,
    category: "Biologia",
    difficulty: "medium",
    points: 20
  },
  {
    id: 14,
    question: "Quantos ossos tem o corpo humano adulto?",
    options: ["196", "206", "216", "226"],
    correctAnswer: 1,
    category: "Anatomia",
    difficulty: "hard",
    points: 30
  },
  {
    id: 15,
    question: "Qual é a moeda oficial do Japão?",
    options: ["Won", "Yuan", "Yen", "Dong"],
    correctAnswer: 2,
    category: "Economia",
    difficulty: "easy",
    points: 10
  }
];