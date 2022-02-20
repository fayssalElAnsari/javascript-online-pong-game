import http from 'http';
import IOController from './controllers/ioController.js';
import RequestController from './controllers/requestController.js';
import { Server as ServerIO } from 'socket.io';

const server = http.createServer(
	(request, response) => new RequestController(request, response).handleRequest()
);

let connectionsLimit = 2;

const io = new ServerIO(server);
const ioController = new IOController(io);

io.on('connection', socket => {
	if (io.engine.clientsCount > connectionsLimit) {
		socket.emit('err', { message: 'reach the limit of connections' })
		socket.disconnect()
		console.log('Disconnected...');
		return
	} else {
		ioController.registerSocket(socket);
		console.log("connected");
	}

});




server.listen(8080);
