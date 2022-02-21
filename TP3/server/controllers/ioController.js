// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #players;
    
    constructor(io) {
      this.#io = io;
      this.#players = new Map();
    }

    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      this.#players.set(socket.id, 0);
      this.setupListeners(socket);
    }
  
    setupListeners(socket) {
      socket.on( 'disconnect' , () => this.leave(socket) );
    }
  
    leave(socket) {
      const userName = this.#players.get(socket.id) || 'unknown';
      console.log(`disconnection from ${socket.id} (user : ${userName})`);
    }



  }