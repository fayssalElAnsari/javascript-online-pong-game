import http from 'http';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

// définition de la fonction d'écoute exécutée à la connexion d'un nouveau socket
const connectionListener = socket => {
	function sendRandNb() {
		 console.log(`${Math.random() * 20}`);  
	}

	setInterval(sendRandNb, 2000);

	// abonnement au message 'greatings' émis par un client
	socket.on('greetings',
			  () => {
				console.log(`greatings received from ${socket.id} at ${new Date().toLocaleTimeString()}`);
				// envoi du message 'welcome' au client
				socket.emit('welcome');
			  });
  }

const io = new ServerIO(server);
io.on('connection', connectionListener);

server.listen(8080);