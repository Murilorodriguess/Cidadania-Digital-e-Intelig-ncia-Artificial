const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});
// Banco de Dados Dinâmico focado em Cidadania Digital e IA
const quizQuestions = [
    {
        question: "O que caracteriza o conceito de 'Viés Algorítmico' em sistemas de IA?",
        options: [
            "A capacidade da IA de processar dados sem erros matemáticos.",
            "Distorções que geram resultados discriminatórios por conta de dados de treino históricos tendenciosos.",
            "A tradução automática e perfeita de múltiplos idiomas de forma simultânea."
        ],
        correctIndex: 1,
        explanation: "O viés algorítmico ocorre quando modelos replicam preconceitos humanos presentes nos dados históricos usados em seu treinamento."
    },
    {
        question: "Qual pilar da Cidadania Digital foca no combate ativo à desinformação gerada por deepfakes?",
        options: [
            "Letramento Digital e Pensamento Crítico.",
            "Apenas velocidade de conexão de banda larga.",
            "Comércio Eletrônico automatizado."
        ],
        correctIndex: 0,
        explanation: "O letramento digital nos dá ferramentas críticas para verificar fontes, analisar metadados e discernir mídias sintéticas de fatos reais."
    },
    {
        question: "De acordo com as boas práticas éticas, como as empresas devem tratar nossos dados em sistemas automatizados?",
        options: [
            "Coletando o máximo de dados possível ocultando as políticas de uso.",
            "Garantindo transparência, consentimento explícito e permitindo a exclusão dos dados coletados.",
            "Bloqueando o acesso do próprio usuário aos seus relatórios de navegação."
        ],
        correctIndex: 1,
        explanation: "Privacidade requer consentimento claro e total controle do cidadão sobre suas próprias informações digitais corporativas."
    }
];

let currentQuestionIndex = 0;
let userScore = 0;

// Gerenciamento e Alternância de Tema (Claro / Escuro)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
}

// Renderização Dinâmica das Questões
function renderCurrentQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    document.getElementById("question-title").innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    
    const optionsBox = document.getElementById("options-box");
    optionsBox.innerHTML = ""; // Limpa escolhas anteriores
    
    // Oculta elementos de controle e feedback
    document.getElementById("feedback-box").className = "feedback-container";
    document.getElementById("feedback-box").style.display = "none";
    document.getElementById("next-btn").style.display = "none";

    // Monta os botões das alternativas
    currentQuestion.options.forEach((optionText, index) => {
        const btn = document.createElement("button");
        btn.className = "option-btn";
        btn.innerText = optionText;
        btn.onclick = () => evaluateUserChoice(index);
        optionsBox.appendChild(btn);
    });
}

// Processamento da Resposta Escolhida
function evaluateUserChoice(selectedIndex) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const allOptionButtons = document.querySelectorAll(".option-btn");
    const feedbackBox = document.getElementById("feedback-box");

    // Desativa cliques adicionais e destaca a alternativa certa
    allOptionButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === currentQuestion.correctIndex) {
            btn.classList.add("correct-choice");
        }
    });

    // Valida acerto ou erro do usuário
    if (selectedIndex === currentQuestion.correctIndex) {
        userScore++;
        feedbackBox.className = "feedback-container show-correct";
        feedbackBox.innerHTML = `🟢 <strong>Resposta Correta!</strong><br>${currentQuestion.explanation}`;
    } else {
        allOptionButtons[selectedIndex].classList.add("incorrect-choice");
        feedbackBox.className = "feedback-container show-incorrect";
        feedbackBox.innerHTML = `🔴 <strong>Alternativa Incorreta!</strong><br>${currentQuestion.explanation}`;
    }

    document.getElementById("next-btn").style.display = "block";
}

// Fluxo de Navegação do Quiz
function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        renderCurrentQuestion();
    } else {
        displayFinalResults();
    }
}

// Tela de Pontuação Final
function displayFinalResults() {
    const quizBox = document.getElementById("quiz-box");
    quizBox.style.textAlign = "center";
    quizBox.innerHTML = `
        <h3 style="font-size: 1.6rem; color: var(--accent-color); margin-bottom: 15px;">🏆 Quiz Concluído!</h3>
        <p style="font-size: 1.2rem; margin-bottom: 25px;">Você acertou <strong>${userScore}</strong> de <strong>${quizQuestions.length}</strong> perguntas sobre ética e cidadania.</p>
        <button class="action-btn" onclick="window.location.reload()">Refazer Desafio</button>
    `;
}

