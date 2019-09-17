/* eslint-disable strict */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-destructuring */

// https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript?ref=lnav

// TO-DO:
// - Color Options Window:
// --- Add separate delay to buttons
// - SVG implementation needs rework:
// --- Added #glow filter but can't seem to apply it to custom AI designs


// ISSUES:
// - IMPORTANT! Need to renable clicking for Human vs Human game
// - IMPORTANT! Need side container for mobile view
// - IMPORTANT! DON'T USE INNERHTML TO CREATE SVGS. BAD PRACTICE AND SECURITY RISK.
//      Create the SVGs in run time. This is already being implemented elsewhere.
// - IMPORTANT! CAN'T ADD THE GLOW TO THE SELECTION WINDOW. FIX!
// - Buttons must be turned into real buttons
// - Need to sort out Z-indexes so there is a proper system in place. ATM just increasing the amount
//      significantly as to ensure the element is on top.

// CONSIDERATIONS:
// - There are additional animations to consider for the grid creation animation, incl.
// --- Increasing Stroke
// --- Opacity


'use strict';

const Player = (name, mark, type, level, color, colorIndex) => {
  let _name = name;
  let _mark = mark;
  let _type = type;
  let _level = level;
  let _colorIndex = colorIndex;
  let _colorValue = color;

  const getName = () => _name;
  const setName = (newName) => { _name = newName; };

  const getMark = () => _mark;
  const setMark = (newMark) => { _mark = newMark; };

  const getType = () => _type;
  const setType = (newType) => { _type = newType; };

  const getLevel = () => _level;
  const setLevel = (newlevel) => { _level = newlevel; };

  const getColorIndex = () => _colorIndex;
  const setColorIndex = (newColorIndex) => { _colorIndex = newColorIndex; };

  const getColorValue = () => _colorValue;
  const setColorValue = (newColorValue) => { _colorValue = newColorValue; };

  const getColor = () => [_colorIndex, _colorValue];
  const setColor = (newColorArray) => {
    _colorIndex = newColorArray[0];
    _colorValue = newColorArray[1];
  };

  return Object.freeze({
    getName,
    setName,
    getMark,
    setMark,
    getType,
    setType,
    getLevel,
    setLevel,
    getColorIndex,
    setColorIndex,
    getColorValue,
    setColorValue,
    getColor,
    setColor,
  });
};

const playerOne = Player('Player 1', 'o', 'player', 'easy', 'rgb(247, 21, 247)', 0);
const playerTwo = Player('Player 2', 'x', 'player', 'easy', 'rgb(49, 214, 255)', 1);

console.log(playerTwo.getLevel());

