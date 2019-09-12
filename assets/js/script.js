/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

console.clear();
'use strict';

// https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript?ref=lnav

// TO-DO:
// - SVG implementation needs rework
// --- Find a way to eliminate the ids that repeat
// - Prevent clicking of game squares that are occupied/can't be played
// --- Disable all game squares while computer is playing.
// - Consider new program flow
// - Add gradient overlay on Grid

// ISSUES:
// --- Buttons must be turned into real buttons

// CONSIDERATIONS:
// - There are additional animations to consider for the grid creation animation, incl.
// --- Increasing Stroke
// --- Opacity

const Player = (name, mark, type, color) => {
  let _name = name;
  let _mark = mark;
  let _type = type;
  let _color = color;

  const getName = () => _name;
  const setName = (newName) => { _name = newName; };

  const getMark = () => _mark;
  const setMark = (newMark) => { _mark = newMark; };

  const getType = () => _type;
  const setType = (newType) => { _type = newType; };

  const getColor = () => _color;
  const setColor = (newColor) => { _color = newColor; };

  return Object.freeze({
    getName,
    setName,
    getMark,
    setMark,
    getType,
    setType,
    getColor,
    setColor,
  });
};

const playerOne = Player('Player 1', 'o', 'player', '#ff00ff');
const playerTwo = Player('Player 2', 'x', 'computer', '#ff00ff');

