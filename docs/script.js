"use script";

/* === API === */

/* Link https://web.archive.org/web/2009090907... x Knipp Franz
Knipp Franz21:06

https://web.archive.org/web/20090909075401/http://wortschatz.uni-leipzig.de/Papers/top10000de.txt

Link https://wortschatz.uni-leipzig.de/de/d... x Knipp Franz
Knipp Franz
21:07

https://wortschatz.uni-leipzig.de/de/download/German

Korpusdownload Deutsch

Wortschatz-Portal - Korpusdownload

wortschatz.uni-leipzig.de

http://api.corpora.uni-leipzig.de/ws/swagger-ui.html

*/

/* === FILE === */

/*  === VARIABLEN === */
const alphabet = [];
const specialAlphabet = ["Ä", "Ö", "Ü"];
for (let i = 97; i <= 122; i++) {
  alphabet.push(String.fromCharCode(i).toUpperCase());
}

for (const x of specialAlphabet) {
  alphabet.push(String(x).toUpperCase());
}

const letterContainer = document.querySelector(".letters-container");
let button;
let letter;

for (const x of alphabet) {
  button = document.createElement("button");
  button.classList.add("letter");
  button.id = `letter-${x}`;
  button.value = x;
  button.textContent = x;
  button.onclick = function () {
    handleLetterClick(this);
  };
  letterContainer.appendChild(button);
}

const guessingWords = ["MikeIstCool", "MikeIstStabil", "MikeIstKing"];
const hintWords = ["Name + c...", "Name + s.....", "Name + k..."];

const hintEl = document.querySelector(".hint-word");
const guessEl = document.querySelector(".guess-word");
const lifes = document.querySelector(".attempts-number");
const btnNew = document.querySelector(".new-btn");
const picture = document.querySelector(".hangman-picture");

let index, guessingWord, hiddenWord, life, win, guessedLetters;

/* === START-CONDITIONS === */

const start = function () {
  for (const x of alphabet) {
    const buttonLetter = document.getElementById(`letter-${x}`);
    buttonLetter.classList.remove("letter-crossed");
  }

  win = false;
  life = 7;
  index = Math.trunc(Math.random() * guessingWords.length);
  hiddenWord = "_".repeat(guessingWords[index].length);
  guessedLetters = new Set();

  lifes.textContent = `Leben ${life}`;
  picture.src = `./pics/hang-${life}.png`;
  hintEl.textContent = hintWords[index];
  guessEl.textContent = hiddenWord;
};

start();

/* === GAME === */

function handleLetterClick(button) {
  if (life > 0 && !win) {
    letter = button.value;
    guessingWord = guessingWords[index].toUpperCase();

    guessedLetters.add(letter);

    // prüfen, ob der geratene Buchstabe im Wort vorkommt
    if (guessingWord.includes(letter)) {
      button.classList.add("letter-crossed");
      updateDisplay();
    } else {
      life--;
      picture.src = `./pics/hang-${life}.png`;
      life === 0 ? loseGame() : "";
    }
  }
  lifes.textContent = `Leben ${life}`;
}

// die Funktion, die das Wort mit den geratenen Buchstaben anzeigt
function updateDisplay() {
  let hiddenString = "";

  // jedes Zeichen im Wort durchlaufen und prüfen, ob es geraten wurde
  for (const char of guessingWord) {
    if (guessedLetters.has(char)) {
      hiddenString += char;
      if (hiddenString.includes(guessingWord)) {
        win = true;
        picture.src = `./pics/survive-funny.gif`;
      }
    } else {
      hiddenString += "_";
    }
  }
  guessEl.textContent = hiddenString;
}

btnNew.addEventListener("click", function () {
  start();
});

// funktion wird bei Niederlage aufgerufen
function loseGame() {
  // Time-out
  setTimeout(function () {
    picture.src = `./pics/speed.gif`;
  }, 1500);
}
