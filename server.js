const http = require('http') // On appelle l'objet 'http' de node
const app = require('./app') // On appelle l'application que renverra le serveur

const normalizePort = (val) => {
  // la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}
const port = normalizePort(process.env.PORT || '3000')

app.set('port', port) // On doit spécifié sur quel port tourne l'application ( port 3000 par défaut ou sur le port spécifié par l'environnement)

const errorHandler = (error) => {
  // recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

const server = http.createServer(app) // On créer notre serveur grâce à le méthode '.createServer qui prend deux paramètres

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port) // Le serveur écoute les requêtes sur le port 3000 par défaut ou sur le port spécifié par l'environnement
