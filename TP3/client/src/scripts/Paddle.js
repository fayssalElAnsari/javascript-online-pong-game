import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/paddle.png';//paddle
const SHIFT_X = 0;//sans mouvement horizontal
const SHIFT_Y = 4;

//creer l'objet Movestate avec les 3 atrributs UP, DOWN et NONE
const MoveState = { UP : 0, DOWN : 1, NONE : 2};

/**
 * a Ball is a mobile with a ball as image and that bounces in a Game (inside the game's canvas)
 */
export default class Paddle extends Mobile {

  /**  build a ball
   * @param  {number} x       the x coordinate
   * @param  {number} y       the y coordinate
   * @param  {Game} theGame   the Game this ball belongs to
   */
  constructor(x, y, theGame) {
    super(x, y, BALL_IMAGE_SRC , SHIFT_X, SHIFT_Y);
    this.theGame = theGame;
    this.moving = MoveState.NONE;

  }

      /**
      * the result true / false depends on the moving state of the starship
      * return true if moving up
      */
       getUp() {
        return (this.moving == MoveState.UP);
    }

    /**
     * the result true / false depends on the moving state of the starship
     * return true if moving down false if not
     */
    getDown() {
      return (this.moving == MoveState.DOWN);
    }

    /**
     * Move up the starship
     */
    moveUp () {
      this.moving = MoveState.UP;
    }

    /**
     * Move down the starShip
     */
    moveDown () {
      this.moving = MoveState.DOWN;
    }
        /* Set the starship moving on None, sot the starship doesn't move */
    stopMoving(){
      this.moving = MoveState.NONE;
    }
    /* Move the starship Down or Up 
    * @param {*} myCanvas
    */
    move(myCanvas){
      if(this.getDown()){
        this.y = Math.min(this.y + this.SHIFT_Y, myCanvas.height - this.img.height);
      }

      if(this.getUp()){
        this.y = Math.max(this.y - this.SHIFT_Y, 0);
      }
    }

  

  /**
   * when moving a ball bounces inside the limit of its game's canvas
   */
//   move() {
//     if (this.y <= 0 || (this.y+this.height >= this.theGame.canvas.height)) {
//       this.shiftY = - this.shiftY;    // rebond en haut ou en bas
//     }
//     else if (this.x <= 0 || this.x + this.width >= this.theGame.canvas.width ) {
//       this.shiftX = - this.shiftX;    // rebond en gauche ou à droite
//     }
//     super.move();
//   }

}