const GameBoard = (() => {
  const _gridElements = document.getElementsByClassName('mark-container');
  let _presetColors = ['rgb(247, 21, 247)', 'rgb(49, 214, 255)', 'rgb(247, 250, 252)', 'rgb(234, 255, 49)', 'rgb(255, 179, 15)', 'rgb(255, 49, 59)', 'rgb(49, 255, 83)', 'rgb(169, 39, 255)'];
  
  const typeControllers = {
    playerOneTypeIndex: 0,
    playerOneTypeTranslate: 0,
    playerTwoTypeIndex: 0,
    playerTwoTypeTranslate: 0,
  };



  const getPresetColors = () => _presetColors;
  const setPresetColors = (newColors) => { _presetColors = newColors; };

  const enableActions = () => {
    const gameBoard = document.getElementById('game-board');
    const btnReset = document.getElementById('btn-reset-game');
    const btnOptions = document.getElementById('btn-option-options');

    gameBoard.classList.remove('disable-events');
    btnReset.classList.remove('disable-events');
  
    // Disable game board
    // - Disable reset
    
    //--
    // Allow Colour change
  };

  const disableActions = () => {
    const gameBoard = document.getElementById('game-board');
    const btnReset = document.getElementById('btn-reset-game');
    const btnOptions = document.getElementById('btn-option-options');

    gameBoard.classList.add('disable-events');
    btnReset.classList.add('disable-events');
  };

  const animateGridLines = () => {
    const gameGrid = document.getElementById('svg-game-grid').getElementsByTagName('line');
    for (let i = 0; i < gameGrid.length; i += 1) {
      gameGrid[i].classList.toggle('grid-line-draw');
    }
  };

  const animateGridStroke = (player) => {
    console.log('animate Grid Stroke');
    const gameGrid = document.getElementById('svg-game-grid').getElementsByTagName('line');
    console.log(gameGrid);
    let strokeColor;
    console.log(player);
    console.log(GameMain.getPlayerIndex(player));
    if (GameMain.getPlayerIndex(player) === 0) {
      strokeColor = 'player-one';
    } else if (GameMain.getPlayerIndex(player) === 1) {
      strokeColor = 'player-two';
    } 
    for (let i = 0; i < gameGrid.length; i += 1) {
      gameGrid[i].classList.add('gridline-transition-stroke-delay');
      gameGrid[i].classList.add(strokeColor);
      setTimeout(() => {
        gameGrid[i].classList.remove(strokeColor);
        setTimeout(() => {
          gameGrid[i].classList.remove('gridline-transition-stroke-delay');
        }, 10);
      }, 750);
    }

  };

  const animateGameOver = (showFlag) => {
    const staticText = document.getElementById('svg-winner-static');
    const playerText = document.getElementById('svg-winner-player');

    if (showFlag) {
      const svgContainer = document.getElementById('game-over-player-mark');
      const newSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

      svgContainer.innerHTML = '';

      newSvg.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
      newSvg.setAttribute('viewbox', '0 0 90 90');
      newSvg.id = 'svg-game-over-mark';

      if (GameMain.getPlayerIndex(GameMain.getCurrentPlayer()) === 0) {
        newSvg.classList.add('player-one');
        newSvg.classList.remove('player-two');
        playerText.classList.add('player-one-fill');
        playerText.classList.remove('player-two-fill');

        // Create new Circle
        const newCircle1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        newCircle1.classList.add('mark-nought');
        newCircle1.setAttribute('cx', '50%');
        newCircle1.setAttribute('cy', '50%');
        newCircle1.setAttribute('r', '30');
        newCircle1.setAttribute('opacity', '0.4');
        newCircle1.setAttribute('filter', 'url(#glow)');

        const newCircle2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        newCircle2.classList.add('mark-nought');
        newCircle2.setAttribute('cx', '50%');
        newCircle2.setAttribute('cy', '50%');
        newCircle2.setAttribute('r', '30');
        newCircle2.setAttribute('filter', 'url(#glow)');

        const newCircle3 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        newCircle3.classList.add('mark-nought');
        newCircle3.setAttribute('cx', '50%');
        newCircle3.setAttribute('cy', '50%');
        newCircle3.setAttribute('r', '30');

        newSvg.appendChild(newCircle1);
        newSvg.appendChild(newCircle2);
        newSvg.appendChild(newCircle3);
      } else if (GameMain.getPlayerIndex(GameMain.getCurrentPlayer()) === 1) {
        newSvg.classList.remove('player-one');
        newSvg.classList.add('player-two');
        playerText.classList.remove('player-one-fill');
        playerText.classList.add('player-two-fill');

        // Create new Cross

        const newLeftLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLeftLine1.classList.add('mark-cross');
        newLeftLine1.setAttribute('x1', '30%');
        newLeftLine1.setAttribute('y1', '30%');
        newLeftLine1.setAttribute('x2', '70%');
        newLeftLine1.setAttribute('y2', '70%');
        newLeftLine1.setAttribute('opacity', '0.4');
        newLeftLine1.setAttribute('filter', 'url(#glow)');

        const newRightLine1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newRightLine1.classList.add('mark-cross');
        newRightLine1.setAttribute('x1', '70%');
        newRightLine1.setAttribute('y1', '30%');
        newRightLine1.setAttribute('x2', '30%');
        newRightLine1.setAttribute('y2', '70%');
        newRightLine1.setAttribute('opacity', '0.4');
        newRightLine1.setAttribute('filter', 'url(#glow)');

        const newLeftLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLeftLine2.classList.add('mark-cross');
        newLeftLine2.setAttribute('x1', '30%');
        newLeftLine2.setAttribute('y1', '30%');
        newLeftLine2.setAttribute('x2', '70%');
        newLeftLine2.setAttribute('y2', '70%');
        newLeftLine2.setAttribute('filter', 'url(#glow)');

        const newRightLine2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newRightLine2.classList.add('mark-cross');
        newRightLine2.setAttribute('x1', '70%');
        newRightLine2.setAttribute('y1', '30%');
        newRightLine2.setAttribute('x2', '30%');
        newRightLine2.setAttribute('y2', '70%');
        newRightLine2.setAttribute('filter', 'url(#glow)');

        const newLeftLine3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newLeftLine3.classList.add('mark-cross');
        newLeftLine3.setAttribute('x1', '30%');
        newLeftLine3.setAttribute('y1', '30%');
        newLeftLine3.setAttribute('x2', '70%');
        newLeftLine3.setAttribute('y2', '70%');

        const newRightLine3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        newRightLine3.classList.add('mark-cross');
        newRightLine3.setAttribute('x1', '70%');
        newRightLine3.setAttribute('y1', '30%');
        newRightLine3.setAttribute('x2', '30%');
        newRightLine3.setAttribute('y2', '70%');
        newSvg.appendChild(newLeftLine1);
        newSvg.appendChild(newRightLine1);
        newSvg.appendChild(newLeftLine2);
        newSvg.appendChild(newRightLine2);
        newSvg.appendChild(newLeftLine3);
        newSvg.appendChild(newRightLine3);
      }

      // -------- END DYNAMIC ALLOCATIONS

      newSvg.classList.add('game-over-mark');
      svgContainer.appendChild(newSvg);

      // MARK PLAYED
      setTimeout(() => {
        newSvg.classList.add('animate-game-over-mark');
      }, 300);

      // "WINNER" STATIC TEXT
      staticText.classList.add('animate-game-over-static');
      // PLAYER DYNAMIC TEXT
      const currentPlayer = GameMain.getCurrentPlayer();
      const playerTextSVGText = playerText.getElementsByTagName('text');
      for (let i = 0; i < playerTextSVGText.length; i += 1) {
        playerTextSVGText[i].textContent = currentPlayer.getName();
      }
      playerText.classList.add('animate-game-over-winner');
    } else {
      const mark = document.getElementById('svg-game-over-mark');
      if (mark) {
        mark.classList.remove('animate-game-over-mark');
        staticText.classList.remove('animate-game-over-static');
        playerText.classList.remove('animate-game-over-winner');
      }
    }
  };

  const resetMarks = () => {
    const marksVisible = document.getElementsByClassName('game-mark');
    console.log(marksVisible.length);
    for (let i = 0; i < marksVisible.length; i += 1) {
      marksVisible[i].classList.add('hide');
      console.log(marksVisible[i].classList);
    }
  }
  const setWinnerElement = (player) => {
    // Create correct Mark SVG (O or X)
    // Set correct text to text SVG
    // Set correct color to text, but not to static "Winner"
  };

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
    const gameSelection = document.getElementById('player-selection-window');
    const delayBetweenStates = 500;
    if (displayState.toLowerCase() === 'gameboard') {
      toggleDisplayState(gameSelection, false);
      toggleDisplayState(gameOver, false);
      setTimeout(() => { animateGridLines(); }, delayBetweenStates);
      setTimeout(() => { toggleDisplayState(gameBoard, true); }, 600);
      toggleDisplayState(gameSelection, false);
      deleteWinLine();
      animateGameOver(false);
      setTimeout(() => { enableActions(); console.log('GO!'); }, 850);
    } if (displayState.toLowerCase() === 'gameover') {
      animateGridLines();
      toggleDisplayState(gameBoard, false);
      setTimeout(() => { toggleDisplayState(gameOver, true); }, 800);
      setTimeout(() => { animateGameOver(true); }, 1000);
    } if (displayState.toLowerCase() === 'playerselection') {
      disableActions();
      toggleDisplayState(gameSelection, true);
      toggleDisplayState(gameBoard, false);
      toggleDisplayState(gameOver, false);
    }
  };

  const allocatePlayerType = (player) => {
    let controlIndex;
    if(GameMain.getPlayerIndex(player) === 0) {
      controlIndex = typeControllers.playerOneTypeIndex;
    } else if (GameMain.getPlayerIndex(player) === 1) {
      controlIndex = typeControllers.playerTwoTypeIndex;
    }

    console.log('allocatePlayerType: Control index: ' + controlIndex);

    if (controlIndex === 0) {
      player.setType('player');
    } else if (controlIndex === 1) {
      player.setType('computer');
      player.setLevel('easy');
    } if (controlIndex === 2) {
      player.setType('computer');
      player.setLevel('hard');
    }
  };

  /* Color Options Window */
  const openOptionsWindow = () => {
    const optionsWindow = document.getElementById('options-colors-window');
    toggleDisplayState(optionsWindow, true);
  };

  const closeOptionsWindow = () => {
    const optionsWindow = document.getElementById('options-colors-window');
    toggleDisplayState(optionsWindow, false);
  };
  
  const changePlayerType = (player, direction) => {
    let imageRow;
    const imageSize = 79;
    const players = GameMain.getPlayers();
    const playerIndex = players.indexOf(player);
    const maxOptions = 3;
    let currentIndex;
    let calcTranslate;

    if (playerIndex === 0) {
      imageRow = document.getElementById('player-type-change-player-one');
      currentIndex = typeControllers.playerOneTypeIndex;
      calcTranslate = typeControllers.playerOneTypeTranslate;
    } else if (playerIndex === 1) {
      imageRow = document.getElementById('player-type-change-player-two');
      currentIndex = typeControllers.playerTwoTypeIndex;
      calcTranslate = typeControllers.playerTwoTypeTranslate;
    }

    if (direction === 'left') {
      if (currentIndex > 0) {
        currentIndex -= 1;
        calcTranslate += imageSize;
        imageRow.style.transform = `translateX(${calcTranslate}px)`;

      }
    } else if (direction === 'right') {
      if (currentIndex < maxOptions - 1) {
        currentIndex += 1;
        calcTranslate -= imageSize;
        imageRow.style.transform = `translateX(${calcTranslate}px)`;
      }
    }

    if (playerIndex === 0) {
      typeControllers.playerOneTypeTranslate = calcTranslate;
      typeControllers.playerOneTypeIndex = currentIndex;
    } else if (playerIndex === 1) {
      typeControllers.playerTwoTypeTranslate = calcTranslate;
      typeControllers.playerTwoTypeIndex = currentIndex;
    }
    allocatePlayerType(player, currentIndex);
  };

  const changePlayerColor = (currentColorIndex) => {
    const colorPresets = getPresetColors();
    playerOne.setColor([currentColorIndex, colorPresets[currentColorIndex]]);
    document.documentElement.style.setProperty('--player-one', colorPresets[currentColorIndex]);
  };

  const slidePlayerColor = (player, direction) => {
    let colorDisplay;
    const colorPresets = getPresetColors();
    const players = GameMain.getPlayers();
    const playerIndex = players.indexOf(player);
    let currentColorIndex = player.getColorIndex();

    if (direction === 'left') {
      if (currentColorIndex > 0) {
        currentColorIndex -= 1;
      } else {
        currentColorIndex = colorPresets.length - 1;
      }
    } else if (direction === 'right') {
      if (currentColorIndex < colorPresets.length - 1) {
        currentColorIndex += 1;
      } else {
        currentColorIndex = 0;
      }
    }
    if (playerIndex === 0) {
      colorDisplay = document.getElementById('color-display-player-one');
    } else if (playerIndex === 1) {
      colorDisplay = document.getElementById('color-display-player-two');
    }
    colorDisplay.style.fill = colorPresets[currentColorIndex];
    player.setColor([currentColorIndex, colorPresets[currentColorIndex]]);
    if (playerIndex === 0) {
      document.documentElement.style.setProperty('--player-one', colorPresets[currentColorIndex]);
    } else if (playerIndex === 1) {
      document.documentElement.style.setProperty('--player-two', colorPresets[currentColorIndex]);
    }
  };

  const allocateArrowControls = (index, player) => {
    const players = GameMain.getPlayers();
    if (index === 0) {
      changePlayerType(players[0], 'left');
    } else if (index === 1) {
      changePlayerType(players[0], 'right');
    } else if (index === 2) {
      slidePlayerColor(players[0], 'left');
    } else if (index === 3) {
      slidePlayerColor(players[0], 'right');
    } else if (index === 4) {
      changePlayerType(players[1], 'left');
    } else if (index === 5) {
      changePlayerType(players[1], 'right');
    } else if (index === 6) {
      slidePlayerColor(players[1], 'left');
    } else if (index === 7) {
      slidePlayerColor(players[1], 'right');
    }

    // switch (index) {
    //   case 0:
    //     console.log('0');
    //     break;
    //   default:
    //     break;
    // }
  };

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

  // ---------------------
  //
  // PASS PLAYER OR THE WINNER
  const drawWinLine = (playerIndex, winPosition) => {
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
    if (playerIndex === 0) {
      newLine.classList.add('player-one');
      newLine.classList.remove('player-two');
    } else if (playerIndex === 1) {
      newLine.classList.remove('player-one');
      newLine.classList.add('player-two');
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
    animateGridStroke(GameMain.getCurrentPlayer());
  };

  // Change Gameboard text and text colour for current player
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

  const displayDraw = () => {
    const displayElement = document.getElementById('display-current-player');
    const displayText = displayElement.getElementsByTagName('text');
    const players = GameMain.getPlayers();
    for (let i = 0; i < displayText.length; i += 1) {
      displayText[i].textContent = 'DRAW';
    }
    setTimeout(() => {
      displayPlayer(players[0]);
    }, 3000);

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
      // Ryan Ford suggestion:
      // Use objects instead of string
      const markClasses = { o: 'naught-show', x: 'cross-show' };
      currentPositionClass = markClasses[marks[i].toLowerCase()] || '';

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

      // IMPORTANT! GENERATE THE DIVS, DON'T USE INNERHTML YOU GOOP
      currentContainer = _gridElements[i];
      if (marks[i].toLowerCase() === 'o') {
        currentContainer.innerHTML = `<svg class="game-mark disable-events ${noughtClass}" height="100" width="100" viewBox="0 0 100 100"><g><defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4 4" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="glow"/></feMerge></filter></defs><circle style="filter: url(#glow); opacity: 0.75;" class="nought ${currentPositionClass}" cx="50" cy="50" r="30"/><circle class="nought ${currentPositionClass}" cx="50" cy="50" r="30"/></g></svg>`;
      } else if (marks[i].toLowerCase() === 'x') {
        currentContainer.innerHTML = `<svg class="game-mark disable-events ${crossClass}" height="100" width="100" viewBox="0 0 100 100"><g><defs><filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4 4" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="glow"/><feMergeNode in="glow"/></feMerge></filter></defs><line style="filter: url(#glow); opacity: 0.75;" class="cross ${currentPositionClass}" x1="20" y1="20" x2="80" y2="80"/><line style="filter: url(#glow);" class="cross cross-delay ${currentPositionClass}" x1="80" y1="20" x2="20" y2="80"/><line class="cross ${currentPositionClass}" x1="20" y1="20" x2="80" y2="80"  /><line class="cross cross-delay ${currentPositionClass}" x1="80" y1="20" x2="20" y2="80" /></g></svg>`;
      } else {
        currentContainer.innerHTML = '';
      }
    }

    if (positionPlayed !== -1) {
      if (marks[positionPlayed].toLowerCase() === 'o') {
        const noughtCircles = _gridElements[positionPlayed].getElementsByTagName('circle');
        setTimeout(() => {
          for (let i = 0; i < noughtCircles.length; i += 1) {
            noughtCircles[i].classList.toggle('nought-show');
          }
        }, 100);
      } else if (marks[positionPlayed].toLowerCase() === 'x') {
        const crossLines = _gridElements[positionPlayed].getElementsByTagName('line');
        setTimeout(() => {
          for (let i = 0; i < crossLines.length; i += 1) {
            crossLines[i].classList.toggle('cross-show');
          }
        }, 100);
      }
    }
  };

  const gameElementClicked = (e) => {
    const positionPlayed = e.target.getAttribute('data-value');
    const grid = GameMain.getGrid().flat();
    if (grid[positionPlayed] === '') {
      GameMain.playTurn(positionPlayed);
      GameBoard.disableActions();
    }
  };

  const initColors = () => {
    const colorDisplayPlayerOne = document.getElementById('color-display-player-one');
    const colorDisplayPlayerTwo = document.getElementById('color-display-player-two');
    const players = GameMain.getPlayers();
    colorDisplayPlayerOne.style.fill = players[0].getColorValue();
    colorDisplayPlayerTwo.style.fill = players[1].getColorValue();
  };

  const initGrid = () => {
    for (let i = 0; i < _gridElements.length; i += 1) {
      _gridElements[i].addEventListener('click', gameElementClicked);
    }
    GameBoard.initColors();
    GameBoard.allocateDisplayState('playerselection');
  };

  return {
    update: updateGameBoard,
    init: initGrid,
    enableActions,
    disableActions,
    toggleTest,
    toggleTest2,
    displayPlayer,
    displayDraw,
    closeGameOverWindow,
    allocateDisplayState,
    drawWinLine,
    allocateArrowControls,
    initColors,
    getPresetColors,
    setPresetColors,
    openOptionsWindow,
    closeOptionsWindow,
    changePlayerColor,
    resetMarks,
    animateGridStroke,
    allocatePlayerType,
  };
})();

