import Mobile from './Mobile.js';

// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/paddle.png';//paddle
const SHIFT_X = 0;//sans mouvement horizontal
const SHIFT_Y = 8;

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
    move(){
      if(this.getDown()){
        this.y = Math.min(this.y + this.shiftY, this.theGame.canvas.height - this.img.height);
      }

      if(this.getUp()){
        this.y = Math.max(this.y - this.shiftY, 0);
      }
    }

    /**
   * return true if the shoot is inside the saucer false if not
   * @param {*} otherX the other X position to be compared to this x position
   * @param {*} otherY the other Y position to be compared this y position
   * @returns
   */
  inSide(otherX, otherY){
    return (otherX >= this.x && otherX <=(this.x+this.img.width) && otherY >= this.y && otherY <= (this.y+this.img.height));
  }

}
