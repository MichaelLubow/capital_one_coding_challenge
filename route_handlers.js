var measurementData = require('./data');

var isInputValid = function isInputValid(inputData){
  var isNumericInputDataValid = function isNumericInputDataValid(inputData){
    return !(
      //check if the numeric inputs exists and if they do make sure they are actually numeric
      (inputData.temperature && isNaN(parseFloat(inputData.temperature))) ||
      (inputData.dewPoint && isNaN(parseFloat(inputData.dewPoint))) ||
      (inputData.precipitation && isNaN(parseFloat(inputData.precipitation)))
    );
  };
  //ensure a timestamp is always present and check if numeric inputs are valid
  return !(!inputData.timestamp || !isNumericInputDataValid(inputData));
};

//check if the req param timestamp is the same as the body timestamp, this is for PUT/PATCH requests that update values
var updateRequestValid = function updateRequestValid(req, date){
  return (new Date(req.params.timestamp).getTime() === date.getTime());
};

var routeHandlers = {
  getMeasurementByTimestamp: function getMeasurementByTimestamp(req, res){
    console.log('inside getMeasurementByTimestamp');
    var timestamp = req.params.timestamp;
    console.log('timestamp is ', timestamp);

    //check if the timestamp is a valid full ISO 8601 string
    var ISO_8601 = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
    var isISO_8601 = ISO_8601.test(timestamp);
    console.log('ISO_8601.test(timestamp) ', isISO_8601);

    var isDate = false;
    //if the timestamp is a date and not a valid full ISO 8601 string we need to manually parse the string and build a date object
    if(!isISO_8601){
      var dateElements = timestamp.match(/^(\d{4})-(\d\d)-(\d\d)$/);
      console.log("dateElements ", dateElements);
      timestamp = new Date(dateElements[1], dateElements[2] - 1, dateElements[3]);
      console.log("timestamp ", timestamp);
      isDate = true;
    }
    var result = measurementData.find({key: 'timestamp', value: timestamp, isDate: isDate});
    console.log("result ", result);
    //if there are multiple results, send back an array, otherwise send back just the result obj
    if(result.length === 1){
      res.send(200, {measurement: result[0]});
    }
    else if(result.length > 1){
      res.send(200, {measurement: result});
    }
    else {
      res.send(404);
    }
  },

  postMeasurements: function postMeasurements(req, res){
    var measurement = req.body;
    var originalMeasurement = Object.assign({}, measurement);
    if(isInputValid(measurement)){
      measurement.timestamp = new Date(measurement.timestamp);
      measurementData.insert(measurement);
      console.log('successful insert');
      res.header('location', '/measurements/' + originalMeasurement.timestamp);
      res.send(201);
    }
    else {
      res.send(400);
    }
  },

  updateMeasurement: function updateMeasurement(req, res){
    console.log('req.method ', req.method);
    var updatedMeasurement = req.body;
    var date = new Date(updatedMeasurement.timestamp);

    if(!isInputValid(updatedMeasurement)){
      console.log('unable to update, invalid value(s)');
      res.send(400);
    }
    else if(!updateRequestValid(req, date)){
      console.log('unable to update, timestamps don\'t match');
      res.send(409);
    }
    else {
      var requestFunction = null;
      if(req.method.toUpperCase() === 'PUT') {
        requestFunction = 'findAndReplace';
      }
      else if(req.method.toUpperCase() === 'PATCH') {
        requestFunction = 'findAndUpdate';
      }
      else {
        console.log('Bad request');
        res.send(400);
      }
      if (measurementData[requestFunction]({key: 'timestamp', value: date}, updatedMeasurement)) {
        console.log('successful update');
        res.send(204);
      }
      else {
        console.log('not able to update as the value doesn\'t exist');
        res.send(404);
      }
    }
  },

  deleteMeasurement: function deleteMeasurement(req, res){
    var date = new Date(req.params.timestamp);
    if(measurementData.findAndDelete({key: 'timestamp', value: date})){
      console.log('successful delete');
      res.send(204);
    }
    else {
      console.log('not able to delete as the value doesn\'t exist');
      res.send(404);
    }
  },

  getStats: function getStats(req, res){
    var statistics = measurementData.calculateStats(req.query);
    res.send(200, {statistics: statistics});
  }

};

module.exports = routeHandlers;