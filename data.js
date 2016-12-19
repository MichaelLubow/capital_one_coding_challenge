var _isEqual = require('lodash/isEqual');

var measurements = [];

var publicMethods = {
  insert: function insert(measurement) {
    measurements.push(measurement);
  },

  // find: function find(timestamp){
  //   console.log("inside find ");
  //   return measurements.find(function(obj){
  //     return obj.timestamp === timestamp;
  //   });
  // },

  find: function find(obj){
    console.log('obj is ', obj);
    return measurements.filter(function(measurement){
      console.log('measurement[obj.key] is ', measurement[obj.key]);
      console.log('obj.value is ', obj.value);
      return measurement[obj.key] === obj.value;
    });
  },

  findAll: function findAll(){
    return measurements;
  },

  findAndReplace: function findAndReplace(obj, updatedMeasurement){
    console.log('measurements is ', measurements);
    var updated = false;
    measurements.forEach(function(measurement, index){
      // console.log("obj ", obj);
      // console.log("measurement at index " + index, measurement);
      console.log('measurement[obj.key] ', measurement[obj.key]);
      console.log('obj.value ', obj.value);
      if(measurement[obj.key].getTime() === obj.value.getTime()){
        console.log('obj and measurement are equal for the the value you are searching on');
        console.log('index to replace is ', index);
        measurements.splice(index, 1, updatedMeasurement);//remove the old measurement and replace with the correct one
        updated = true;
      }
    });
    console.log('measurements is now ', measurements);//check
    return updated;
  },

  findAndUpdate: function findAndUpdate(obj, updatedMeasurement){
    console.log('measurements is ', measurements);
    var updated = false;
    measurements.forEach(function(measurement, index){
      // console.log("obj ", obj);
      // console.log("measurement at index " + index, measurement);
      console.log('measurement[obj.key] ', measurement[obj.key]);
      console.log('obj.value ', obj.value);
      if(measurement[obj.key].getTime() === obj.value.getTime()){
        console.log('obj and measurement are equal for the the value you are searching on');
        console.log('index to replace is ', index);
        console.log("measurement ", measurement);
        console.log("updatedMeasurement ", updatedMeasurement);
        //for each property in the updatedMeasurement, let's replace the property value in the original measurement
        for(var p in updatedMeasurement){
          console.log('p is ', p);
          if(p !== 'timestamp'){
            measurement[p] = updatedMeasurement[p];
          }
        }
        updated = true;
      }
    });
    console.log('measurements is now ', measurements);//check
    return updated;
  },

  findAndDelete: function findAndDelete(obj){
    console.log('measurements is ', measurements);
    var updated = false;
    measurements.forEach(function(measurement, index){
      console.log('measurement[obj.key] ', measurement[obj.key]);
      console.log('obj.value ', obj.value);
      if(measurement[obj.key].getTime() === obj.value.getTime()){
        console.log('obj and measurement are equal for the the value you are searching on');
        console.log('index to replace is ', index);
        measurements.splice(index, 1);//remove the old measurement
        updated = true;
      }
    });
    console.log('measurements is now ', measurements);//check
    return updated;
  },

  calculateStats: function calculateStats(obj){
    var findMin = function findMin(metric){
      console.log('Inside findMin');

      var fromDateTime = (new Date(obj.fromDateTime)).getTime();
      var toDateTime = (new Date(obj.toDateTime)).getTime();

      console.log('fromDateTime ', fromDateTime);
      console.log("toDateTime ", toDateTime);

      //ensure the array is filtered by the timestamp range
      var filteredArr = measurements.filter(function(measurement){
        return measurement[metric] && measurement.timestamp.getTime() >= fromDateTime && measurement.timestamp.getTime() < toDateTime;
      });

      console.log('filteredArr is ', filteredArr);

      if(filteredArr.length > 0) {
        var min = filteredArr[0][metric];

        filteredArr.forEach(function (measurement) {
          if (measurement[metric] < min) {
            min = measurement[metric];
          }
        });
        return {metric: metric, stat: 'min', value: min};
      }
      else {
        return null;
      }
    };

    var findMax = function findMax(metric){
      console.log('Inside findMax');

      var fromDateTime = (new Date(obj.fromDateTime)).getTime();
      var toDateTime = (new Date(obj.toDateTime)).getTime();

      //ensure the array is filtered by the timestamp range
      var filteredArr = measurements.filter(function(measurement){
        return measurement[metric] && measurement.timestamp.getTime() >= fromDateTime && measurement.timestamp.getTime() < toDateTime;
      });

      console.log('filteredArr is ', filteredArr);
      if(filteredArr.length > 0) {
        var max = filteredArr[0][metric];

        filteredArr.forEach(function (measurement) {
          if (measurement[metric] > max) {
            max = measurement[metric];
          }
        });
        return {metric: metric, stat: 'max', value: max};
      }
      else {
        return null;
      }
    };

    var findAverage = function findAverage(metric){
      console.log('Inside findAverage');
      var fromDateTime = (new Date(obj.fromDateTime)).getTime();
      var toDateTime = (new Date(obj.toDateTime)).getTime();

      //ensure the array is filtered by the timestamp range
      var filteredArr = measurements.filter(function(measurement){
        return measurement[metric] && measurement.timestamp.getTime() >= fromDateTime && measurement.timestamp.getTime() < toDateTime;
      });

      console.log('filteredArr is ', filteredArr);
      if(filteredArr.length > 0) {
        var sum = 0;

        filteredArr.forEach(function (measurement) {
          sum = sum + measurement[metric];
        });

        return {metric: metric, stat: 'average', value: +(sum / filteredArr.length).toFixed(2)};
      }
      else {
        return null;
      }
    };


    var statistics = [];

    var findStats = function findStats(metric){
      if(obj.stat.includes('min')){
        var minResult = findMin(metric);
        if(minResult) {
          statistics.push(minResult);
        }
      }
      if(obj.stat.includes('max')){
        var maxResult = findMax(metric);
        if(maxResult) {
          statistics.push(maxResult);
        }
      }
      if(obj.stat.includes('average')){
        var averageResult = findAverage(metric);
        if(averageResult) {
          statistics.push(averageResult);
        }
      }
    };

    //if we are reporting on more than one metric
    if(Array.isArray(obj.metric)){
      obj.metric.forEach(function(metric){
        findStats(metric);
      });
    }
    else{//there is a single metric
      findStats(obj.metric);
    }

    console.log('statistics is ', statistics);
    return statistics;
  }
};

module.exports = publicMethods;