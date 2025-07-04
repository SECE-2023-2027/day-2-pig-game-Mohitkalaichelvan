let scores, currentScore, activePlayer, playing;

const scoreEls = document.querySelectorAll('.player-score');
const currentEls = document.querySelectorAll('.player-current-score');
const playerEls = document.querySelectorAll('.player');
const diceFace = document.querySelector('.dice-face');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
const btnNew = document.querySelector('.btn-new');

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scoreEls[0].textContent = 0;
  scoreEls[1].textContent = 0;
  currentEls[0].textContent = 0;
  currentEls[1].textContent = 0;

  playerEls[0].classList.add('active');
  playerEls[1].classList.remove('active');
  playerEls[0].classList.remove('winner');
  playerEls[1].classList.remove('winner');

  updateDice(1); // reset dice face
};

const switchPlayer = () => {
  currentEls[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEls[0].classList.toggle('active');
  playerEls[1].classList.toggle('active');
};

const updateDice = (num) => {
  diceFace.className = 'dice-face dice-' + num;
  diceFace.innerHTML = '';
  const positions = {
    1: [[50, 50]],
    2: [[25, 25], [75, 75]],
    3: [[25, 25], [50, 50], [75, 75]],
    4: [[25, 25], [25, 75], [75, 25], [75, 75]],
    5: [[25, 25], [25, 75], [50, 50], [75, 25], [75, 75]],
    6: [[25, 25], [25, 50], [25, 75], [75, 25], [75, 50], [75, 75]],
  };
  positions[num].forEach(([top, left]) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.style.top = top + '%';
    dot.style.left = left + '%';
    diceFace.appendChild(dot);
  });
};

btnRoll.addEventListener('click', function () {
  if (!playing) return;

  const dice = Math.trunc(Math.random() * 6) + 1;
  updateDice(dice);

  if (dice !== 1) {
    currentScore += dice;
    currentEls[activePlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;

  scores[activePlayer] += currentScore;
  scoreEls[activePlayer].textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    playerEls[activePlayer].classList.add('winner');
    playerEls[activePlayer].classList.remove('active');
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

// Initialize game on page load
init();
