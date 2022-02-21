import Ball from './Ball.js';
import Paddle from './Paddle.js';

const PlayerId = { ONE : 1, TWO : 2};

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {

  #socket;
  #playerId;

  /**
   * build a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    // création de la socket (connection client server)
    this.#socket = io('http://localhost:8080/'); 

    this.#socket.on('disble_start_btn' , () => this.disable_start_btn() );
    this.#socket.on('set_player_name', (player) => this.set_player_name(player));
    this.#socket.on('set_player_id', (player) => this.set_player_id(player));
    this.#socket.on('move_other_down', () => this.move_other_player_down());
    this.#socket.on('move_other_up', () => this.move_other_player_up());
    this.#socket.on('stop_moving_other', () => this.stop_moving_other());
    this.#socket.on('sync_ball', (ball) => this.sync_ball(ball));

    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(10, 3, this);
    this.paddle2 = new Paddle(this.canvas.width-this.paddle.img.width-10, 3, this);

  }

  send_sync_ball(){
    this.#socket.emit('sync ball', {x: this.ball.x, y : this.ball.y})
  }

  sync_ball(ball){
    console.log("synced ball");
    this.ball.x = ball.x;
    this.ball.y = ball.y;
  }

  move_other_player_down(){
    // console.log("client " + this.#socket.id + "received move down from server");
    if(this.#playerId == 1){
      this.paddle2.moveDown();
    }else if(this.#playerId == 2){
      this.paddle.moveDown();
    }
  }

  move_other_player_up(){
    // console.log("client " + this.#socket.id + "received move down from server");
    if(this.#playerId == 1){
      this.paddle2.moveUp();
    }else if(this.#playerId == 2){
      this.paddle.moveUp();
    }
  }

  stop_moving_other(){
    // console.log("client " + this.#socket.id + "received move down from server");
    if(this.#playerId == 1){
      this.paddle2.stopMoving();
    }else if(this.#playerId == 2){
      this.paddle.stopMoving();
    }
  }


  disable_start_btn(){
    document.getElementById("start").disabled = true;
  }

  set_player_id(player){
    this.#playerId = player.id;
    console.log(this.#playerId);
  }

  set_player_name(player){
    document.getElementById("player").innerHTML = player.name;
  }

  /** start this game animation */  
  start() {
    this.animate();
  }

  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
    this.#socket.emit("leave");
  }

  score(){
    window.cancelAnimationFrame(this.raf);
    this.restart();
  }

  restart(){
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
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

    if(this.ball.x == this.canvas.width/2){
      this.send_sync_ball();
    }

    if(this.ball.collisionWith(this.paddle)){
      this.ball.calculateNewShift();
      this.send_sync_ball();
    }

    if(this.ball.collisionWith(this.paddle2)){
      this.ball.calculateNewShift();
      this.send_sync_ball();
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
            if(this.#playerId == 1){
              this.paddle.moveDown();
            }else if (this.#playerId ==2){
              this.paddle2.moveDown();
            }

            this.#socket.emit("move down");
            break;
        case "ArrowUp":
        case "Up":
            if(this.#playerId == 1){
              this.paddle.moveUp();
            }else if (this.#playerId ==2){
              this.paddle2.moveUp();
            }
            
            this.#socket.emit("move up");
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
        if(this.#playerId == 1){
          this.paddle.stopMoving();
        }else if (this.#playerId ==2){
          this.paddle2.stopMoving();
        }
        
        this.#socket.emit("stop moving");
        break;
      default: return;
    }
    event.preventDefault();
  }



}
