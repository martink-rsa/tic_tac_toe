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

// ISSUES:
// - Perimeter outline on the container holding game squares
// --- This is due to the background being used to show a grid.
// --- Options
//        * Use SVG 
//        * Extend container to be full screen. Requires: New alignments
//        * Deal with it

// CONSIDERATIONS:
// - There are additional animations to consider for the grid creation animation, incl.
// --- Increasing Stroke
// --- Opacity

const Player = (name, mark, type) => {
  let _name = name;
  let _mark = mark;
  let _type = type;

  const getName = () => _name;
  const setName = (newName) => { _name = newName; };

  const getMark = () => _mark;
  const setMark = (newMark) => { _mark = newMark; };

  const getType = () => _type;
  const setType = (newType) => { _type = newType; };

  const displayDetails = () => console.log(`${getName()} ${getMark()}`);

  return Object.freeze({
    getName,
    setName,
    getMark,
    setMark,
    getType,
    setType,
    displayDetails,
  });
};

const playerOne = Player('Player 1', 'o', 'player');
const playerTwo = Player('Player 2', 'x', 'computer');

const GameBoard = (() => {
  const _gridElements = document.getElementsByClassName('mark-container');




  const toggleActiveDisplay = (currentState) => {
    // States currently:
    //    Game Over
    //    Main state? In-game state 
    console.log('--- toggleStateDisplay: ' + currentState);
    if (currentState.toLowerCase() === 'gameover') {
      const gameover = document.getElementById('game-over-window');
      gameover.classList.remove('show-container');
      gameover.style.pointerEvents = 'none';


      const gameboard = document.getElementById('')
    }
  };

  const closeGameOver = () => {
    toggleActiveDisplay('gameover');
  };

  const toggleTest = () => {
    // Testing setup for:
    // Grid visiblity
    const svg = document.getElementsByTagName('svg');
    
    const svgElement = svg[1].getElementsByTagName('line');
    console.log(svgElement);
    for (let i = 0; i < svgElement.length; i += 1) {
      svgElement[i].classList.toggle('grid-line-row-show');
    }
    /*noughtCircles[0].classList.toggle('nought-show');
    noughtCircles[1].classList.toggle('nought-show');*/
  };

  const displayCurrentPlayer = (player) => {
    const displayElement = document.getElementById('display-current-player');
    const displaySVG = displayElement.getElementsByTagName('svg');
    const displayText = displayElement.getElementsByTagName('text');
    displaySVG[0].classList.toggle('player-one-fill');
    displaySVG[0].classList.toggle('player-two-fill');
    for (let i = 0; i < displayText.length; i += 1) {
      displayText[i].textContent = player.getName();
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
    GameMain.playTurn(positionPlayed);
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
    displayCurrentPlayer,
    closeGameOver,
  };
})();

const ComputerAI = (() => {
  // const _placeholder = document.getElementsByClassName('mark-container');

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
  let setGameOver = (state) => {
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
    console.log("WINNER IS " + winner.getName());
    console.log(isGameOver());
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

    // Last round: End of game
    if (getCurrentTurn() === getGrid().flat().length) {
      console.log('GAME END');
    } else {
      console.log('Current round is: ' + (getCurrentTurn() + 1))
      drawMark(positionPlayed, currentPlayer);

      if (checkWinConditions(currentPlayer)) {
        setGameOver(true);
        setTimeout(() => {
          gameEnd(currentPlayer);
        }, 2000);
      }

      // Increment the turn so the next player can be checked.
      newTurn(currentPlayer);
      // MAYBE MOVE TO newTurn()?
      
      GameBoard.displayCurrentPlayer(currentPlayer);
      // Can't wait for the Computer to click an element
      // and must force the next turn with the computer's choice.
      if (nextPlayer.getType().toLowerCase() === 'computer' && !isGameOver()) {

        setTimeout(() => { 
          playTurn(ComputerAI.computePosition(getGrid()));
          GameBoard.displayCurrentPlayer(nextPlayer);
        }, 1000);
      }
      
    }
  };

  const resetGame = () => {
    setGrid([['', '', ''], ['', '', ''], ['', '', '']]);
    GameBoard.update(getGrid(), -1);
    resetTurns();
    setGameOver = false;
  };

  return {
    newGame,
    getGrid,
    drawMark,
    playTurn,
    resetGame,
  };
})();

GameBoard.init();
GameBoard.update(GameMain.getGrid(), -1);

GameMain.newGame(playerOne, playerTwo);

document.getElementById('btn-play-game').addEventListener('click', GameBoard.toggleTest);
document.getElementById('btn-reset-game').addEventListener('click', GameMain.resetGame);
document.getElementById('btn-game-over-close').addEventListener('click', GameBoard.closeGameOver);
/* TEST UNITS */
// Check if test unit is working
function testOutput(input) {
  return input;
}

module.exports = {
  testOutput,
  Player,
  GameBoard,
  GameMain,
};
