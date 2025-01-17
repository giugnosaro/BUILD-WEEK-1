/********ARRAY DOMANDE****************************/
const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you <br>put on a  variable to make sure  it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; <br>they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/*************************Costanti e variabili***********************************/
const risposteButtons = document.querySelectorAll(".btn");
const prossimaButton = document.getElementById("next-btn");
const domandaElement = document.getElementById("Domanda");
const divNumeroDomande = document.getElementById("myDiv");
const giuste = [];
const sbagliate = [];

let indiceCorrente = 0;
let punteggio = 0;
let punteggioSbagliate = 0;
/*********************************Funzioni******************************************/

//Questa funzione mostra la domanda corrente e il relativo numero
function mostraDomanda() {
  if (indiceCorrente >= questions.length) {
    document.getElementById("bottone_risultati").style.display = "block";
    prossimaButton.style.display = "none";
    return;
  }

  const domandaCorrente = questions[indiceCorrente];
  divNumeroDomande.innerHTML = `<p id="numDom">Question ${
    indiceCorrente + 1
  } <span class="question_span">/ ${questions.length}</span></p>`;
  domandaElement.innerHTML = `${domandaCorrente.question}`;
  caricaRisposte();
}

//Questa funzione mostra le risposte e ne gestisce i bottoni
function caricaRisposte() {
  const domanda = questions[indiceCorrente];
  const risposte = [...domanda.incorrect_answers];
  risposte.splice(
    Math.floor(Math.random() * (risposte.length + 1)),
    0,
    domanda.correct_answer
  );

  risposteButtons.forEach((button, index) => {
    if (index < risposte.length) {
      button.textContent = risposte[index];
      button.disabled = false;
      button.classList.remove("hide");
      button.classList.remove("rispostaSelezionata");
      button.addEventListener("click", gestisciClickRisposta);
    } else {
      button.classList.add("hide");
    }
  });
}

// Questa funzione controlla se la risposta corretta è stata selezionata e tiene il conto del punteggio
function gestisciClickRisposta() {
  risposteButtons.forEach((button) => {
    button.disabled = true;
  });

  this.classList.add("rispostaSelezionata");

  const domanda = questions[indiceCorrente];
  if (this.textContent === domanda.correct_answer) {
    giuste.push(this.textContent);
    punteggio++;
  } else {
    sbagliate.push(this.textContent);
    punteggioSbagliate++;
  }
  console.log("sbagliate", punteggioSbagliate);
  console.log("giuste", punteggio);
  prossimaButton.style.display = "inline";
}

// Questa funzione permette di cambiare domanda e gestisce il bottone 'next'
function prossimaDomanda() {
  indiceCorrente++;
  mostraDomanda();
  resettaTimer();
  risposteButtons.forEach((button) => {
    button.disabled = false;
  });
}
/*************funzione timer************************/

// Questa funzione resetta il timer e gestisce il cambio a fine tempo
function resettaTimer() {
  clearInterval(timerInterval);
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  startTimer();
  document
    .getElementById("base-timer-path-remaining")
    .classList.remove(COLOR_CODES.alert.color);
  document
    .getElementById("base-timer-path-remaining")
    .classList.add(COLOR_CODES.info.color);
}
document.addEventListener("DOMContentLoaded", () => {
  mostraDomanda();
  startTimer();
});

document.addEventListener("DOMContentLoaded", () => {
  mostraDomanda();
  prossimaButton.addEventListener("click", prossimaDomanda);
});

/***********************************funzioni risultati****************************/

// Questo blocco di codice scrive il testo del grafico dei risultati
const centerTextPlugin = {
  id: "centerText",
  afterDraw: function (chart) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.font = "16px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
    const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
    const risposteCorrette = giuste.length;
    const totaleDomande = questions.length;
    const text = `${risposteCorrette} di ${totaleDomande}`;
    ctx.fillText(text, centerX, centerY);
    ctx.restore();
  },
};

