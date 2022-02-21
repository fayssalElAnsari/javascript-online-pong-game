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
        socket.broadcast.emit('move_other_down');
      });
      socket.on('move up', () => {
        socket.broadcast.emit('move_other_up');
      });
      socket.on('stop moving', () => {
        socket.broadcast.emit('stop_moving_other');
      });
    }
  
    // just show a simple console log
    disconnect(socket) {
      const userName = this.#players[socket.id] || 'unknown';
      console.log(`disconnection from ${socket.id} (user : ${userName})`);

      this.#io.fetchSockets().then((sockets) => {
        sockets.forEach( socket => {
        socket.disconnect();
      })
      });

      // if disconnecting while two or less players disconnect everyone
      // if(this.#io.clientsCount < 3){
      //   this.#io.fetchSockets().then((sockets) => {
      //     sockets.forEach( socket => {
      //     socket.disconnect();
      //   })
      //   });
      // }
      

      // this.#players = [];
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