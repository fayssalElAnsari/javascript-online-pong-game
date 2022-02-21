// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #players;
    
    constructor(io) {
      this.#io = io;
      this.#players = [];
    }

    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      this.#players.push(socket.id);
      this.setupListeners(socket);
    }
  

    setupListeners(socket) {
      socket.on('disconnect', () => this.disconnect(socket));
      socket.on('leave', () => this.stop());
    }
  
    // just show a simple console log
    disconnect(socket) {
      const userName = this.#players[socket.id] || 'unknown';
      console.log(`disconnection from ${socket.id} (user : ${userName})`);
    }

    // when user stops playing(presses disconnect) all users disconnect
    stop(){
      this.#io.fetchSockets().then((sockets) => {
        sockets.forEach( socket => {
        socket.disconnect();
      })

      });
      
    }



  }