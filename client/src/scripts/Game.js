import Ball from './Ball.js';
import Paddle from './Paddle.js';

const PlayerId = { ONE : 1, TWO : 2};

/**
 * a Game animates a ball bouncing in a canvas
 */
export default class Game {
  #socket;
  #playerId;
  lost = 0;
  paused = false;
  SCORE_LIMIT = 100;

  /**
   * builds a Game
   *
   * @param  {Canvas} canvas the canvas of the game
   */
  constructor(canvas) {
    this.raf = null;
    this.canvas = canvas;
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paddle = new Paddle(10, 3, this);
    this.paddle2 = new Paddle(this.canvas.width-this.paddle.img.width - 10, 3, this);
  }

  /**
   * starts the new round after the score limit have been reached
   */
  next_round(){
    
  }

  /**
   * envoie l'evenement de synchronisation de la ball
   * l'object envoie contient la position actuelle de la ball
   */
  send_sync_ball(){
    this.#socket.emit('sync ball', {x: this.ball.x, y : this.ball.y});
  }

  /**
   * recoie l'evenement de synchronisation de la balle 
   * et change la position de la ball si necessaire
   * @param {*} ball l'objet qui represente la balle
   */
  sync_ball(ball){
    this.ball.x = ball.x;
    this.ball.y = ball.y;
  }

  /**
   * envoie l'evenement de synchronisation du paddle du joueur
   * l'object envoie contient la position actuelle du paddle
   */
  send_sync_paddle(){
    if(this.#playerId == 1){
      this.#socket.emit('sync paddle', {x: this.paddle.x, y : this.paddle.y})
    }else if(this.#playerId == 2){
      this.#socket.emit('sync paddle', {x: this.paddle2.x, y : this.paddle2.y})
    }
  }

  /**
   * recoie l'evenement de synchronisation du paddle 
   * et change la position du paddle si necessaire
   * @param {*} paddle l'objet qui represente le paddle
   */
  sync_paddle(paddle){
    if(this.#playerId == 1){
      this.paddle2 = paddle.y;
    }else if(this.#playerId == 2){
      this.paddle1 = paddle.y;
    }
  }

  /**
   * change la position de l'autre joueur vers le bas
   */
  move_other_player_down(){
    if(this.#playerId == 1){
      this.paddle2.moveDown();
    }else if(this.#playerId == 2){
      this.paddle.moveDown();
    }
  }

  /**
   * change la position de l'autre joueur vers le haut
   */
  move_other_player_up(){
    // console.log("client " + this.#socket.id + "received move down from server");
    if(this.#playerId == 1){
      this.paddle2.moveUp();
    }else if(this.#playerId == 2){
      this.paddle.moveUp();
    }
  }

  /**
   * fixe la position du paddle de l'autre joueur
   * apres relachement du bouton
   */
  stop_moving_other(){
    // console.log("client " + this.#socket.id + "received move down from server");
    if(this.#playerId == 1){
      this.paddle2.stopMoving();
    }else if(this.#playerId == 2){
      this.paddle.stopMoving();
    }
  }

  /**
   * desactivie le bouton start 
   * lorsque le nombre maximal des joueur est atteint
   */
  disable_start_btn(){
    document.getElementById("start").disabled = true;
  }

  /**
   * donne un ID au joueur actuel
   * @param {*} player 
   */
  set_player_id(player){
    this.#playerId = player.id;
  }

  /**
   * donne un nom au joueur actuel
   * @param {*} player 
   */
  set_player_name(player){
    document.getElementById("player").innerHTML = player.name;
  }

  connect() {
        // création de la socket (connection client server)
        this.#socket = io('http://localhost:4321/');

        this.#socket.on("start_game", () => this.start());
        this.#socket.on('send_new_ball', () => this.restart());

        this.#socket.on('disble_start_btn' , () => this.disable_start_btn());
        this.#socket.on('set_player_name', (player) => this.set_player_name(player));
        this.#socket.on('set_player_id', (player) => this.set_player_id(player));
        this.#socket.on('set_msg_box', (msg) => this.set_msg_box(msg));

        this.#socket.on('move_other_down', () => this.move_other_player_down());
        this.#socket.on('move_other_up', () => this.move_other_player_up());
        this.#socket.on('stop_moving_other', () => this.stop_moving_other());

        this.#socket.on('sync_ball', (ball) => this.sync_ball(ball));
        this.#socket.on('sync_paddle', (paddle) => this.sync_paddle(paddle));

        this.#socket.on('opponent_disconnected', () => this.opponent_disconnected());
  }
  
  opponent_disconnected(){
    this.set_msg_box({msg_txt: "your opponent left the game"});
  }

  set_msg_box(msg){
    document.getElementById("msg_box").innerHTML = msg.msg_txt;
  }

  /** start this game animation */  
  start() {
    setTimeout( () => {
      this.animate();
    }, 1000);
  }

  /** stop this game animation */
  stop() {
    window.cancelAnimationFrame(this.raf);
    this.#socket.disconnect();
  }

  /** arrete le jeu apres un but */
  score(){
    window.cancelAnimationFrame(this.raf);
    this.ball.stopMoving();
  }

  /** redemare la partie */
  restart(){
    this.set_msg_box({msg_txt: ""});
    this.ball = new Ball(this.canvas.width/2, this.canvas.height/2, this);
    this.paused = false;
    this.ball.stopMoving();
    this.paddle.y = this.canvas.height/2;
    this.paddle2.y = this.canvas.height/2;
    setTimeout( () => {
      this.ball.startMoving();
    }, 1000);
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
   * If arrow up is pressed, the paddle is set to move up.
   * If arrow down is pressed, the paddle is set to move down.
   *
   * @param {*} event the event triggered by pressing a key
   */
 keyDownActionHandler(event) {
  switch (event.key) {
        case " ":
          if(this.lost == this.#playerId){
            this.#socket.emit("send new ball");
          } else {
            this.set_msg_box({msg_txt: "You can't send new ball"});
          }       
        break;
        case "ArrowDown":
        case "Down":
            this.send_sync_paddle();
            if(this.#playerId == 1){
              this.paddle.moveDown();
            }else if (this.#playerId == 2){
              this.paddle2.moveDown();
            }

            this.#socket.emit("move down");
            break;
        case "ArrowUp":
        case "Up":
          this.send_sync_paddle();
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
        this.send_sync_paddle();
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
