'use strict';

import Game from './Game.js';

const init = () => {
  const theField = document.getElementById("field");
  // document.getElementById("start").disabled = true; 
  const theGame = new Game(theField);

  window.addEventListener('keydown', theGame.keyDownActionHandler.bind(theGame));
  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
  document.getElementById('start').addEventListener("click", () => startGame(theGame));
}

window.addEventListener("load",init);

// true if game is started
let started = false;
/** start and stop a game
 * @param {Game} theGame - the game to start and stop
 */
const startGame = theGame => {
  if (!started) {
    // theGame.start();
    theGame.connect();
    document.getElementById('start').value = 'disconnect';
  }
  else {
    document.getElementById('start').value = 'reconnect';
    theGame.stop();
  }
  started =! started;
}
