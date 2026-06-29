const allCharacters = {
  willow: {
    name: "Willow",
    affirmation: '"Affirmation: I can do hard things"',
    description:
      "Just like Willow, you're smart, calm, and brave. You might get a little scared sometimes, but you face your fears.",
    image: "Gemini_Generated_Image_2bwax62bwax62bwa (1).png",
  },
  pam: {
    name: "Pam",
    affirmation:
      '" Affirmation: Its okay to make mistakes, that is how I learn"',
    description:
      "Like Pam, you are a natural leader who keeps the light focused on what truly matters. You are bossy because you care.",
    image: "Gemini_Generated_Image_2bwax62bwax62bwa (2).png",
  },
  slip: {
    name: "Slip",
    affirmation: '": Rest is productive and I deserve it"',
    description:
      "Slip-like energy is all about comfort. You know when to slow down and prioritize your own well-being.",
    image: "Gemini_Generated_Image_2bwax62bwax62bwa.png",
  },
};

const quizData = [
  {
    question:
      "When you have a completely free Saturday, how do you most want to spend it?",
    answers: [
      { text: "Reading in a cozy, hidden corner.", villager: "willow" },
      { text: "Organizing your workspace.", villager: "pam" },
      { text: "Napping in your favorite comfy spot.", villager: "slip" },
    ],
  },
  {
    question:
      "A friend comes to you feeling down. What is your initial approach?",
    answers: [
      { text: "Give them space but stay available.", villager: "willow" },
      {
        text: "Ask them for their list of problems to solve them.",
        villager: "pam",
      },
      { text: "Offer a warm hug and a snack.", villager: "slip" },
    ],
  },
  {
    question: "How do you handle a stressful deadline at work or school?",
    answers: [
      {
        text: "Take a deep breath and break it into small, manageable pieces.",
        villager: "willow",
      },
      {
        text: "Make a strict schedule and stick to it no matter what.",
        villager: "pam",
      },
      {
        text: "Prioritize my energy; if I'm too stressed, I step away.",
        villager: "slip",
      },
    ],
  },
  {
    question: "What does your 'ideal' self-care routine look like?",
    answers: [
      { text: "Mindful meditation or journaling.", villager: "willow" },
      { text: "Productivity hacks and cleaning.", villager: "pam" },
      { text: "Blankets, tea, and comfort shows.", villager: "slip" },
    ],
  },
  {
    question:
      "When you have an internal conflict, what helps you feel grounded?",
    answers: [
      { text: "Reflecting on my core values.", villager: "willow" },
      { text: "Creating a list of pros and cons.", villager: "pam" },
      { text: "Listening to my body's needs.", villager: "slip" },
    ],
  },
  {
    question:
      "If you feel overwhelmed by the news or social media, what do you do?",
    answers: [
      {
        text: "Set boundaries and disconnect for a while.",
        villager: "willow",
      },
      { text: "Analyze the information to stay informed.", villager: "pam" },
      {
        text: "Find a comforting distraction to soothe my mind.",
        villager: "slip",
      },
    ],
  },
  {
    question: "How do you celebrate a personal achievement?",
    answers: [
      { text: "Quiet reflection and gratitude.", villager: "willow" },
      { text: "Planning the next big goal.", villager: "pam" },
      { text: "Treating myself to something relaxing.", villager: "slip" },
    ],
  },
  {
    question: "What is your biggest fear regarding your mental well-being?",
    answers: [
      { text: "Losing my sense of inner peace.", villager: "willow" },
      {
        text: "Feeling like I'm falling behind or losing control.",
        villager: "pam",
      },
      {
        text: "Being forced to move too fast or change too much.",
        villager: "slip",
      },
    ],
  },
  {
    question: "What is your favorite way to express your emotions?",
    answers: [
      { text: "Writing or speaking honestly.", villager: "willow" },
      { text: "Turning emotions into actionable tasks.", villager: "pam" },
      { text: "Letting them out through comfort and rest.", villager: "slip" },
    ],
  },
  {
    question: "What is the most important thing for your happiness?",
    answers: [
      { text: "Meaning and emotional depth.", villager: "willow" },
      { text: "Growth and productivity.", villager: "pam" },
      { text: "Security and ease.", villager: "slip" },
    ],
  },
];

let currQues = 0;
let villagerScores = { willow: 0, pam: 0, slip: 0 };
const app = document.getElementById("app");

function render(html) {
  app.innerHTML = html;
}

export function startQuiz() {
  currQues = 0;
  villagerScores = { willow: 0, pam: 0, slip: 0 };
  renderQuestion();
}

function renderQuestion() {
  const currData = quizData[currQues];
  let answers = currData.answers
    .map(
      (ans) =>
        `<button class="option-btn" data-villager="${ans.villager}">${ans.text}</button>`
    )
    .join("");

  render(`
        <div class="quiz-screen">
            <h1>Question ${currQues + 1}/10</h1>
            <p>${currData.question}</p>
            <div class="options-container">${answers}</div>
        </div>
    `);

  document.querySelectorAll(".option-btn").forEach((btn) => {
    btn.addEventListener("click", (e) =>
      handleAnswer(e.target.dataset.villager)
    );
  });
}

function handleAnswer(villager) {
  villagerScores[villager]++;
  currQues++;
  if (currQues < quizData.length) renderQuestion();
  else showResults();
}

function showResults() {
  const winningVillager = Object.keys(villagerScores).reduce((a, b) =>
    villagerScores[a] > villagerScores[b] ? a : b
  );
  const result = allCharacters[winningVillager];

  render(`
        <div class="result-screen">
            <h1>Meet Your Villager!</h1>
            <div class="result-card">
                <img src="${result.image}" alt="${result.name}">
                <h2>${result.name}</h2>
                <p>${result.affirmation}</p>
                <p>${result.description}</p>
            </div>
            <button id="restartBtn">Retake Quiz</button>
        </div>
    `);
  document.getElementById("restartBtn").addEventListener("click", startQuiz);
}

render(`
    <div class="start-screen">
        <h1>Which Villager Are You? Complete the Quiz, find your match and affirmation!</h1>
        <button id="startBtn">Find My Villager</button>
    </div>
`);
document.getElementById("startBtn").addEventListener("click", startQuiz);
