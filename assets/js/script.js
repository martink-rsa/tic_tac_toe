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
// - Buttons must be turned into real buttons
// - Need to sort out Z-indexes so there is a proper system in place. ATM just increasing the amount
//      significantly as to ensure the element is on top.
// - Need to make inline SVGs:
// --- 1. Arrow
// --- 1. Humanoid and IBMi portrait

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

  let _presetColors = ['rgb(247, 21, 247', 'rgb(49, 214, 255)', 'black', 'green', 'yellow', 'orange', 'purple'];

  const getPresetColors = () => _presetColors;
  const setPresetColors = (newColors) => { _presetColors = newColors; };

  const animateGridLines = () => {
    const gameGrid = document.getElementById('svg-game-grid').getElementsByTagName('line');
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
      deleteWinLine();
      animateGameOver(false);
      
    } if (displayState.toLowerCase() === 'gameover') {
      animateGridLines();
      toggleDisplayState(gameBoard, false);
      setTimeout(() => { toggleDisplayState(gameOver, true); }, 800);
      setTimeout(() => { animateGameOver(true); }, 1000);
    }
  };

  const changePlayerType = (direction) => {
    console.log('changePlayerType trigger');
    const imageRow = document.getElementById('player-type-change-player-one');
    if (direction === 'left') {
      imageRow.classList.toggle('type-move-left');
    } else if (direction === 'right') {
      imageRow.classList.toggle('type-move-left');
    }
  };

  const changePlayerColor = (direction) => {
    if (direction === 'left') {
      console.log('Player color change <<<<');
    } else if (direction === 'right') {
      console.log('Player color change >>>>');
    }

  };

  const allocateArrowControls = (index) => {
    if (index === 0) {
    // Current test: Slide images behind mask
      changePlayerType('left');
    } else if (index === 1) {
      changePlayerType('right');
    } else if (index === 2) {
      changePlayerColor('left');
    } else if (index === 3) {
      changePlayerColor('right');
    }
  };

  // Button press (MUST RENAME, TERRIBLE NAME)
  const closeGameOverWindow = () => {
    allocateDisplayState('gameboard');
    GameMain.resetGame();
  };

  function setWinLinePositions(line, x1, y1, x2, y2) {
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
  }

  const drawWinLine = (winPosition) => {
    const row1 = '15%';
    const row2 = '50%';
    const row3 = '85%';

    const column1 = '15%';
    const column2 = '50%';
    const column3 = '85%';
    // Main container
    const winLineContainer = document.getElementById('win-line-main');

    // Create SVG container
    const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newSvg.id = 'svg-win-line';
    newSvg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    newSvg.setAttribute('height', '100%');
    newSvg.setAttribute('width', '100%');

    // Create new Line
    const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    // Decide where to draw the line
    switch (winPosition) {
      case 'rowtop':
        setWinLinePositions(newLine, column1, row1, column3, row1);
        break;
      case 'rowmiddle':
        setWinLinePositions(newLine, column1, row2, column3, row2);
        break;
      case 'rowbottom':
        setWinLinePositions(newLine, column1, row3, column3, row3);
        break;
      case 'columnleft':
        setWinLinePositions(newLine, column1, row1, column1, row3);
        break;
      case 'columnmiddle':
        setWinLinePositions(newLine, column2, row1, column2, row3);
        break;
      case 'columnright':
        setWinLinePositions(newLine, column3, row1, column3, row3);
        break;
      case 'diagonalleft':
        setWinLinePositions(newLine, column1, row1, column3, row3);
        break;
      case 'diagonalright':
        setWinLinePositions(newLine, column3, row1, column1, row3);
        break;
      default:
        break;
    }

    newLine.classList.toggle('win-line-style');
    setTimeout(() => { newLine.classList.toggle('animate-win-line'); }, 500);
    newLine.id = 'win-line';
    // Append line to SVG container
    newSvg.appendChild(newLine);
    // Append SVG container to main container
    winLineContainer.appendChild(newSvg);
  };

  const deleteWinLine = (winPosition) => {
    const winLineContainer = document.getElementById('win-line-main');
    winLineContainer.textContent = '';
  };

  const toggleTest = () => {
    // Quick test function

  };

  const toggleTest2 = () => {
    const winLine = document.getElementById('win-line');
    winLine.classList.toggle('animate-win-line');
  };

  const setSelectionColors = () => {
    const colorElement = document.getElementsByClassName('player-selection-color-item');
    const colorArray = getPresetColors();

    for (let i = 0; i < colorElement.length; i += 1) {
      colorElement[i].style.background = colorArray[i];
    }
  };

  const setPlayerColor = (player, index) => {
    const colorArray = getPresetColors();
    player.setColor(colorArray[index]);
    document.documentElement.style.setProperty('--player-one', colorArray[index]);
  };

  const displayPlayer = (player) => {
    const displayElement = document.getElementById('display-current-player');
    const displaySVG = displayElement.getElementsByTagName('svg');
    const displayText = displayElement.getElementsByTagName('text');
    const playerIndex = GameMain.getPlayers().indexOf(player);
    if (playerIndex === 0) {
      displaySVG[0].classList.add('player-one-fill');
      displaySVG[0].classList.remove('player-two-fill');
    } else if (playerIndex === 1) {
      displaySVG[0].classList.remove('player-one-fill');
      displaySVG[0].classList.add('player-two-fill');
    }
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
    const grid = GameMain.getGrid().flat();
    if (grid[positionPlayed] === '') {
      GameMain.playTurn(positionPlayed);
    }
  };

  const initGrid = () => {
    GameBoard.setSelectionColors();

    for (let i = 0; i < _gridElements.length; i += 1) {
      _gridElements[i].addEventListener('click', gameElementClicked);
    }
  };

  return {
    update: updateGameBoard,
    init: initGrid,
    toggleTest,
    toggleTest2,
    displayPlayer,
    closeGameOverWindow,
    allocateDisplayState,
    drawWinLine,
    setPlayerColor,
    setSelectionColors,
    allocateArrowControls,
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
  let _winPosition = '';

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

  const getWinPosition = () => _winPosition;
  const setWinPosition = (position) => {
    _winPosition = position;
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
        if (i === 0) {
          setWinPosition('columnleft');
        } else if (i === 1) {
          setWinPosition('columnmiddle');
        } else if (i === 2) {
          setWinPosition('columnright');
        }
        return true;
      }
    }
    // ROWS
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[i][0] === mark && grid[i][1] === mark && grid[i][2] === mark) {
        if (i === 0) {
          setWinPosition('rowtop');
        } else if (i === 1) {
          setWinPosition('rowmiddle');
        } else if (i === 2) {
          setWinPosition('rowbottom');
        }
        return true;
      }
    }
    // DIAGONAL - LEFT TO RIGHT
    if (grid[0][0] === mark && grid[1][1] === mark && grid[2][2] === mark) {
      setWinPosition('diagonalleft');
      return true;
    }
    // DIAGONAL - RIGHT TO LEFT
    if (grid[0][2] === mark && grid[1][1] === mark && grid[2][0] === mark) {
      setWinPosition('diagonalright');
      return true;
    }
    return false;
  };

  const gameEnd = (winner) => {
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

    GameBoard.displayPlayer(currentPlayer);
    // Last round: End of game
    if (getCurrentTurn() === getGrid().flat().length) {
      console.log('GAME END');
    } else {
      console.log('Current round is: ' + (getCurrentTurn() + 1))
      drawMark(positionPlayed, currentPlayer);

      if (checkWinConditions(currentPlayer)) {
        setGameOver(true);
        setTimeout(() => {
          GameBoard.drawWinLine(getWinPosition());
        }, 1000);
        /*
        setTimeout(() => {
          gameEnd(currentPlayer);
        }, 4000);
        */
      }

      newTurn(currentPlayer);
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

/* IMPORTANT: DELETE THIS OLD ASS COLOR SYSTEM */
// Create Color Buttons EventListeners
const colorButtons = document.getElementsByClassName('player-selection-color-item');
for (let i = 0; i < colorButtons.length; i += 1) {
  colorButtons[i].addEventListener('click', (target) => {
    GameBoard.setPlayerColor(playerOne, colorButtons[i].getAttribute('data-color'));
  });
}

// The portrait slides two images using a class toggle
// TO KNOW IF IMAGE HAS MOVED: Check if sliding class exists
// The colour arrows will simply background fade colours? Might look terrible.
const selectionArrows = document.getElementsByClassName('selection-arrow');
for (let i = 0; i < selectionArrows.length; i += 1) {
  selectionArrows[i].addEventListener('click', () => {
    GameBoard.allocateArrowControls(i);
  });
}


GameBoard.init();
GameBoard.update(GameMain.getGrid(), -1);
GameMain.newGame(playerOne, playerTwo);

document.getElementById('btn-start-game').addEventListener('click', GameBoard.toggleTest);
document.getElementById('btn-play-game').addEventListener('click', () => { GameBoard.setPlayerColor(playerOne, 'rgb(255,242,104)'); });
document.getElementById('btn-test-2').addEventListener('click', GameBoard.toggleTest2);
document.getElementById('btn-reset-game').addEventListener('click', GameMain.resetGame);
document.getElementById('btn-game-over-close').addEventListener('click', GameBoard.closeGameOverWindow);

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