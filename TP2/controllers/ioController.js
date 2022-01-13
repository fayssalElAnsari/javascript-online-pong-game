// fichier ./controllers/ioController.js (serveur)
export default class IOController {
    #io;
    #clients;
    #senders;
    
    constructor(io) {
      this.#io = io;
      this.#clients = new Map();
      this.#senders = new Map();
    }
  
    // sendRandNb() {
    //   const nb = Math.round(Math.random() * 6 + 2);
    //   this.#io.emit('updateChart', nb);
    //   console.log(nb);// q 6.1
    //   // q 6.2 on remarque qu l'affichage des nombres continue :(
    // }

    sendRandNb(socket) {
      const nb = Math.round(Math.random() * 6 + 2);
      socket.emit('updateChart', nb);
      console.log(nb);// q 6.1
      // q 6.2 on remarque qu l'affichage des nombres continue :(

    }

    registerSocket(socket) {
      console.log(`new connection with id ${socket.id}`);
      const numberSender = setInterval(this.sendRandNb.bind(this, socket), 1000);
      this.#senders.set(socket.id, numberSender);
      this.sendRandNb(socket);
      this.setupListeners(socket);
    }
  
    setupListeners(socket) {
      // socket.on( 'greatings'  , user => this.greatings(socket, user.name) );
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
      clearInterval(this.#senders.get(socket));
    }



  }