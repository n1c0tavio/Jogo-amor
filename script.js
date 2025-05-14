const questions = [
  { q: "Qual foi a primeira coisa que me encantou em você?", o: ["Seu sorriso", "Sua roupa", "Seu jeito bravo", "Seu silêncio"], c: 0 },
  { q: "Onde eu mais gosto de estar com você?", o: ["No shopping", "No seu abraço", "Em casa assistindo", "Em festa"], c: 1 },
  { q: "O que me faz lembrar de você todos os dias?", o: ["O céu", "Seu perfume", "Seu olhar", "Qualquer detalhe"], c: 3 },
  { q: "Se eu pudesse escolher qualquer lugar do mundo, eu iria…", o: ["Paris", "Sua casa", "Onde você estiver", "Um lugar calmo"], c: 2 },
  { q: "Qual dessas frases mais combina com nosso amor?", o: ["Pouco tempo, pouca intensidade", "Tudo é fase", "Desde cedo, já era destino", "Nada sério"], c: 2 },
  { q: "Se o amor fosse uma música, a nossa seria…", o: ["Ser humano ou anjo", "Perfect", "Tá Escrito", "Evidências"], c: 0 },
  { q: "Qual a data que te pedi em namoro?", o: ["1/7", "14/2", "25/12", "30/6"], c: 0 },
  { q: "O que eu mais quero com você?", o: ["Momentos passageiros", "Uma amizade pra sempre", "Uma história de verdade", "Nada sério"], c: 2 }
];

let current = 0, score = 0;
const music = document.getElementById("bg-music");

document.getElementById("start-btn").onclick = () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  music.play();
  showQuestion();
};

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").innerText = q.q;
  const optBox = document.getElementById("options");
  optBox.innerHTML = "";
  q.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.innerText = text;
    btn.onclick = () => selectOption(i, btn);
    optBox.appendChild(btn);
  });
}

function selectOption(index, btn) {
  const q = questions[current];
  const all = document.querySelectorAll("#options button");
  all.forEach(b => b.disabled = true);
  if (index === q.c) {
    btn.classList.add("correct");
    score++;
  } else {
    btn.classList.add("wrong");
    all[q.c].classList.add("correct");
  }
  document.getElementById("next-btn").style.display = "inline-block";
}

document.getElementById("next-btn").onclick = () => {
  current++;
  document.getElementById("next-btn").style.display = "none";
  if (current < questions.length) showQuestion();
  else showResult();
};

document.getElementById("restart-btn").onclick = () => location.reload();

function showResult() {
  document.getElementById("question-container").style.display = "none";
  const scoreBox = document.getElementById("score-box");
  scoreBox.innerText = `Pontuação final: ${score} de ${questions.length}`;
  document.getElementById("restart-btn").style.display = "inline-block";
  document.getElementById("final-message").innerText =
    score >= 6 ? "Monte nosso quebra-cabeça!" : "Você ganhou as peças mesmo assim!";
  document.getElementById("puzzle-box").style.display = "block";
  loadPuzzle();
}

function loadPuzzle() {
  const container = document.getElementById("puzzle-container");
  container.innerHTML = "";
  let positions = Array.from({length: 16}, (_, i) => i);
  positions.sort(() => Math.random() - 0.5);
  positions.forEach((pos, i) => {
    const piece = document.createElement("div");
    piece.classList.add("puzzle-piece");
    piece.style.backgroundPosition = `-${(pos % 4) * 75}px -${Math.floor(pos / 4) * 75}px`;
    piece.style.top = `${Math.floor(i / 4) * 75}px`;
    piece.style.left = `${(i % 4) * 75}px`;
    container.appendChild(piece);
  });
  document.getElementById("poem").style.display = "block";
}
