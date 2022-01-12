import http from 'http';
import RequestController from './controllers/requestController.js';
import IOController from './controllers/ioController.js';
import { Server as ServerIO } from 'socket.io';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

function sendRandNb() {
	var nb = Math.round(Math.random() * 6 + 2); 
	return  nb;
}

// définition de la fonction d'écoute exécutée à la connexion d'un nouveau socket
const connectionListener = socket => {
	console.log(`connection received from ${socket.id} at ${new Date().toLocaleTimeString()}`);
	// envoi du message 'welcome' au client
	
	setInterval(() => socket.emit('updateChart', { nb : sendRandNb() }), 2000);

  }


const io = new ServerIO(server);
io.on('connection', connectionListener);

server.listen(8080);