var restify = require('restify');
var routeHandlers = require('./route_handlers');

var server = restify.createServer({
  name: 'capitalOneChallengeServer',
  version: '0.0.1',
  url: 'localhost'
});

server.use(restify.CORS());
server.use(restify.bodyParser({
  mapParams: false
}));
server.use(restify.queryParser());

server.post('/measurements', routeHandlers.postMeasurements);
server.get('/measurements/:timestamp', routeHandlers.getMeasurementByTimestamp);
server.get('/measurements/:date', routeHandlers.getMeasurementByTimestamp);
server.put('/measurements/:timestamp', routeHandlers.updateMeasurement);
server.patch('/measurements/:timestamp', routeHandlers.updateMeasurement);
server.del('/measurements/:timestamp', routeHandlers.deleteMeasurement);
server.get('/stats', routeHandlers.getStats);

console.log('server is ', server.name);
console.log("server.url ", server.url);

server.listen(8080, function() {
  console.log('%s listening', server.name);
});


