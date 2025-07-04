let scores, currentScore, activePlayer, gamePlaying;
const totalScores = document.querySelectorAll('.total-score');
const currentScores = document.querySelectorAll('.current-score');
const players = document.querySelectorAll('.player');
const diceFace = document.querySelector('.dice-face');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    totalScores[0].textContent = '0';
    totalScores[1].textContent = '0';
    currentScores[0].textContent = '0';
    currentScores[1].textContent = '0';
    
    diceFace.textContent = '';
    players[0].classList.add('active');
    players[1].classList.remove('active');
    players[0].classList.remove('winner');
    players[1].classList.remove('winner');
}
function switchPlayer() {
    currentScore = 0;
    currentScores[activePlayer].textContent = '0';
    activePlayer = activePlayer === 0 ? 1 : 0;
    players[0].classList.toggle('active');
    players[1].classList.toggle('active');
}
btnRoll.addEventListener('click', function() {
    if (!gamePlaying) return;
    const dice = Math.floor(Math.random() * 6) + 1;
    diceFace.textContent = dice;
    if (dice !== 1) {
        currentScore += dice;
        currentScores[activePlayer].textContent = currentScore;
    } else {
        switchPlayer();
    }
});
btnHold.addEventListener('click', function() {
    if (!gamePlaying) return;
    scores[activePlayer] += currentScore;
    totalScores[activePlayer].textContent = scores[activePlayer];
    if (scores[activePlayer] >= 100) {
        gamePlaying = false;
        players[activePlayer].classList.add('winner');
        diceFace.textContent = '🎉';
    } else {
        switchPlayer();
    }
});
btnNew.addEventListener('click', init);
init();
