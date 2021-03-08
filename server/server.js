const path = require('path');
const db = path.join(__dirname, 'database.json');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(router);

server.listen(3500, () => {
	console.log('JSON Server is running');
});