//questa funzione gestisce la creazione della pagina dei risultati
//gestisce le percentuali ottenute
//e si occupa di creare un grafico a seconda del risultato ottenuto
function mostraRisultati() {
  // Nascondi il timer
  document.getElementById("timer").style.display = "none";
  // Nascondi il numero delle domande
  document.getElementById("myDiv").style.display = "none";

  // Disabilita il timer
  clearInterval(timerInterval);

  // Disabilita i pulsanti di risposta
  risposteButtons.forEach((button) => {
    button.disabled = true;
  });

  // Disabilita il pulsante "Prossima domanda"
  prossimaButton.disabled = true;

  const totaleDomande = questions.length;
  const risposteCorrette = giuste.length;
  const risposteSbagliate = sbagliate.length;
  const percentualeCorrette = (risposteCorrette / totaleDomande) * 100;
  const percentualeSbagliate = (risposteSbagliate / totaleDomande) * 100;

  const risultatiHTML = `
    <h2 id="titolo_risultati">Risultati del Quiz</h2>
   <div class="flex_container">
   <div id="corrette"><p> Correct ${percentualeCorrette.toFixed(
     2
   )}% ${risposteCorrette} </p></div>           
   <div id="incorrette"><p> Wrong ${percentualeSbagliate.toFixed(
     2
   )}% ${risposteSbagliate} </p>               
   </div>
   `;
  document.getElementById("feedback-btn").style.display = "block";
  document.getElementById("quiz").style.display = "none";
  document.getElementById("timer").style.display = "none";
  window.onload = document.getElementById("bottone_risultati").style.display =
    "none";
  document.getElementById(
    "testoSinistra"
  ).innerHTML = `<p style="font-size: 60px;margin:0;text-align:left;">CORRECT ${percentualeCorrette.toFixed(
    2
  )}%</p><p style="font-size: 23px;margin:0;text-align:left;">${risposteCorrette}/${totaleDomande}&nbsp;questions</p>`;
  document.getElementById(
    "testoDestra"
  ).innerHTML = `<p style="font-size: 60px;margin:0;text-align:right;">WRONG ${percentualeSbagliate.toFixed(
    2
  )}%</p><p style="font-size: 23px;margin:0;text-align:right;">${risposteSbagliate}/${totaleDomande}&nbsp;questions</p>`;
  function lanciaCoriandoli() {
    var durata = 15 * 1000;
    var fineAnimazione = Date.now() + durata;

    // questa funzione gestisce i coriandoli (grazie Rosario),quando sei promosso è festa
    (function frame() {
      confetti({
        particleCount: 10,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#090f3b", "#65208c"],
      });
      confetti({
        particleCount: 10,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#090f3b", "#65208c"],
      });

      if (Date.now() < fineAnimazione) {
        requestAnimationFrame(frame);
      }
    })();
  }

  // Grafico
  //questa funzione gestisce il grafico dei risultati,dandogli i colori corretti e la label a seconda del risultato
  const data = {
    labels: ["Risposte Corrette", "Risposte Sbagliate"],
    datasets: [
      {
        label: "Risultati del Quiz",
        data: [risposteCorrette, risposteSbagliate],
        backgroundColor: ["rgb(75, 192, 192)", "#C2128D"],
        hoverOffset: 4,
        borderColor: "transparent",
      },
    ],
  };

  document
    .getElementById("feedback-btn")
    .addEventListener("click", function () {
      // Reindirizza l'utente alla pagina desiderata
      window.location.href = "feedback.html";
    });

  const config = {
    type: "doughnut",
    data: data,
    options: {
      responsive: true,
      cutout: "70%",
      animation: {
        onComplete: function () {
          const chart = this;
          const {
            ctx,
            chartArea: { top, bottom, left, right, width, height },
          } = chart;

          ctx.save();
          ctx.font = "16px Rubik";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "black";

          let lines;

          if (risposteCorrette >= 6) {
            lines = [
              {
                text: "Congratulations!",
                color: "white",
                font: "20px Rubik",
                fontWeight: "bold",
              },
              {
                text: "You passed the exam.",
                color: "#00FFFF",
                font: "20px Rubik",
                fontWeight: "bold",
              },
              { text: "" },
              {
                text: "We'll send you the certificates",
                color: "white",
                font: "normal 15px Rubik",
              },
              {
                text: "in a few minutes.",
                color: "white",
                font: "normal 15px Rubik",
              },
              {
                text: "Check your email (including",
                color: "white",
                font: "normal 15px Rubik",
              },
              {
                text: "promotions/spam folder)",
                color: "white",
                font: "normal 15px Rubik",
              },
            ];
          } else {
            lines = [
              {
                text: "Sorry,",
                color: "red",
                font: "18px Rubik",
                fontWeight: "bold",
              },
              {
                text: "you didn't pass the exam...!!",
                color: "red",
                font: "16px Rubik",
                fontWeight: "bold",
              },
              { text: "" },
              {
                text: "We'll not send you the certificate.",
                color: "white",
                font: "normal 15px Rubik",
              },
            ];
          }

          const lineHeight = 22;
          const totalHeight = lines.length * lineHeight;
          const startY = top + (height - totalHeight) / 2;
          if (risposteCorrette > totaleDomande / 2) {
            lanciaCoriandoli();
          }
          lines.forEach((line, i) => {
            const lineY = startY + i * lineHeight;
            ctx.fillStyle = line.color;
            ctx.font = `${line.fontWeight || "normal"} ${
              line.font || "16px Arial"
            }`;
            ctx.fillText(line.text, left + width / 2, lineY);
          });

          ctx.restore();
        },
      },
      plugins: {
        legend: {
          position: "",
        },
        title: {
          display: true,
          text: "Results",
          font: {
            size: 60,
            family: "Rubik",
            weight: "bold",
          },
          color: "#C2C2C2",
        },
      },
    },
  };

  const canvasGrafico = document
    .getElementById("graficoRisultati")
    .getContext("2d");

  new Chart(canvasGrafico, config);

  document.getElementById("quiz").style.display = "none";

  document.getElementById("graficoRisultati").style.display = "block";
  mostraRisultati();

  // Mostra i risultati
  document.getElementById("risultati").innerHTML = risultatiHTML;
}
/////////// FEEDBACK PAGE
let selectedStar = 0;
function selectStar(index) {
  selectedStar = index;
  const stars = document.querySelectorAll(".star");
  stars.forEach((star, i) => {
    if (i < index) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
  checkInputs();
}

function checkInputs() {
  const feedbackInput = document.getElementById("feedback-input");
  const moreInfoBtn = document.getElementById("moreInfo");

  if (selectedStar > 0 && feedbackInput.value.trim() !== "") {
    moreInfoBtn.disabled = false;
  } else {
    moreInfoBtn.disabled = true;
  }
}
