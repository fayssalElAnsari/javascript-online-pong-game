import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 6;
const SHIFT_Y = 4;

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Ball extends Mobile {

  /**  build a ball
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {  
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
  }


  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
  move() {
    if (this.x <= 0){
      // this.theGame.startGame(this.theGame);
      
      // set the game state to stop
      // when the game stops the button should change and when the user presses
      // the ball is removed and the game restarts again
      // this.theGame.stop();
      // console.log("P2 score :(");
      document.getElementById('score_p2').innerHTML = parseInt(document.getElementById('score_p2').innerHTML) + 1;
      this.theGame.score();
    } else if (this.x >= this.theGame.canvas.width - this.img.width) {
      // console.log("P1 score :(");
      document.getElementById('score_p1').innerHTML = parseInt(document.getElementById('score_p2').innerHTML) + 1;
      this.theGame.score();
      
    } else {
      if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
        this.shiftY = - this.shiftY;    // rebond en haut ou en bas
      }
      else if (this.x <= 0 || this.x + this.width >= this.theGame.canvas.width ) {
        this.shiftX = - this.shiftX;    // rebond en gauche ou à droite
      }
      super.move();
    }
    
    
  }

  calculateNewShiftY(){

  }

  calculateNewShiftX(){
    this.shiftX = -this.shiftX;
  }


  /**
   * returns true if the shoot is in collision with the saucer
   * @param {*} saucer
   * @returns
   */
   collisionWith(paddlew){
    //  console.log("collision ;)");
    return paddlew.inSide(this.x,this.y);
  }

}
