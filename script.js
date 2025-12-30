script.js
const startBtn = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerBox = document.getElementById("answer-box");
const textZone = document.getElementById("text-answer-zone");
const textInput = document.getElementById("text-input");
const validateBtn = document.getElementById("validate-btn");

let currentQuestion = 0;
let score = 0;

function normalize(str) {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

const questions = [
  { 
    type: "qcm",
    question: "A quelle date on s'est mis ensemble ?",
    options: ["7 mai 2017", "16 février 2013", "26 décembre 2023", "14 juillet 1789"],
    answers: ["26 décembre 2023"]
  },
  {
    type: "libre",
    question: "Quelle est la première activité qu'on a faite ensemble ?",
    answers: ["pétanque", "petanque"]
  },
  {
    type: "qcm",
    question: "C'est quoi mon passe-temps préféré ?",
    options: ["Te parler", "Les échecs", "Bully de CE1"],
    answers: ["Te parler"]
  },
  {
    type: "libre",
    question: "Où est-ce qu'on allait après les cours ?",
    answers: ["carrefour", "au carrefour", "le carrefour","aller a carrefour"]
  },
  {
    type: "qcm",
    question: "Quelle blessure je me suis faite au cross ?",
    options: ["Commotion cérébrale", "Fracture", "Piqûre avec les épingles pour les dossards"],
    answers: ["Commotion cérébrale"]
  },
  {
    type: "qcm",
    question: "Qu'est ce qu'on mange à chaque fois que tu viens chez moi ?",
    options: ["Pizza", "Cordon bleu", "Franui"],
    answers: ["Pizza"]
  },
  {
    type: "libre",
    question: "Quels émojis tu m'envoie avant de dormir ?",
    answers: ["👋👋👋", "👉👈"]
  },
  {
    type: "qcm",
    question: "Quel est notre jeu préféré ensemble ?",
    options: ["Fléchette", "Pétanque", "Skip-bo", "Le jeu des mots", "Le code names"],
    answers: ["Fléchette", "Pétanque", "Skip-bo", "Le jeu des mots", "Le code names"]
  },
  {
    type: "libre",
    question: "Quelle boisson je prends toujours ?",
    answers: ["coca vanille", "coca vanille."]
  },
  {
    type: "qcm",
    question: "Qui gagne le plus souvent à nos jeux ?",
    options: ["Toi", "Moi", "Égalité"],
    answers: ["Moi"]
  },
  {
    type: "libre",
    question: "Quelle est ma couleur préférée ?",
    answers: ["vert"]
  },
  {
    type: "qcm",
    question: "Combien de temps on parle par jour ?",
    options: ["10 minutes", "1h", "Toute la journée"],
    answers: ["Toute la journée"]
  },
  {
    type: "libre",
    question: "Comment s'écrit le nom de mon père ?",
    answers: ["Ronny", "ronny"]
  },
  {
    type: "qcm",
    question: "Qu'est-ce que je préfère chez toi ?",
    options: ["Ton humour", "Tes yeux", "Tout"],
    answers: ["Tout"]
  },
  {
    type: "qcm",
    question: "Qu'est ce qui t'énerve le plus chez moi ?",
    options: ["Comment je tape sur mon téléphone", "comment je relance la discussion H24"],
    answers: ["Comment je tape sur mon téléphone", "comment je relance la discussion H24"]
  }
];

startBtn.addEventListener("click", startGame);
validateBtn.addEventListener("click", validateLibre);

function startGame() {
    currentQuestion = 0;
    score = 0;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    showQuestion();
  document.getElementById("progress").textContent = `${currentQuestionIndex + 1}/${questions.length}`;

}

function showQuestion() {
  document.getElementById("progress").textContent =
  (currentQuestion + 1) + "/" + questions.length;
  
  if (currentQuestion >= questions.length) {
        return showResults();
    }

    const q = questions[currentQuestion];

    questionText.textContent = q.question;
    answerBox.innerHTML = "";
    textZone.style.display = "none";

    if (q.type === "qcm") {
        q.options.forEach(opt => {
            const btn = document.createElement("button");
            btn.classList.add("option-btn");
            btn.textContent = opt;

            btn.addEventListener("click", () => {
                const good = q.answers.map(a => normalize(a));
                const chosen = normalize(opt);

                if (good.includes(chosen)) score++;

                currentQuestion++;
                setTimeout(showQuestion, 250);
            });

            answerBox.appendChild(btn);
        });
    } else {
        textZone.style.display = "block";
        textInput.value = "";
    }
}

function validateLibre() {
    const q = questions[currentQuestion];
    const txt = normalize(textInput.value);
    const good = q.answers.map(a => normalize(a));

    if (good.includes(txt)) score++;

    currentQuestion++;
    showQuestion();
}

function showResults() {
    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";

    const title = document.getElementById("result-title");
    const msg = document.getElementById("result-message");
    const video = document.getElementById("reward-video");

    if (score >= 14) {
        title.textContent = "🎉 BRAVO ! 🎉";
        msg.textContent = "Tu as gagné la récompense ";
        video.style.display = "block";
        video.currentTime = 0;
        video.play();
    } else {
        title.textContent = "Hmmmm… presque";
        msg.textContent = `Tu as eu ${score}/15. Réessaie !`;
        video.style.display = "none";
    }
}

