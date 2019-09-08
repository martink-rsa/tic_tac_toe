/* eslint-disable no-console */
console.clear();
// https://www.theodinproject.com/courses/javascript/lessons/tic-tac-toe-javascript?ref=lnav

// 1. Create HCJ backbone

// 2: Store gameboard as array inside of Gameboard object.
// 2.1 Players going to be stored in objects
// 2.2 Object to control the flow of the game
// 2 Summary: No global code or little as possible.
//      One instance:       Use module
//      Multiple instances: Use factories

// 3. JS Function: Render contents of gameboard array
//      to the webpage.


const gridElements = document.getElementsByClassName('mark-container');

const GameBoard = (() => {

  const generateGameBoard = () => 'Board generated';

  const updateGameBoard = (grid) => {
    for (let i = 0; i < gridElements.length; i += 1) {
      gridElements[i].textContent = grid[i];
    }
  };

  return {
    generateGameBoard,
    updateGameBoard,
  };
})();

const GameMain = (() => {
  let markGrid = ['', '', '', '', '', '', '_', '_', '_'];

  const getGrid = () => markGrid;

  const playMark = (positionPlayed) => {
    markGrid[positionPlayed] = Player.getMark();
    GameBoard.updateGameBoard(GameMain.getGrid());
  };

  const turnPlayed = (event) => {
    playMark(event.target.getAttribute('data-value'));
  };

  return {
    turnPlayed,
    getGrid,
  }
})();

for (let i = 0; i < gridElements.length; i += 1) {
  gridElements[i].addEventListener('click', GameMain.turnPlayed);
}

const Player = (() => {
  let name = 'Player 1';
  let mark = '0';

  const getName = () => name;
  const setName = (newName) => { name = newName; };

  const getMark = () => mark;
  const setMark = (newMark) => { mark = newMark; };

  return {
    getName,
    setName,
    getMark,
    setMark,
  }
})();

console.log(Player.getName());

GameBoard.updateGameBoard(GameMain.getGrid());


/* TEST UNITS */
// Check if test unit is working
function testOutput(input) {
  return input;
}

module.exports = {
  testOutput,
};
