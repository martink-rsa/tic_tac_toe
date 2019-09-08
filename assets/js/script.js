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

const GameBoard = (() => {
  const _gridElements = document.getElementsByClassName('mark-container');

  const updateGameBoard = (gridMarks) => {
    const marks = gridMarks.flat();
    for (let i = 0; i < marks.length; i += 1) {
      _gridElements[i].textContent = marks[i];
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
  };
})();

const GameMain = (() => {
  let _grid = [['', '', ''], ['', '', ''], ['_', '_', '_']];
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
    _grid[row][column] = currentPlayer.getMark();
    GameBoard.update(GameMain.getGrid());
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
    GameBoard.update(getGrid());
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
GameBoard.update(GameMain.getGrid());

const playerOne = Player('Player 1', 'O');
const playerTwo = Player('Player 2', 'X');

GameMain.newGame(playerOne, playerTwo);

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
