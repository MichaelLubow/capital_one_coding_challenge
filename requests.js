var request = require('superagent');

function makeDeleteRequest(apiEndpointURL){
  request
    .delete(apiEndpointURL)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if(!err){
        console.log("Inside success of DELETE Request");
        console.log("The results are:");
        console.log("-----------------------------------");
        console.log("res.status ", res.status);
      }
      else {
        console.log("Inside error of DELETE Request");
        console.log('err is ', err.status);
      }
    });
}

function makePatchRequest(apiEndpointURL, data){
  request
    .patch(apiEndpointURL)
    .send(data)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if(!err){
        console.log("Inside success of PATCH Request");
        console.log("The results are:");
        console.log("-----------------------------------");
        console.log("res.status ", res.status);
      }
      else {
        console.log("Inside error of PATCH Request");
        console.log('err is ', err.status);
      }
    });
}

function makePutRequest(apiEndpointURL, data){
  request
    .put(apiEndpointURL)
    .send(data)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if(!err){
        console.log("Inside success of PUT Request");
        console.log("The results are:");
        console.log("-----------------------------------");
        console.log("res.status ", res.status);
      }
      else {
        console.log("Inside error of PUT Request");
        console.log('err is ', err.status);
      }
    });
}

function makePostRequest(apiEndpointURL, data){
  request
    .post(apiEndpointURL)
    .send(data)
    .set('Accept', 'application/json')
    .end(function(err, res){
      if(!err){
        console.log("Inside success of POST Request");
        console.log("The results are:");
        console.log("-----------------------------------");
        console.log("res.headers ", res.headers);
        console.log("res.status ", res.status);
      }
      else {
        console.log("Inside error of POST Request");
        console.log('err is ', err.status);
      }
    });
}

function makeGetRequest(apiEndpointURL){
  request
    .get(apiEndpointURL)
    .end(function(err, res){
      console.log('Inside get request');
      console.log("The results are:");
      console.log("-----------------------------------");
      if(!err) {
        console.log("Inside success of GET Request");
        console.log('res.body is ', res.body);
        console.log('res.headers are ', res.headers);
        console.log("res.status ", res.status);
      }
      else {
        console.log("Inside error of GET Request");
        console.log('err is ', err.status);
      }
    });
}

//------------------------------------------------------------------------
//  Feature 1
//------------------------------------------------------------------------

//Scenario 1 (Add a measurement with valid (numeric) values
//  makePostRequest('http://localhost:8080/measurements', {
//    timestamp: "2015-09-01T16:00:00.000Z",
//    temperature: 27.1,
//    dewPoint: 16.7,
//    precipitation: 0
//  });

//Scenario 2 (Cannot add a measurement with invalid values)
// makePostRequest('http://localhost:8080/measurements', {
//   timestamp: "2015-09-01T16:00:00.000Z",
//   temperature: "not a number",
//   dewPoint: 16.7,
//   precipitation: 0
//});

//Scenario 3 (Cannot add a measurement without a timestamp)
// makePostRequest('http://localhost:8080/measurements', {
//   temperature: 27.1,
//   dewPoint: 20,
//   precipitation: 0
// });

//------------------------------------------------------------------------
//  Feature 2
//------------------------------------------------------------------------

/*makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:00:00.000Z",
  temperature: 27.1,
  dewPoint: 16.7,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:10:00.000Z",
  temperature: 27.3,
  dewPoint: 16.9,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:20:00.000Z",
  temperature: 27.5,
  dewPoint: 17.1,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:30:00.000Z",
  temperature: 27.4,
  dewPoint: 17.3,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:40:00.000Z",
  temperature: 27.2,
  dewPoint: 17.2,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-02T16:00:00.000Z",
  temperature: 28.1,
  dewPoint: 18.3,
  precipitation: 0
});
*/

//Scenario 1 (Get a specific measurement)
//makeGetRequest('http://localhost:8080/measurements/2015-09-01T16:20:00.000Z');

//Scenario 2 (Get a measurement that does not exist)
//makeGetRequest('http://localhost:8080/measurements/2015-09-01T16:50:00.000Z');

//Scenario 3 (Get measurements from a day)
//makeGetRequest('http://localhost:8080/measurements/2015-09-01');

//Scenario 4 (Get measurement from a day where no measurements were taken.)
// makeGetRequest('http://localhost:8080/measurements/2015-09-03');

//------------------------------------------------------------------------
//  Feature 3
//------------------------------------------------------------------------

/*makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:00:00.000Z",
  temperature: 27.1,
  dewPoint: 16.7,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:10:00.000Z",
  temperature: 27.3,
  dewPoint: 16.9,
  precipitation: 0
});*/

//Scenario 1 (Replace a measurement with valid (numeric) values)
// makePutRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z', {
//   timestamp: "2015-09-01T16:00:00.000Z",
//   temperature: 27.1,
//   dewPoint: 16.7,
//   precipitation: 15.2
// });

