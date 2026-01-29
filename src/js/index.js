document.addEventListener("DOMContentLoaded", () => {
  const cards = [
    { name: "bobEsponja", img: "./src/images/cards/bob-esponja.jpg" },
    { name: "bobPatrick", img: "./src/images/cards/patrick.jpg" },
    { name: "bobBurger", img: "./src/images/cards/burger.jpg" },
    { name: "gary", img: "./src/images/cards/gary.jpg" },
    { name: "seuSirigueijo", img: "./src/images/cards/sirigueijo.jpg" },
    { name: "plankton", img: "./src/images/cards/plankton.jpg" },
    { name: "personagens", img: "./src/images/cards/persons.jpg" },
    { name: "lulaMolusco", img: "./src/images/cards/lulamolusco.jpg" },
    { name: "sandy", img: "./src/images/cards/sandy.jpg" },
    { name: "homes", img: "./src/images/cards/homes.jpg" },
    { name: "balls", img: "./src/images/cards/balls.jpg" },
    { name: "bobcry", img: "./src/images/cards/bobcry.jpg" },

    { name: "bobEsponja", img: "./src/images/cards/bob-esponja.jpg" },
    { name: "bobPatrick", img: "./src/images/cards/patrick.jpg" },
    { name: "bobBurger", img: "./src/images/cards/burger.jpg" },
    { name: "gary", img: "./src/images/cards/gary.jpg" },
    { name: "seuSirigueijo", img: "./src/images/cards/sirigueijo.jpg" },
    { name: "plankton", img: "./src/images/cards/plankton.jpg" },
    { name: "personagens", img: "./src/images/cards/persons.jpg" },
    { name: "lulaMolusco", img: "./src/images/cards/lulamolusco.jpg" },
    { name: "sandy", img: "./src/images/cards/sandy.jpg" },
    { name: "homes", img: "./src/images/cards/homes.jpg" },
    { name: "balls", img: "./src/images/cards/balls.jpg" },
    { name: "bobcry", img: "./src/images/cards/bobcry.jpg" }
  ];

  cards.sort(() => 0.5 - Math.random());

  const board = document.querySelector(".board");
  const timerView = document.querySelector("#timer");
  const attemptsView = document.querySelector("#attempts");
  const resultView = document.querySelector("#result");

  let seconds = 0;
  let attempts = 0;
  let timerInterval = null;
  let timerStarted = false;

  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];

  function startTimer() {
    if (!timerStarted) {
      timerStarted = true;
      timerInterval = setInterval(() => {
        seconds++;
        timerView.textContent = `${seconds}s`;
      }, 1000);
    }
  }

  function checkForMatch() {
    const cardsElements = document.querySelectorAll("img");
    const [firstId, secondId] = cardsChosenId;

    attempts++;
    attemptsView.textContent = attempts;

    if (firstId !== secondId && cardsChosen[0] === cardsChosen[1]) {
      cardsElements[firstId].src = "./src/images/match.gif";
      cardsElements[secondId].src = "./src/images/match.gif";

      cardsElements[firstId].removeEventListener("click", flipCard);
      cardsElements[secondId].removeEventListener("click", flipCard);

      cardsWon.push(cardsChosen);
    } else {
      cardsElements[firstId].src = "./src/images/back-card.jpg";
      cardsElements[secondId].src = "./src/images/back-card.jpg";

    }

    cardsChosen = [];
    cardsChosenId = [];
    resultView.textContent = `Pares encontrados: ${cardsWon.length}`;

    if (cardsWon.length === cards.length / 2) {
      clearInterval(timerInterval);
      alert(
        `CÊ É FODA! Agora vai de novo, e de novo ❤️\n
        Tentativas: ${attempts}\n
        Tempo final: ${seconds} segundos`
      );
    }
  }

  function createBoard() {
    cards.forEach((_, i) => {
      const card = document.createElement("img");
      card.setAttribute("src", "./src/images/back-card.jpg");
      card.classList.add("classImage");
      card.dataset.id = i;
      card.addEventListener("click", flipCard);
      board.appendChild(card);
    });
  }

  function flipCard() {
    startTimer();

    const cardId = this.dataset.id;
    if (cardsChosenId.includes(cardId)) return;

    cardsChosen.push(cards[cardId].name);
    cardsChosenId.push(cardId);
    this.src = cards[cardId].img;

    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 800);
    }
  }

  createBoard();
});