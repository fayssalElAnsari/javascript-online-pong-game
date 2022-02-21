// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #players;
    
    constructor(io) {
      this.#io = io;
      this.#players = [];// will take in the socket ids
    }

    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      this.#players.push(socket.id);
      this.setupListeners(socket);
    }
  

    setupListeners(socket) {
      socket.on('disconnect', () => this.disconnect(socket));
      socket.on('leave', () => this.stop());
      socket.on('move down', () => {
        console.log("recevied moved down from: " + socket.id);
        console.log(this.#players);
        if(socket.id == this.#players[0]){
          this.#io.to(this.#players[1]).emit('move_other_down');
        } else if( socket.id == this.#players[1]){
          this.#io.to(this.#players[0]).emit('move_other_down');
          // this.#players[0].emit('move down');
        }
      });
    }
  
    // just show a simple console log
    disconnect(socket) {
      const userName = this.#players[socket.id] || 'unknown';
      console.log(`disconnection from ${socket.id} (user : ${userName})`);
    }

    // when user stops playing (presses disconnect) all users disconnect
    // it should be when he refreshes the page also
    stop(){
      this.#io.fetchSockets().then((sockets) => {
        sockets.forEach( socket => {
        socket.disconnect();
      })

      });
      this.#players = [];
      
    }



  }