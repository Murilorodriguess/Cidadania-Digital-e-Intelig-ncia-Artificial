let score = 0;

/* =========================
   QUIZ
========================= */
function quiz(question, correct) {

    if (correct) {
        score++;
    }

    document.getElementById("score").innerText =
        "Pontuação: " + score;
}

/* =========================
   SIMULADOR DE CONFIANÇA
========================= */
function fakeNews() {

    let resultado = document.getElementById("resultado");
    let chance = Math.random();

    if (chance > 0.6) {
        resultado.innerHTML = "⚠ Conteúdo suspeito ou possível fake news!";
        resultado.style.color = "orange";
    } else {
        resultado.innerHTML = "✔ Conteúdo confiável segundo análise básica.";
        resultado.style.color = "lightgreen";
    }
}
