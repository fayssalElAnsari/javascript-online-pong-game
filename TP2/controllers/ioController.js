// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #clients;
    
  
    constructor(io) {
      this.#io = io;
      this.#clients = new Map();
      setInterval( this.sendRandNb.bind(this) , 1000 );
    }
  
    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      this.setupListeners(socket);
    }
  
    setupListeners(socket) {
      socket.on( 'greatings'  , user => this.greatings(socket, user.name) );
      socket.on( 'disconnect' , () => this.leave(socket) );
    }
  
    greatings(socket, userName) {
      console.log(`greatings received from ${userName} (id : ${socket.id})`);
      this.#clients.set(socket.id, userName);
      socket.emit('welcome');
    }
  
    leave(socket) {
      const userName = 'unknown' || this.#clients.get(socket.id);
      console.log(`disconnection from ${socket.id} (user : ${userName})`);
    }

    sendRandNb() {
      const nb = Math.round(Math.random() * 6 + 2);
      this.#io.emit('updateChart', nb);
    }


  }