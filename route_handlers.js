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
  postMeasurements: function postMeasurements(req, res){
    //console.log(req.body);
    var measurement = req.body;
    //console.log('measurement is ', measurement);
    measurement.timestamp = new Date(measurement.timestamp);
    //console.log('measurement.timestamp ', measurement.timestamp);
    if(isInputValid(measurement)){
      measurementData.insert(measurement);
      console.log('successful insert');
      res.header('location', '/measurements/' + measurement.timestamp);
      res.send(201);
    }
    else {
      res.send(400);
    }
  },

  getMeasurementByTimestamp: function getMeasurementByTimestamp(req, res){
    console.log('req.params is ', req.params);
    var timestamp = req.params.timestamp;
    console.log('timestamp is ', timestamp);
    var result = measurementData.find({key: 'timestamp', value: timestamp});
    console.log("result ", result);
    if(result.length > 0){
      res.send(200, {measurement: result[0]});
    }
    else {
      res.send(404);
    }
  },

  getMeasurementsByDate: function getMeasurementsByDate(req, res){
    console.log("inside getMeasurementsByDate");
    console.log('req.params is ', req.params);
    var date = new Date(req.params.date);
    console.log('mike date is ', date);
    var results = measurementData.find({key: 'timestamp', value: date.toISOString()});
    console.log("results ", results);
    if(results){
      res.send(200, {measurements: results});
    }
    else {
      res.send(404);
    }
  },

  updateMeasurement: function updateMeasurement(req, res){
    //console.log('req is ', req);
    console.log('req.method ', req.method);
    console.log('req.params is ', req.params);
    console.log('req.body is ', req.body);

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
      if(measurementData.findAndReplace({key: 'timestamp', value: date}, updatedMeasurement)){
        console.log('successful update');
        res.send(204);
      }
      else {
        console.log('not able to update as the value doesn\'t exist');
        res.send(404);
      }
    }
  },

  patchMeasurement: function patchMeasurement(req, res){
    var updatedMeasurement = req.body;
    var date = new Date(updatedMeasurement.timestamp);

    console.log('updatedMeasurement is ', updatedMeasurement);
    if(!isInputValid(updatedMeasurement)){
      console.log('unable to update, invalid value(s)');
      res.send(400);
    }
    else if(!updateRequestValid(req, date)){
      console.log('unable to update, timestamps don\'t match');
      res.send(409);
    }
    else {
      measurementData.findAndUpdate({key: 'timestamp', value: date}, updatedMeasurement);
      console.log('successful partial update');
      res.send(204);
    }
  }


  // getMuseums: function getMuseums(req, res, next) {
  //   MuseumModel.find({}, function(err, docs) {
  //     if (err) {
  //       console.error("error is ", err);
  //       res.send(err);
  //     }
  //     else {
  //       console.log("response is ", docs);
  //       res.send(docs);
  //     }
  //   });
  // },
  //
  // getMuseumById: function getMuseumById(req, res, next) {
  //   console.log("I am here");
  //   console.log(req.params.id);
  //   MuseumModel.findById(req.params.id, function(err, doc){
  //     if(err){
  //       console.error("error is ", error);
  //       res.send(err);
  //     }
  //     else{
  //       console.log("response is ", doc);
  //       res.send(doc);
  //     }
  //   });
  // }
};

module.exports = routeHandlers;