//Scenario 2 (Replace a measurement with invalid values)
// makePutRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z', {
//   timestamp: "2015-09-01T16:00:00.000Z",
//   temperature: "not a number",
//   dewPoint: 16.7,
//   precipitation: 15.2
// });

//Scenario 3 (Replace a measurement with mismatched timestamps)
// makePutRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z', {
//   timestamp: "2015-09-02T16:00:00.000Z",
//   temperature: 27.1,
//   dewPoint: 16.7,
//   precipitation: 15.2
// });

//Scenario 4 (Replace a measurement that does not exist)
// makePutRequest('http://localhost:8080/measurements/2015-09-02T16:00:00.000Z', {
//   timestamp: "2015-09-02T16:00:00.000Z",
//   temperature: 27.1,
//   dewPoint: 16.7,
//   precipitation: 15.2
// });

//Scenario 5 (Update metrics of a measurement with valid (numeric) values)
// makePatchRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z', {
//   timestamp: "2015-09-01T16:00:00.000Z",
//   precipitation: 12.3
// });

//Scenario 6 (Update metrics of a measurement with invalid values)
// makePatchRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z', {
//   timestamp: "2015-09-01T16:00:00.000Z",
//   precipitation: "not a number"
// });

//Scenario 7 (Update metrics of a measurement with mismatched timestamps)
// makePatchRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z', {
//   timestamp: "2015-09-02T16:00:00.000Z",
//   precipitation: 12.3
// });

//Scenario 8 (Update metrics of a measurement that does not exist)
// makePatchRequest('http://localhost:8080/measurements/2015-09-02T16:00:00.000Z', {
//   timestamp: "2015-09-02T16:00:00.000Z",
//   precipitation: 12.3
// });

//------------------------------------------------------------------------
//  Feature 4
//------------------------------------------------------------------------

/*
makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:00:00.000Z",
  temperature: 27.1,
  dewPoint: 16.7,
  precipitation: 0
});

makePostRequest('http://localhost:8080/measurements', {
  timestamp: "2015-09-01T16:10:00.000Z",
  temperature: 27.3,
  dewPoint: 16.9,
  precipitation: 0
});
*/

//Scenario 1 (Delete a specific measurement)
//makeDeleteRequest('http://localhost:8080/measurements/2015-09-01T16:00:00.000Z');

//Scenario 2 (Delete a measurement that does not exist)
//makeDeleteRequest('http://localhost:8080/measurements/2015-09-01T16:20:00.000Z');

//------------------------------------------------------------------------
//  Feature 5
//------------------------------------------------------------------------

/*makePostRequest('http://localhost:8080/measurements', {
 timestamp: "2015-09-01T16:00:00.000Z",
 temperature: 27.1,
 dewPoint: 16.9
 });

 makePostRequest('http://localhost:8080/measurements', {
 timestamp: "2015-09-01T16:10:00.000Z",
 temperature: 27.3
 });

 makePostRequest('http://localhost:8080/measurements', {
 timestamp: "2015-09-01T16:20:00.000Z",
 temperature: 27.5,
 dewPoint: 17.1
 });

 makePostRequest('http://localhost:8080/measurements', {
 timestamp: "2015-09-01T16:30:00.000Z",
 temperature: 27.4,
 dewPoint: 17.3
 });

 makePostRequest('http://localhost:8080/measurements', {
 timestamp: "2015-09-01T16:40:00.000Z",
 temperature: 27.2
 });

 makePostRequest('http://localhost:8080/measurements', {
 timestamp: "2015-09-01T17:00:00.000Z",
 temperature: 28.1,
 dewPoint: 18.3
 });
 */

//Scenario 1 (Get stats for a well-reported metric)
//makeGetRequest('http://localhost:8080/stats?stat=min&stat=max&stat=average&metric=temperature&fromDateTime=2015-09-01T16:00:00.000Z&toDateTime=2015-09-01T17:00:00.000Z');

//Scenario 2 (Get stats for a sparsely reported metric)
//makeGetRequest('http://localhost:8080/stats?stat=min&stat=max&stat=average&metric=dewPoint&fromDateTime=2015-09-01T16:00:00.000Z&toDateTime=2015-09-01T17:00:00.000Z');

//Scenario 3 (Get stats for a metric that has never been reported)
//makeGetRequest('http://localhost:8080/stats?stat=min&stat=max&stat=average&metric=precipitation&fromDateTime=2015-09-01T16:00:00.000Z&toDateTime=2015-09-01T17:00:00.000Z');

//Scenario 4 (Get stats for more than one metric)
//makeGetRequest('http://localhost:8080/stats?stat=min&stat=max&stat=average&metric=temperature&metric=dewPoint&metric=precipitation&fromDateTime=2015-09-01T16:00:00.000Z&toDateTime=2015-09-01T17:00:00.000Z');