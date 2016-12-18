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
  }
};

module.exports = publicMethods;