// Minimax basis credited to: Ahmad Abdolsaheb
// https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/
// https://github.com/ahmadabdolsaheb/minimaxarticle
const ComputerAI = (() => {
  const otherPlayer = playerOne.getMark();
  const computerPlayer = playerTwo.getMark();

  const generateRandNum = (low, high) => Math.floor((Math.random() * high) + low);

  const fillGrid = (grid) => {
    const newGridArray = grid.slice(0);
    for (let i = 0; i < newGridArray.length; i += 1) {
      if (newGridArray[i] !== 'x' && newGridArray[i] !== 'o') {
        newGridArray[i] = i;
      }
    }
    return newGridArray;
  };

  const getPositionsAvailable = (grid) => grid.filter((item) => item !== 'o' && item !== 'x');

  function winCheckMinimax(board, player) {
    if ((board[0] === player && board[1] === player && board[2] === player)
      || (board[3] === player && board[4] === player && board[5] === player)
      || (board[6] === player && board[7] === player && board[8] === player)
      || (board[0] === player && board[3] === player && board[6] === player)
      || (board[1] === player && board[4] === player && board[7] === player)
      || (board[2] === player && board[5] === player && board[8] === player)
      || (board[0] === player && board[4] === player && board[8] === player)
      || (board[2] === player && board[4] === player && board[6] === player)) {
      return true;
    }
    return false;
  }

  function minimax(board, player) {
    const newGrid = board;
    const availSpots = getPositionsAvailable(newGrid);

    if (winCheckMinimax(newGrid, otherPlayer)) {
      return { score: -10 };
    }
    if (winCheckMinimax(newGrid, computerPlayer)) {
      return { score: 10 };
    }
    if (availSpots.length === 0) {
      return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < availSpots.length; i += 1) {
      const move = {};
      move.index = newGrid[availSpots[i]];
      newGrid[availSpots[i]] = player;
      if (player === computerPlayer) {
        const result = minimax(newGrid, otherPlayer);
        move.score = result.score;
      } else {
        const result = minimax(newGrid, computerPlayer);
        move.score = result.score;
      }
      newGrid[availSpots[i]] = move.index;
      moves.push(move);
    }

    let bestMove;
    let bestScore;
    if (player === computerPlayer) {
      bestScore = -10000;
      for (let i = 0; i < moves.length; i += 1) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      bestScore = 10000;
      for (let i = 0; i < moves.length; i += 1) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  const computePosition = (grid, player) => {
    // Pass next player
    const gridFilled = fillGrid(grid.flat());
    const currentPlayer = player;
    const players = GameMain.getPlayers();

    if (currentPlayer.getLevel() === 'easy') {
      const positionsAvailable = [];
      const gridFlattened = grid.flat();
      console.log(gridFlattened);
      for (let i = 0; i < gridFlattened.length; i += 1) {
        if (gridFlattened[i] === '') {
          positionsAvailable.push(i);
        }
      }
      const randNum = generateRandNum(0, positionsAvailable.length - 1);
      const positionChosen = positionsAvailable[randNum];
      return positionChosen;

    } else if (currentPlayer.getLevel() === 'hard') {
      const bestSpot = minimax(gridFilled, computerPlayer);
      return bestSpot.index;
    }
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

  const getCurrentPlayer = () => {
    const players = getPlayers();
    let playerIndex = ((getCurrentTurn() - 1) % players.length);
    if (playerIndex < 0) {
      playerIndex = 0;
    }
    return players[playerIndex];
  };

  const getPlayerIndex = (player) => {
    const players = getPlayers();
    return players.indexOf(player);
  };

  const configPlayers = (playerOneTemp, playerTwoTemp) => {
    GameBoard.allocatePlayerType(playerOneTemp);
    GameBoard.allocatePlayerType(playerTwoTemp);
    newGame(playerOne, playerTwo);
  };

  const newGame = (...players) => {
    const newPlayers = [];
    for (let i = 0; i < players.length; i += 1) {
      newPlayers.push(players[i]);
    }
    setPlayers(newPlayers);
  };

  const drawMark = (positionPlayed, currentPlayer) => {
    console.log({ positionPlayed });
    const row = parseInt(positionPlayed / 3, 10);
    const column = positionPlayed % 3;
    _grid[row][column] = currentPlayer.getMark();
    GameBoard.update(GameMain.getGrid(), positionPlayed);
    GameBoard.animateGridStroke(currentPlayer);
  };

  // MIN MAX WIN CONDITION CHECKER
  const winning = (grid, playerMark) => {
    // COLUMNS
    for (let i = 0; i < grid.length; i += 1) {
      if (grid[0][i] === playerMark && grid[1][i] === playerMark && grid[2][i] === playerMark) {
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
      if (grid[i][0] === playerMark && grid[i][1] === playerMark && grid[i][2] === playerMark) {
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
    if (grid[0][0] === playerMark && grid[1][1] === playerMark && grid[2][2] === playerMark) {
      setWinPosition('diagonalleft');
      return true;
    }
    // DIAGONAL - RIGHT TO LEFT
    if (grid[0][2] === playerMark && grid[1][1] === playerMark && grid[2][0] === playerMark) {
      setWinPosition('diagonalright');
      return true;
    }
    return false;
  };

  // OLD WIN CONDITION CHECK
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

  const gameEnd = () => {
    GameBoard.allocateDisplayState('gameover', true);
  };

  const newTurn = () => {
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
      // Change current player display to state "DRAW"
      // Animate the marks disappearing
      console.log('DRAW STATE');
      GameBoard.displayDraw();
      setTimeout(() => {
        GameMain.resetGameAndMarks();
      }, 3000);
    } else {
      console.log(`Current round is: ${(getCurrentTurn() + 1)}`);
      drawMark(positionPlayed, currentPlayer);

      if (checkWinConditions(currentPlayer)) {
        setGameOver(true);
        // Draw win line
        setTimeout(() => {
          GameBoard.drawWinLine(getPlayerIndex(currentPlayer), getWinPosition());
        }, 1000);
        setTimeout(() => {
          gameEnd(currentPlayer);
        }, 3000);
      }

      newTurn(currentPlayer);
      // Can't wait for the Computer to click an element
      // and must force the next turn with the computer's choice.
      if (nextPlayer.getType().toLowerCase() === 'computer' && !isGameOver()) {
        console.log('Disable Actions');

        setTimeout(() => {
          console.log('NEW TURN ------');
          console.log(currentPlayer.getName());
          playTurn(ComputerAI.computePosition(getGrid(), nextPlayer));
        }, 1500);
      }
      if (currentPlayer.getType().toLowerCase() === 'computer' && !isGameOver()) {
        setTimeout(() => {
          GameBoard.displayPlayer(nextPlayer);
          GameBoard.enableActions();
        }, 1500);
      }
      if (nextPlayer.getType() === 'player') {
        console.log('Enable Actions');
        // GameBoard.enableActions();
      }
    }
  };

  const resetGame = () => {
    setGrid([['', '', ''], ['', '', ''], ['', '', '']]);
    GameBoard.update(getGrid(), -1);
    resetTurns();
    setGameOver(false);
  };

  const resetGameAndMarks = () => {
    GameBoard.resetMarks();
    setTimeout(() => {
      resetGame();
    }, 2000);
  };

  return {
    configPlayers,
    newGame,
    getGrid,
    drawMark,
    playTurn,
    resetGame,
    resetGameAndMarks,
    getPlayers,
    getCurrentPlayer,
    getPlayerIndex,
    winning,
  };
})();

GameMain.newGame(playerOne, playerTwo);
GameBoard.init();
GameBoard.update(GameMain.getGrid(), -1);


/* IMPORTANT: MOVE EVENT LISTENERS TO FUNCTIONS */

// Color Options on Game Board
const colorOptionsBtnsContainer = document.getElementById('options-colors');
const colorOptionsBtns = colorOptionsBtnsContainer.getElementsByTagName('button');
const tempColors = GameBoard.getPresetColors();
for (let i = 0; i < colorOptionsBtns.length; i += 1) {
  colorOptionsBtns[i].style.background = tempColors[i];
  colorOptionsBtns[i].addEventListener('click', () => {
    GameBoard.changePlayerColor(i);
  });
}

// Arrows on Selection screen
const selectionArrows = document.getElementsByClassName('selection-arrow');
for (let i = 0; i < selectionArrows.length; i += 1) {
  selectionArrows[i].addEventListener('click', () => {
    GameBoard.allocateArrowControls(i);
  });
}

// Selection Screen
document.getElementById('btn-start-game').addEventListener('click', () => {
  GameMain.configPlayers(playerOne, playerTwo);
  GameBoard.allocateDisplayState('gameboard');
});

// Gameboard Screen
document.getElementById('btn-test-2').addEventListener('click', () => { GameBoard.toggleTest2(); });
document.getElementById('btn-reset-game').addEventListener('click', () => { GameMain.resetGameAndMarks(); });

document.getElementById('btn-open-options').addEventListener('click', () => { GameBoard.openOptionsWindow(); });
document.getElementById('btn-close-options').addEventListener('click', () => { GameBoard.closeOptionsWindow(); });

// Game Over Screen
document.getElementById('btn-game-over-close').addEventListener('click', () => { GameBoard.closeGameOverWindow(); });
/* ----------------- */

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
