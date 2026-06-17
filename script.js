// Base Estendida de Questões Focada em Cidadania Digital e IA (7 Perguntas)
const quizRepository = [
    {
        question: "O que caracteriza o conceito de 'Viés Algorítmico' em sistemas de IA?",
        options: [
            "A capacidade da IA de processar dados sem erros matemáticos.",
            "Distorções que geram resultados discriminatórios por conta de dados de treino históricos tendenciosos.",
            "A tradução automática e perfeita de múltiplos idiomas de forma simultânea."
        ],
        correct: 1,
        explanation: "O viés algorítmico ocorre quando modelos replicam preconceitos humanos presentes nos dados de treinamento."
    },
    {
        question: "Qual pilar da Cidadania Digital foca no combate ativo à desinformação gerada por deepfakes?",
        options: [
            "Letramento Digital e Pensamento Crítico.",
            "Apenas velocidade de conexão de banda larga.",
            "Comércio Eletrônico automatizado."
        ],
        correct: 0,
        explanation: "O letramento digital constrói competências analíticas para verificar fontes e avaliar mídias sintéticas."
    },
    {
        question: "De acordo com as boas práticas éticas, como as empresas devem tratar nossos dados em sistemas automatizados?",
        options: [
            "Coletando o máximo de dados possível ocultando as políticas de uso.",
            "Garantindo transparência, consentimento explícito e permitindo a exclusão dos dados.",
            "Bloqueando o acesso do próprio usuário aos seus relatórios."
        ],
        correct: 1,
        explanation: "Privacidade real exige consentimento claro e governança robusta sobre os registros do cidadão."
    },
    {
        question: "O que define a 'Pegada Digital' de um indivíduo na internet?",
        options: [
            "O rastro de dados e atividades deixados ao navegar, interagir e postar em ambientes online.",
            "A velocidade máxima de download contratada com o provedor.",
            "A senha de segurança criptografada usada no roteador Wi-Fi."
        ],
        correct: 0,
        explanation: "Cada clique, busca ou comentário compõe um histórico público ou privado que define sua identidade digital."
    },
    {
        question: "Qual é o principal risco ético associado ao uso de IA sem supervisão em contratações de emprego?",
        options: [
            "Aumento da velocidade de triagem dos candidatos.",
            "Exclusão automatizada de minorias baseada em padrões discriminatórios históricos.",
            "Redução do uso de papel nos escritórios."
        ],
        correct: 1,
        explanation: "Se a IA avaliar candidatos usando dados de equipes do passado que excluíam minorias, ela perpetuará essa exclusão."
    },
    {
        question: "Qual o impacto do uso de dados artísticos protegidos por direitos autorais no treinamento de IAs generativas de imagem?",
        options: [
            "Ajuda os artistas originais a ganharem mais dinheiro automaticamente de forma direta.",
            "Gera debates complexos sobre propriedade intelectual e falta de compensação ou autorização dos criadores originários.",
            "Apaga de forma permanente as obras originais de toda a internet."
        ],
        correct: 1,
        explanation: "Modelos generativos dependem de imagens públicas para aprender estilos, gerando debates éticos sobre o uso não autorizado de propriedade intelectual."
    },
    {
        question: "Como o conceito de 'Alucinação' afeta a confiabilidade de modelos de linguagem como o ChatGPT?",
        options: [
            "Faz com que o robô responda mais devagar intencionalmente.",
            "O sistema gera fatos falsos ou incorretos com extrema convicção e aparência de verdade.",
            "Impede que usuários façam perguntas sobre programação de computadores."
        ],
        correct: 1,
        explanation: "Alucinações ocorrem porque os modelos trabalham com probabilidade de palavras próximas e estatística, e não com checagem lógica ativa de fatos."
    }
];

let currentIndex = 0;
let userScore = 0;

// Alternância de Tema Visual (Light / Dark)
function toggleTheme() {
    const activeTheme = document.documentElement.getAttribute("data-theme");
    if (activeTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
}

// Atualizar Barra de Progresso e Carregar Pergunta
function displayQuestion() {
    const currentItem = quizRepository[currentIndex];
    const totalQuestions = quizRepository.length;
    
    document.getElementById("progress-text").innerText = `Pergunta ${currentIndex + 1} de ${totalQuestions}`;
    const percentage = ((currentIndex + 1) / totalQuestions) * 100;
    document.getElementById("progress-bar-fill").style.width = `${percentage}%`;

    document.getElementById("question-text").innerText = currentItem.question;
    
    const optionsGrid = document.getElementById("options-container");
    optionsGrid.innerHTML = "";
    
    const feedbackBox = document.getElementById("feedback-panel");
    feedbackBox.style.display = "none";
    feedbackBox.className = "feedback-card";
    
    document.getElementById("next-btn").style.display = "none";

    const workspace = document.getElementById("quiz-workspace");
    workspace.classList.remove("fade-in");
    void workspace.offsetWidth; // Força atualização de ciclo de renderização do navegador
    workspace.classList.add("fade-in");

    currentItem.options.forEach((text, idx) => {
        const targetBtn = document.createElement("button");
        targetBtn.className = "btn-choice";
        targetBtn.innerText = text;
        targetBtn.onclick = () => processSelection(idx);
        optionsGrid.appendChild(targetBtn);
    });
}

// Processar Resposta Selecionada
function processSelection(chosenIndex) {
    const currentItem = quizRepository[currentIndex];
    const optionButtons = document.querySelectorAll(".btn-choice");
    const feedbackBox = document.getElementById("feedback-panel");

    optionButtons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === currentItem.correct) {
            btn.classList.add("state-correct");
        }
    });

    if (chosenIndex === currentItem.correct) {
        userScore++;
        feedbackBox.classList.add("correct-style");
        feedbackBox.innerHTML = `🟢 <strong>Resposta Correta!</strong><br>${currentItem.explanation}`;
    } else {
        optionButtons[chosenIndex].classList.add("state-incorrect");
        feedbackBox.classList.add("incorrect-style");
        feedbackBox.innerHTML = `🔴 <strong>Alternativa Incorreta!</strong><br>${currentItem.explanation}`;
    }

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentIndex++;
    if (currentIndex < quizRepository.length) {
        displayQuestion();
    } else {
        renderFinalSummary();
    }
}

function renderFinalSummary() {
    const container = document.getElementById("quiz-workspace");
    container.className = "results-screen fade-in";
    
    document.getElementById("progress-bar-fill").style.width = "100%";
    document.getElementById("progress-text").innerText = "Desafio Concluído";

    container.innerHTML = `
        <h3>🏆 Desafio Concluído!</h3>
        <p>Você acertou <strong>${userScore}</strong> de um total de <strong>${quizRepository.length}</strong> questões sobre Ética e Cidadania Digital.</p>
        <button id="next-btn" style="display: inline-block; float: none;" onclick="location.reload()">Refazer o Desafio</button>
    `;
}

// Manipulação do Envio do Formulário de Contato
function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("user-name").value;
    const fbBox = document.getElementById("form-feedback");
    
    fbBox.style.display = "block";
    fbBox.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
    fbBox.style.color = "var(--color-success)";
    fbBox.innerHTML = `🎉 Obrigado pelo envio, ${name}! Sua dúvida foi registrada com sucesso em nossa central fictícia.`;
    
    document.getElementById("contact-form").reset();
}

window.onload = displayQuestion;

