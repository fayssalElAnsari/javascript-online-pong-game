import Ball from './Ball.js';
import Paddle from './Paddle.js';


/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(10, 3, this);
    this.paddle2 = new Paddle(this.canvas.width-this.paddle.img.width-10, 3, this);
  }

  /** start this game animation */  
  start() {
    this.animate();
  }

  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
  }

  score(){
    window.cancelAnimationFrame(this.raf);
  }

  /** animate the game : move and draw */
  animate() {
    this.moveAndDraw();
    this.raf = window.requestAnimationFrame(this.animate.bind(this));
  }
  
  /** move then draw the bouncing ball */
  moveAndDraw() {
    const ctxt = this.canvas.getContext("2d");
    ctxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // draw and move the ball
    this.ball.move();
    this.ball.draw(ctxt);
    this.paddle.move(ctxt);
    this.paddle.draw(ctxt);
    this.paddle2.move(ctxt);
    this.paddle2.draw(ctxt);

    if(this.ball.collisionWith(this.paddle)){
      this.ball.calculateNewShiftX();
      this.ball.calculateNewShiftY();
      // this.ball.shiftX = this.ball.calculateNewShiftX()
      
    }

    if(this.ball.collisionWith(this.paddle2)){
      this.ball.calculateNewShiftX();
      this.ball.calculateNewShiftY();
      // this.ball.shiftX = this.ball.calculateNewShiftX()
      
    }

  }


/**
   * Handles key presses.
   *
   * If arrow up is pressed, the ship is set to move up.
   * If arrow down is pressed, the ship is set to move down.
   *
   * @param {*} event the event triggered by pressing a key
   */
 keyDownActionHandler(event) {
  switch (event.key) {
        case " ":
        break;
        case "ArrowDown":
        case "Down":
            this.paddle.moveDown();
            this.paddle2.moveDown();
            break;
        case "ArrowUp":
        case "Up":
            this.paddle.moveUp();
            this.paddle2.moveUp();
            break;
        default: return;
    }
    event.preventDefault();
  }
  /**
  * Handles key releases.
  *
  * @param {*} event the event triggered by pressing a key
  */
  keyUpActionHandler(event) {
    switch (event.key) {
      case "ArrowUp":
      case "Up":
      case "ArrowDown":
      case "Down":
      this.paddle.stopMoving();
      this.paddle2.stopMoving();
      break;
      default: return;
    }
    event.preventDefault();
  }



}
