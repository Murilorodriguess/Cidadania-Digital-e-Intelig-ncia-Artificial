let score = 0;
let answered = {};

function quiz(id, correct) {

    // impede repetir resposta na mesma pergunta
    if (answered[id]) return;

    answered[id] = true;

    if (correct) {
        score++;
    }

    document.getElementById("score").innerText =
        "Pontuação: " + score + " / 10";

    // feedback visual opcional
    alert(correct ? "✔ Resposta correta!" : "✘ Resposta incorreta!");
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