const GameBoard = (() => {
  const _gridElements = document.getElementsByClassName('mark-container');

  const animateGridLines = () => {
    const gameGrid = document.getElementById('svg-game-grid').getElementsByTagName('line');
    console.log(gameGrid);
    for (let i = 0; i < gameGrid.length; i += 1) {
      gameGrid[i].classList.toggle('grid-line-draw');
    }
  };

  const animateGameOver = (showFlag) => {
    const mark = document.getElementById('svg-game-over-mark');
    const staticText = document.getElementById('svg-winner-static');
    const playerText = document.getElementById('svg-winner-player');
    if (showFlag) {
      // MARK PLAYED
      mark.classList.add('animate-game-over-mark');
      // "WINNER" STATIC TEXT
      staticText.classList.add('animate-game-over-static');
      // PLAYER DYNAMIC TEXT
      playerText.classList.add('animate-game-over-winner');
    } else {
      mark.classList.remove('animate-game-over-mark');
      staticText.classList.remove('animate-game-over-static');
      playerText.classList.remove('animate-game-over-winner');

    }
  }

  const toggleDisplayState = (element, showFlag) => {
    const tempElement = element;
    if (showFlag) {
      tempElement.classList.add('show-container');
      tempElement.style.pointerEvents = 'auto';
    } else {
      tempElement.classList.remove('show-container');
      tempElement.style.pointerEvents = 'none';
    }
  };

  const allocateDisplayState = (displayState) => {
    const gameOver = document.getElementById('game-over-window');
    const gameBoard = document.getElementById('game-main');
    const delayBetweenStates = 500;
    if (displayState.toLowerCase() === 'gameboard') {
      toggleDisplayState(gameOver, false);
      setTimeout(() => { animateGridLines(); }, delayBetweenStates);
      setTimeout(() => { toggleDisplayState(gameBoard, true); }, 600);
      animateGameOver(false);
    } if (displayState.toLowerCase() === 'gameover') {
      animateGridLines();
      toggleDisplayState(gameBoard, false);
      setTimeout(() => { toggleDisplayState(gameOver, true); }, 800);
      setTimeout(() => { animateGameOver(true); }, 1000);
    }
  };

  // Button press (MUST RENAME, TERRIBLE NAME)
  const closeGameOver = () => {
    allocateDisplayState('gameboard');
    GameMain.resetGame();
  };

  const toggleTest = () => {
    // Quick test function

  };

  const displayPlayer = (player) => {
    const displayElement = document.getElementById('display-current-player');
    const displaySVG = displayElement.getElementsByTagName('svg');
    const displayText = displayElement.getElementsByTagName('text');
    console.log(player);
    const playerIndex = GameMain.getPlayers().indexOf(player);
    console.log("INDEX: " + playerIndex);
    if (playerIndex === 0) {
      displaySVG[0].classList.add('player-one-fill');
      displaySVG[0].classList.remove('player-two-fill');
    } else if (playerIndex === 1) {
      displaySVG[0].classList.remove('player-one-fill');
      displaySVG[0].classList.add('player-two-fill');
    }
    for (let i = 0; i < displayText.length; i += 1) {
      displayText[i].textContent = player.getName();
      console.log(player.getName());
    }
  };

  const updateGameBoard = (gridMarks, positionPlayed) => {
    const marks = gridMarks.flat();
    let noughtClass;
    let crossClass;
    let currentContainer;
    let currentPositionClass = '';
    if (playerOne.getMark().toLowerCase() === 'o') {
      noughtClass = 'player-one';
      crossClass = 'player-two';
    } else {
      noughtClass = 'player-two';
      crossClass = 'player-one';
    }
    for (let i = 0; i < marks.length; i += 1) {
      if (currentPositionClass !== -1 && Number(positionPlayed) === i) {
        currentPositionClass = '';
      } else {
        if (marks[i].toLowerCase() === 'o') {
          currentPositionClass = 'nought-show';
        } else if (marks[i].toLowerCase() === 'x') {
          currentPositionClass = 'cross-show';
        } else {
          currentPositionClass = '';
        }
      }

      currentContainer = _gridElements[i];
      if (marks[i].toLowerCase() === 'o') {
        currentContainer.innerHTML = '<svg class="' + noughtClass + '" height="100" width="100" viewBox="0 0 100 100"><g><defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4 4" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="glow"/></feMerge></filter></defs><circle style="filter: url(#glow); opacity: 0.75;" class="nought ' + currentPositionClass + '" cx="50" cy="50" r="30"/><circle class="nought ' + currentPositionClass + '" cx="50" cy="50" r="30"/></g></svg>';   
      } else if (marks[i].toLowerCase() === 'x') {
        currentContainer.innerHTML = '<svg class="' + crossClass + '" height="100" width="100" viewBox="0 0 100 100"><g><defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4 4" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="glow"/></feMerge></filter></defs><line style="filter: url(#glow); opacity: 0.75;" class="cross ' + currentPositionClass + '" x1="20" y1="20" x2="80" y2="80"/><line style="filter: url(#glow);" class="cross cross-delay ' + currentPositionClass + '" x1="80" y1="20" x2="20" y2="80"/><line class="cross ' + currentPositionClass + '" x1="20" y1="20" x2="80" y2="80"  /><line class="cross cross-delay ' + currentPositionClass + '" x1="80" y1="20" x2="20" y2="80" /></g></svg>';
      } else {
        currentContainer.innerHTML = '';
      }
    }
    if (positionPlayed !== -1) {
      if (marks[positionPlayed].toLowerCase() === 'o') {
        const noughtCircles = _gridElements[positionPlayed].getElementsByTagName('circle');
        setTimeout(() => {
          noughtCircles[0].classList.toggle('nought-show');
          noughtCircles[1].classList.toggle('nought-show');
        }, 100);
      } else if (marks[positionPlayed].toLowerCase() === 'x') {
        const crossLines = _gridElements[positionPlayed].getElementsByTagName('line');
        setTimeout(() => {
          crossLines[0].classList.toggle('cross-show');
          crossLines[1].classList.toggle('cross-show');
          crossLines[2].classList.toggle('cross-show');
          crossLines[3].classList.toggle('cross-show');
        }, 100);
      }
    }
  };

  const gameElementClicked = (e) => {
    const positionPlayed = e.target.getAttribute('data-value');
    const grid = GameMain.getGrid().flat();
    if (grid[positionPlayed] === '') {
      GameMain.playTurn(positionPlayed);
    }
  };

  const initGrid = () => {
    for (let i = 0; i < _gridElements.length; i += 1) {
      _gridElements[i].addEventListener('click', gameElementClicked);
    }
  };

  return {
    update: updateGameBoard,
    init: initGrid,
    toggleTest,
    displayPlayer,
    closeGameOver,
    allocateDisplayState,
  };
})();

const ComputerAI = (() => {
  const generateRandNum = (low, high) => Math.floor((Math.random() * high) + low);

  const computePosition = (grid) => {
    const positionsAvailable = [];
    const gridFlattened = grid.flat();
    for (let i = 0; i < gridFlattened.length; i += 1) {
      if (gridFlattened[i] === '') {
        positionsAvailable.push(i);
      }
    }
    const randNum = generateRandNum(0, positionsAvailable.length - 1);
    const positionChosen = positionsAvailable[randNum];
    return positionChosen;
  };

  return {
    computePosition,
  };
})();

