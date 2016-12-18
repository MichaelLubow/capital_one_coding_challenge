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
    var findMin = function findMin(){
      console.log('Inside findMin');
      //ensure the array is sorted by timestamp
      var sortedArr = measurements.sort(function(m1, m2){
        if (m1.timestamp.getTime() > m2.timestamp.getTime()) {
          return 1;
        }
        if (m1.timestamp.getTime() < m2.timestamp.getTime()) {
          return -1;
        }
        return 0;
      });

      console.log('sortedArr is ', sortedArr);
      var min = sortedArr[0].temperature;

      sortedArr.forEach(function(measurement, index){
        if(measurement.temperature < min){
          min = measurement.temperature;
        }
      });
      return min;
    };

    var findMax = function findMax(){
      console.log('Inside findMax');
      //ensure the array is sorted by timestamp
      var sortedArr = measurements.sort(function(m1, m2){
        if (m1.timestamp.getTime() > m2.timestamp.getTime()) {
          return 1;
        }
        if (m1.timestamp.getTime() < m2.timestamp.getTime()) {
          return -1;
        }
        return 0;
      });

      console.log('sortedArr is ', sortedArr);
      var max = sortedArr[0].temperature;

      sortedArr.forEach(function(measurement, index){
        if(measurement.temperature > max){
          max = measurement.temperature;
        }
      });
      return max;
    };

    var findAverage = function findAverage(){
      console.log('Inside findAverage');
      //ensure the array is sorted by timestamp
      var sortedArr = measurements.sort(function(m1, m2){
        if (m1.timestamp.getTime() > m2.timestamp.getTime()) {
          return 1;
        }
        if (m1.timestamp.getTime() < m2.timestamp.getTime()) {
          return -1;
        }
        return 0;
      });

      console.log('sortedArr is ', sortedArr);
      var sum = 0;

      sortedArr.forEach(function(measurement, index){
        sum = sum + measurement.temperature;
      });

      return sum / sortedArr.length;
    };

    var statistics = [];
    if(obj.stat.includes('min')){
      statistics.push(findMin());
    }
    if(obj.stat.includes('max')){
      statistics.push(findMax());
    }
    if(obj.stat.includes('average')){
      statistics.push(findAverage());
    }

    console.log('statistics is ', statistics);
    return statistics;
  }
};

module.exports = publicMethods;