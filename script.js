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
