import { Question } from '../types/game';

export const questions: Question[] = [
  // Geografia
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
    question: "Qual é o maior país do mundo em extensão territorial?",
    options: ["China", "Estados Unidos", "Canadá", "Rússia"],
    correctAnswer: 3,
    category: "Geografia",
    difficulty: "medium",
    points: 20
  },
  {
    id: 3,
    question: "Em que continente fica o Egito?",
    options: ["Ásia", "Europa", "África", "América"],
    correctAnswer: 2,
    category: "Geografia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 4,
    question: "Qual é o menor país do mundo?",
    options: ["Mônaco", "Vaticano", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    category: "Geografia",
    difficulty: "hard",
    points: 30
  },
  {
    id: 5,
    question: "Qual é o rio mais longo do mundo?",
    options: ["Rio Amazonas", "Rio Nilo", "Rio Mississippi", "Rio Yangtzé"],
    correctAnswer: 1,
    category: "Geografia",
    difficulty: "medium",
    points: 20
  },

  // História
  {
    id: 6,
    question: "Em que ano foi proclamada a independência do Brasil?",
    options: ["1820", "1822", "1824", "1825"],
    correctAnswer: 1,
    category: "História",
    difficulty: "medium",
    points: 20
  },
  {
    id: 7,
    question: "Em que ano aconteceu a Revolução Francesa?",
    options: ["1789", "1792", "1799", "1804"],
    correctAnswer: 0,
    category: "História",
    difficulty: "hard",
    points: 30
  },
  {
    id: 8,
    question: "Quem foi o primeiro presidente do Brasil?",
    options: ["Getúlio Vargas", "Deodoro da Fonseca", "Floriano Peixoto", "Prudente de Morais"],
    correctAnswer: 1,
    category: "História",
    difficulty: "medium",
    points: 20
  },
  {
    id: 9,
    question: "Em que ano terminou a Segunda Guerra Mundial?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
    category: "História",
    difficulty: "easy",
    points: 10
  },

  // Ciências
  {
    id: 10,
    question: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Saturno", "Júpiter", "Netuno"],
    correctAnswer: 2,
    category: "Astronomia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 11,
    question: "Qual é a fórmula química da água?",
    options: ["CO2", "H2O", "O2", "NaCl"],
    correctAnswer: 1,
    category: "Química",
    difficulty: "easy",
    points: 10
  },
  {
    id: 12,
    question: "Quem desenvolveu a teoria da relatividade?",
    options: ["Isaac Newton", "Albert Einstein", "Galileu Galilei", "Stephen Hawking"],
    correctAnswer: 1,
    category: "Física",
    difficulty: "medium",
    points: 20
  },
  {
    id: 13,
    question: "Qual é o elemento químico mais abundante no universo?",
    options: ["Oxigênio", "Carbono", "Hidrogênio", "Hélio"],
    correctAnswer: 2,
    category: "Química",
    difficulty: "hard",
    points: 30
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

  // Literatura e Arte
  {
    id: 15,
    question: "Quem escreveu 'Dom Casmurro'?",
    options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"],
    correctAnswer: 1,
    category: "Literatura",
    difficulty: "medium",
    points: 20
  },
  {
    id: 16,
    question: "Quem pintou a obra 'A Última Ceia'?",
    options: ["Michelangelo", "Leonardo da Vinci", "Rafael", "Donatello"],
    correctAnswer: 1,
    category: "Arte",
    difficulty: "medium",
    points: 20
  },
  {
    id: 17,
    question: "Qual é a obra mais famosa de William Shakespeare?",
    options: ["Hamlet", "Romeu e Julieta", "Macbeth", "Rei Lear"],
    correctAnswer: 1,
    category: "Literatura",
    difficulty: "easy",
    points: 10
  },

  // Matemática
  {
    id: 18,
    question: "Qual é o resultado de 15 × 8?",
    options: ["110", "120", "130", "140"],
    correctAnswer: 1,
    category: "Matemática",
    difficulty: "easy",
    points: 10
  },
  {
    id: 19,
    question: "Qual é o valor de π (pi) aproximadamente?",
    options: ["3.14", "3.16", "3.12", "3.18"],
    correctAnswer: 0,
    category: "Matemática",
    difficulty: "easy",
    points: 10
  },
  {
    id: 20,
    question: "Qual é a raiz quadrada de 144?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
    category: "Matemática",
    difficulty: "medium",
    points: 20
  },

  // Biologia
  {
    id: 21,
    question: "Qual é o animal terrestre mais rápido do mundo?",
    options: ["Leão", "Guepardo", "Antílope", "Cavalo"],
    correctAnswer: 1,
    category: "Biologia",
    difficulty: "medium",
    points: 20
  },
  {
    id: 22,
    question: "Qual é o maior mamífero do mundo?",
    options: ["Elefante Africano", "Baleia Azul", "Girafa", "Rinoceronte"],
    correctAnswer: 1,
    category: "Biologia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 23,
    question: "Quantos corações tem um polvo?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    category: "Biologia",
    difficulty: "hard",
    points: 30
  },

  // Cultura Geral
  {
    id: 24,
    question: "Qual é o idioma mais falado no mundo?",
    options: ["Inglês", "Espanhol", "Mandarim", "Hindi"],
    correctAnswer: 2,
    category: "Linguística",
    difficulty: "medium",
    points: 20
  },
  {
    id: 25,
    question: "Qual é a moeda oficial do Japão?",
    options: ["Won", "Yuan", "Yen", "Dong"],
    correctAnswer: 2,
    category: "Economia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 26,
    question: "Em que ano foi criada a internet?",
    options: ["1969", "1975", "1983", "1991"],
    correctAnswer: 0,
    category: "Tecnologia",
    difficulty: "hard",
    points: 30
  },
  {
    id: 27,
    question: "Qual é o esporte mais popular do mundo?",
    options: ["Basquete", "Futebol", "Tênis", "Vôlei"],
    correctAnswer: 1,
    category: "Esportes",
    difficulty: "easy",
    points: 10
  },
  {
    id: 28,
    question: "Quantos jogadores tem um time de futebol em campo?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 1,
    category: "Esportes",
    difficulty: "easy",
    points: 10
  },
  {
    id: 29,
    question: "Qual é a montanha mais alta do mundo?",
    options: ["K2", "Monte Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: 1,
    category: "Geografia",
    difficulty: "easy",
    points: 10
  },
  {
    id: 30,
    question: "Qual é a velocidade da luz no vácuo?",
    options: ["300.000 km/s", "299.792.458 m/s", "150.000 km/s", "500.000 km/s"],
    correctAnswer: 1,
    category: "Física",
    difficulty: "hard",
    points: 30
  }
];