var measurements = [];

var publicMethods = {
  insert: function insert(measurement) {
    measurements.push(measurement);
  },

  find: function find(obj){
    return measurements.filter(function(measurement){
      if(obj.key === 'timestamp') {
        if(obj.isDate){
          var queryDate = obj.value;
          return (measurement[obj.key].getDate() === queryDate.getDate() &&
            measurement[obj.key].getMonth() === queryDate.getMonth() &&
            measurement[obj.key].getFullYear() === queryDate.getFullYear()
          );
        }
        else {
          return measurement[obj.key].getTime() === (new Date(obj.value)).getTime();
        }
      }
      else {
        return measurement[obj.key] === obj.value;
      }
    });
  },

  findAll: function findAll(){
    return measurements;
  },

  findAndReplace: function findAndReplace(obj, updatedMeasurement){
    console.log('measurements is ', measurements);
    var updated = false;
    measurements.forEach(function(measurement, index){
      if(measurement[obj.key].getTime() === obj.value.getTime()){
        measurements.splice(index, 1, updatedMeasurement);//remove the old measurement and replace with the correct one
        updated = true;
      }
    });
    console.log('measurements is now ', measurements);
    return updated;
  },

  findAndUpdate: function findAndUpdate(obj, updatedMeasurement){
    console.log('measurements is ', measurements);
    var updated = false;
    measurements.forEach(function(measurement, index){
      if(measurement[obj.key].getTime() === obj.value.getTime()){
        //for each property in the updatedMeasurement, let's replace the property value in the original measurement
        for(var p in updatedMeasurement){
          if(p !== 'timestamp'){
            measurement[p] = updatedMeasurement[p];
          }
        }
        updated = true;
      }
    });
    console.log('measurements is now ', measurements);
    return updated;
  },

  findAndDelete: function findAndDelete(obj){
    console.log('measurements is ', measurements);
    var updated = false;
    measurements.forEach(function(measurement, index){
      if(measurement[obj.key].getTime() === obj.value.getTime()){
        measurements.splice(index, 1);//remove the old measurement
        updated = true;
      }
    });
    console.log('measurements is now ', measurements);
    return updated;
  },

  calculateStats: function calculateStats(obj){
    var findMin = function findMin(metric){
      var fromDateTime = (new Date(obj.fromDateTime)).getTime();
      var toDateTime = (new Date(obj.toDateTime)).getTime();

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
      var fromDateTime = (new Date(obj.fromDateTime)).getTime();
      var toDateTime = (new Date(obj.toDateTime)).getTime();

      //ensure the array is filtered by the timestamp range
      var filteredArr = measurements.filter(function(measurement){
        return measurement[metric] && measurement.timestamp.getTime() >= fromDateTime && measurement.timestamp.getTime() < toDateTime;
      });

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
      var fromDateTime = (new Date(obj.fromDateTime)).getTime();
      var toDateTime = (new Date(obj.toDateTime)).getTime();

      //ensure the array is filtered by the timestamp range
      var filteredArr = measurements.filter(function(measurement){
        return measurement[metric] && measurement.timestamp.getTime() >= fromDateTime && measurement.timestamp.getTime() < toDateTime;
      });

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