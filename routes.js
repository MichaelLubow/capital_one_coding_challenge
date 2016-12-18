var restify = require('restify');
var routeHandlers = require('./route_handlers');

var server = restify.createServer({
  name: 'capitalOneChallenge',
  version: '0.0.1',
  url: 'localhost'
});

server.use(restify.CORS());
server.use(restify.bodyParser({
  mapParams: false
}));
server.use(restify.queryParser());

server.post('/measurements', routeHandlers.postMeasurements);
// server.get('/measurements/:timestamp', function(req, res, next){
//   console.log("req.params ", req.params);
//   routeHandlers.getMeasurementByTimestamp(req, res);
// });
server.get('/measurements/:date', routeHandlers.getMeasurementsByDate);
server.put('/measurements/:timestamp', routeHandlers.updateMeasurement);
server.patch('/measurements/:timestamp', routeHandlers.patchMeasurement);

// server.delete('/measurements/:timestamp', routeHandlers.deleteMeasurementTimestamp);

//server.get('/stats', routeHandlers.getStats);


console.log('server is ', server.name);
console.log("server.url ", server.url);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});


