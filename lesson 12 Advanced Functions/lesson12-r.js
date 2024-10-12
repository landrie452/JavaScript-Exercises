let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };
  
  updateScoreElement();
  
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */
  
  let isAutoPlaying = false;
  let intervalId;
  
  //const autoPlay = () => {
  
  //};

  function autoPlay() {
    if (!isAutoPlaying) {
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;

     //solution for lesson 12-t
     autoPlayButton.innerHTML = 'Stop Playing'
      
      

    } else {
      clearInterval(intervalId);
      isAutoPlaying = false;
      //solution for lesson 12-t
      autoPlayButton.innerHTML = 'Auto Play'
    }
  }
  
  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('rock');
    });
  
  document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('paper');
    });
  
  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('scissors');
    });
  
    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock');
      } else if (event.key === 'p') {
        playGame('paper');
      } else if (event.key === 's') {
        playGame('scissors');
      } 
    });
  
  function playGame(playerMove) {
    const computerMove = pickComputerMove();
  
    let result = '';
  
    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }
  
    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }
  
    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Tie.') {
      score.ties += 1;
    }
  
    localStorage.setItem('score', JSON.stringify(score));
  
    updateScoreElement();
  
    document.querySelector('.js-result').innerHTML = result;
  
    document.querySelector('.js-moves').innerHTML = `You
  <img src="../images/${playerMove}-emoji.png" class="move-icon">
  <img src="../images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
  }
  
  function updateScoreElement() {
    document.querySelector('.js-score')
      .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
  
  function pickComputerMove() {
    const randomNumber = Math.random();
  
    let computerMove = '';
  
    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }
  
    return computerMove;
  }
  
  // Solution for 12v.
  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

//solution for lesson 12-v
const resetButton = document.querySelector('.js-reset-score-button');
resetButton.addEventListener('click', (event)=>{
  resetScoreConfirmation();
  
});

//solution  for lesson 12-s
const autoPlayButton = document.querySelector('.js-auto-play-button');
autoPlayButton.addEventListener('click',(event)=>{
    autoPlay();
})

//solution for lesson 12-u
document.addEventListener('keydown',(event)=>{
  if(event.key == 'a'){
    autoPlay();
  };
});

// solution for lesson 12-w

document.addEventListener('keydown',(event)=>{
  if(event.key === 'Backspace'){
    
    resetScoreConfirmation();
  }
});

//solution for lesson 12-x
function resetScoreConfirmation(){
const resetConfirmation = document.querySelector('.js-reset-confirmation');
resetConfirmation.innerHTML = `Do you really wanted to Reset Score?
                              <button class = 'yes-confirm-btn' onclick = 'yesReset()'>Yes</button>
                              <button class = 'no-confirm-btn' onclick = 'removeResetConfirmation()'>No</button>`;
}

function yesReset(){
  resetScore();
  removeResetConfirmation();
}


function removeResetConfirmation(){
  const resetConfirmation = document.querySelector('.js-reset-confirmation');
  resetConfirmation.innerHTML = '';
}