const GameMain = (() => {
  let _grid = [['', '', ''], ['', '', ''], ['', '', '']];
  let _players = [];
  let _currentTurn = 0;
  let _gameOver = false;

  const getGrid = () => _grid;
  const setGrid = (grid) => {
    _grid = grid.slice(0);
  };

  const getPlayers = () => _players;
  const setPlayers = (players) => {
    _players = players.slice(0);
  };

  const getCurrentTurn = () => _currentTurn;

  const resetTurns = () => {
    _currentTurn = 0;
  };

  const isGameOver = () => _gameOver;
  const setGameOver = (state) => {
    _gameOver = state;
  };

  const newGame = (...players) => {
    const newPlayers = [];
    for (let i = 0; i < players.length; i += 1) {
      newPlayers.push(players[i]);
    }
    setPlayers(newPlayers);
  };

  const drawMark = (positionPlayed, currentPlayer) => {
    const row = parseInt(positionPlayed / 3, 10);
    const column = positionPlayed % 3;
    _grid[row][column] = currentPlayer.getMark();
    GameBoard.update(GameMain.getGrid(), positionPlayed);
  };

  const checkWinConditions = (player) => {
    const grid = getGrid();
    const mark = player.getMark();
    // COLUMNS
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[0][i] === mark && grid[1][i] === mark && grid[2][i] === mark) {
        return true;
      }
    }
    // ROWS
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[i][0] === mark && grid[i][1] === mark && grid[i][2] === mark) {
        return true;
      }
    }
    // DIAGONAL - RIGHT
    if (grid[0][0] === mark && grid[1][1] === mark && grid[2][2] === mark) {
      return true;
    }
    // DIAGONAL - LEFT
    if (grid[0][2] === mark && grid[1][1] === mark && grid[2][0] === mark) {
      return true;
    }
    return false;
  };

  const gameEnd = (winner) => {
    //setTimeout(GameBoard.allocateDisplayState('gameover', true), 1000);
    GameBoard.allocateDisplayState('gameover', true);
  };

  const newTurn = (player) => {

    _currentTurn += 1;
  };

  const playTurn = (positionPlayed) => {
    const currentPlayerIndex = getCurrentTurn() % getPlayers().length;
    const nextPlayerIndex = (getCurrentTurn() + 1) % getPlayers().length;
    const players = getPlayers();
    const currentPlayer = players[currentPlayerIndex];
    const nextPlayer = players[nextPlayerIndex];

    /* setTimeout(() => {
      GameBoard.displayPlayer(player);
    }, 1000); */

    GameBoard.displayPlayer(currentPlayer);
    // Last round: End of game
    if (getCurrentTurn() === getGrid().flat().length) {
      console.log('GAME END');
    } else {
      console.log('Current round is: ' + (getCurrentTurn() + 1))
      drawMark(positionPlayed, currentPlayer);

      if (checkWinConditions(currentPlayer)) {
        console.log("WIN CONDITION");
        console.log(setGameOver);
        setGameOver(true);
        setTimeout(() => {
          gameEnd(currentPlayer);
        }, 2000);
      }

      // Increment the turn so the next player can be checked.
      newTurn(currentPlayer);
      // MAYBE MOVE TO newTurn()?
      // Can't wait for the Computer to click an element
      // and must force the next turn with the computer's choice.
      if (nextPlayer.getType().toLowerCase() === 'computer' && !isGameOver()) {
        setTimeout(() => { 
          playTurn(ComputerAI.computePosition(getGrid()));
        }, 1000);
      }
      if (currentPlayer.getType().toLowerCase() === 'computer' && !isGameOver()) {
        setTimeout(() => { 
          GameBoard.displayPlayer(nextPlayer);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGrid([['', '', ''], ['', '', ''], ['', '', '']]);
    GameBoard.update(getGrid(), -1);
    resetTurns();
    setGameOver(false);
  };

  return {
    newGame,
    getGrid,
    drawMark,
    playTurn,
    resetGame,
    getPlayers,
  };
})();

GameBoard.init();
GameBoard.update(GameMain.getGrid(), -1);

GameMain.newGame(playerOne, playerTwo);

document.getElementById('btn-play-game').addEventListener('click', GameBoard.toggleTest);
document.getElementById('btn-reset-game').addEventListener('click', GameMain.resetGame);
document.getElementById('btn-game-over-close').addEventListener('click', GameBoard.closeGameOver); //
/* TEST UNITS */
// Check if test unit is working
function testOutput(input) {
  return input;
}
/*
module.exports = {
  testOutput,
  Player,
  GameBoard,
  GameMain,
};

*/