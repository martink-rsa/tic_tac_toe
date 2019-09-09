/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */

console.clear();
'use strict';

// https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript?ref=lnav

const Player = (name, mark) => {
  let _name = name;
  let _mark = mark;
  const getName = () => _name;
  const setName = (newName) => { _name = newName; };

  const getMark = () => _mark;
  const setMark = (newMark) => { _mark = newMark; };

  const displayDetails = () => console.log(`${getName()} ${getMark()}`);

  return Object.freeze({
    getName,
    setName,
    getMark,
    setMark,
    displayDetails,
  });
};

const playerOne = Player('Player 1', 'o');
const playerTwo = Player('Player 2', 'x');

const GameBoard = (() => {
  const _gridElements = document.getElementsByClassName('mark-container');

  const toggleTest = () => {
    console.log('TOGGLE');
    console.log(_gridElements[0].children[0].classList);
    console.log(_gridElements[0].getElementsByTagName('circle'));
    const noughtCircles = _gridElements[0].getElementsByTagName('circle');
    noughtCircles[0].classList.toggle('nought-show');
    noughtCircles[1].classList.toggle('nought-show');

  }

  const updateGameBoard = (gridMarks, positionPlayed) => {
    console.log(positionPlayed);
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
      console.log(i + ": " + currentPositionClass);
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
  };
})();

const GameMain = (() => {
  let _grid = [['', '', ''], ['', '', ''], ['', '', '']];
  let _players = [];
  let _currentTurn = 0;

  const getGrid = () => _grid;
  const setGrid = (grid) => {
    _grid = grid.slice(0);
  };

  const getPlayers = () => _players;
  const setPlayers = (players) => {
    _players = players.slice(0);
  };

  const getCurrentTurn = () => _currentTurn;
  const newTurn = () => {
    _currentTurn += 1;
  };
  const resetTurns = () => {
    _currentTurn = 0;
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
    console.log({row},{column});
    _grid[row][column] = currentPlayer.getMark();
    GameBoard.update(GameMain.getGrid(), positionPlayed);

    // CURRENT CHANGES: USE POSITION PLAYED TO ADD ANIMATION TO LAST PIECE PLAYED.
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

  const playTurn = (positionPlayed) => {
    if (getCurrentTurn() === getGrid().flat().length) {
      console.log('GAME END');
    } else {
      console.log('Current round is: ' + (getCurrentTurn() + 1))
      const currentPlayerIndex = getCurrentTurn() % getPlayers().length;
      const players = getPlayers();
      drawMark(positionPlayed, players[currentPlayerIndex]);
      if (checkWinConditions(players[currentPlayerIndex])) {
        alert(players[currentPlayerIndex].getName() + ' wins!');
      }
      newTurn();
    }
  };

  const resetGame = () => {
    setGrid([['', '', ''], ['', '', ''], ['', '', '']]);
    GameBoard.update(getGrid(), -1);
    resetTurns();
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
