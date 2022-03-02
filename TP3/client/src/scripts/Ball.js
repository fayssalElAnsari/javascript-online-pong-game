import Mobile from './Mobile.js';


// default values for a Ball : image and shifts
const BALL_IMAGE_SRC = './images/balle24.png';
const SHIFT_X = 4;
const SHIFT_Y = 3;

const DEBUG = true;

// let collision = true;


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
    if ((this.x) <= 0 && !this.theGame.paused){
      document.getElementById('score_p2').innerHTML = parseInt(document.getElementById('score_p2').innerHTML) + 1;
      this.theGame.lost = 1;
      this.theGame.score();
      this.theGame.paused = true;
    } else if ((this.x >= this.theGame.canvas.width - this.img.width) && !this.theGame.paused) {
      document.getElementById('score_p1').innerHTML = parseInt(document.getElementById('score_p2').innerHTML) + 1;
      this.theGame.lost = 2;
      this.theGame.score();
      this.theGame.paused = true;
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

  startMoving(){
    this.shiftX = SHIFT_X;
    this.shiftY = SHIFT_Y;
    this.theGame.paused = false;
  }

  /**
   * on divise la paddle on 
   */
  calculateNewShift(){
    if(DEBUG){
      this.shiftX = -this.shiftX;
    }else {
      let n = 4;//10 segments au total
      let partHeight = this.theGame.paddle.height/((n+1)*2);
      let paddleCenter = this.theGame.paddle.y + this.theGame.paddle.height/2;
      let currentSeg = 0;
  
      let endSeg = n;
      let step = 1;
      if (this.y < paddleCenter){
        endSeg = -endSeg;
        step = -1;
      }
  
      for(currentSeg; currentSeg <= endSeg; currentSeg = currentSeg + step){
        //  console.log(currentSeg)
        if(this.y >= paddleCenter*currentSeg*step){
          this.shiftY = currentSeg * step;
        }
      }
      console.log("shifty=" + this.shiftY);
  
      let n2 = 7;
      this.shiftX = -Math.sign(this.shiftX) * Math.abs(n2 - Math.abs(this.shiftY));
      // this.shiftX = -this.shiftX;
      console.log("shiftX=" + this.shiftX);
    }
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

  deactivateCollision(){
    collision = false;
  }

  activateCollision(){
    collision = true;
  }

}