// Inicialização do Script ao carregar a página
window.onload = renderCurrentQuestion;
/* Variáveis para o Tema Claro */
:root {
    --bg-color: #f4f7f6;
    --container-bg: #ffffff;
    --text-color: #2c3e50;
    --primary-color: #34495e;
    --accent-color: #2980b9;
    --success-color: #27ae60;
    --error-color: #c0392b;
    --border-color: #e2e8f0;
    --card-hover: #f8fafc;
}

/* Variáveis para o Tema Escuro */
[data-theme="dark"] {
    --bg-color: #0f172a;
    --container-bg: #1e293b;
    --text-color: #cbd5e1;
    --primary-color: #38bdf8;
    --accent-color: #0ea5e9;
    --border-color: #334155;
    --card-hover: #334155;
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    transition: background-color 0.3s ease, color 0.3s ease;
}

body {
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    background-color: var(--bg-color);
    color: var(--text-color);
    line-height: 1.6;
    padding: 20px;
    display: flex;
    justify-content: center;
}

.container {
    max-width: 850px;
    width: 100%;
    background-color: var(--container-bg);
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

/* Cabeçalho e Navegação */
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 20px;
    margin-bottom: 30px;
}

.logo {
    font-weight: bold;
    font-size: 1.4rem;
    color: var(--primary-color);
}

.theme-btn {
    background-color: var(--border-color);
    color: var(--text-color);
    border: none;
    padding: 8px 16px;
    border-radius: 20px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.85rem;
}

.theme-btn:hover {
    opacity: 0.9;
}

h1 {
    font-size: 2.2rem;
    margin-bottom: 10px;
    color: var(--primary-color);
}

.subtitle {
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 30px;
}

/* Seção de Pilares Informativos */
.pilares-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
}

.pilar-card {
    border: 1px solid var(--border-color);
    padding: 20px;
    border-radius: 12px;
    background-color: var(--container-bg);
}

.pilar-card:hover {
    background-color: var(--card-hover);
    transform: translateY(-2px);
    transition: transform 0.2s ease;
}

.pilar-card h3 {
    margin-bottom: 10px;
    color: var(--accent-color);
}

/* Área do Quiz Dinâmico */
.quiz-section {
    background-color: var(--card-hover);
    border: 1px solid var(--border-color);
    padding: 30px;
    border-radius: 12px;
    margin-top: 40px;
}

.quiz-section h2 {
    margin-bottom: 20px;
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 10px;
}

.options-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin: 20px 0;
}

.option-btn {
    background-color: var(--container-bg);
    color: var(--text-color);
    border: 2px solid var(--border-color);
    padding: 14px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    text-align: left;
    font-weight: 500;
}

.option-btn:hover:not([disabled]) {
    border-color: var(--accent-color);
    background-color: var(--bg-color);
}

/* Feedback Visual de Erro/Acerto */
.option-btn.correct-choice {
    background-color: rgba(39, 174, 96, 0.15) !important;
    border-color: var(--success-color) !important;
    color: var(--success-color);
    font-weight: bold;
}

.option-btn.incorrect-choice {
    background-color: rgba(192, 57, 43, 0.15) !important;
    border-color: var(--error-color) !important;
    color: var(--error-color);
}

.feedback-container {
    margin-top: 15px;
    padding: 15px;
    border-radius: 8px;
    display: none;
    font-size: 0.95rem;
    line-height: 1.5;
}

.feedback-container.show-correct {
    display: block;
    background-color: rgba(39, 174, 96, 0.1);
    border-left: 4px solid var(--success-color);
}

.feedback-container.show-incorrect {
    display: block;
    background-color: rgba(192, 57, 43, 0.1);
    border-left: 4px solid var(--error-color);
}

.control-btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.action-btn {
    background-color: var(--accent-color);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
}

.action-btn:hover {
    opacity: 0.9;
}

footer {
    margin-top: 40px;
    text-align: center;
    font-size: 0.85rem;
    color: #64748b;
    border-top: 1px solid var(--border-color);
    padding-top: 20px;
}
