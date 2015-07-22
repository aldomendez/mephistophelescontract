
  // console.table(data);
  window.data = [{"SFT1":"301","SFT2":"41","SFT3":"0"},{"SFT1":"4","SFT2":"4","SFT3":"0"}];

  var pad = function(data){
    return data < 10 ? '0' + data : '' + data
  }
  var time = new Date();
  // time = new Date(time.getFullYear(),time.getMonth(),time.getDate(),14,59);
  var generateTimeinHHMI = function(time){
    if(time == null){
      throw new Error('You should pass a Date object for this to work')
    }
    var ans = time.getHours() + pad(time.getMinutes()) 
    return function(){
      return +ans
    } // regresa la hora en formato HHMI
  }
  var hr = generateTimeinHHMI(new Date())
    
  var dateDiffinHours = function(start,end){
    return ((end - start)/1000/60/60);
  }
  var createSOD = function(date, dayOffset, h, m){
    // SOD = start of day;
    // Crea la base de hora para la que se estara haciendo la verificacion.
    return new Date(date.getFullYear(),date.getMonth(),date.getDate() + dayOffset,h,m)
  }
  
  var getShift = function(date){
    var hr = generateTimeinHHMI(date)
    
    if(hr() >= 630 && hr() < 1500){
      return 1
    } else if(hr() >= 1500 && hr()<2300){
      return 2
    } else if (hr()>=2300){
      return 3
    } else if (hr() < 630){
      return 4
    }
  }
  
  var calculateTargetBasedOnShift = function calculateTargetBasedOnShift(shift, date){
    var currentShift = getShift(date)
    var startOfDate = {
      1:createSOD(date,0,6,30),
      2:createSOD(date,0,15,0),
      3:createSOD(date,0,23,0),
      4:createSOD(date,-1,23,0)
    }
    var deviceTarget = {
      1:374,
      2:352,
      3:330
    }
    if (currentShift === shift || shift === 3 && currentShift === 4){
      return Math.round(dateDiffinHours(startOfDate[currentShift],date) * 44)
    } else {
      return deviceTarget[shift]
    }
  }
  var getColor = function getColor(actual, target){
    if(actual >= target){
      return 'green'
    } else {
      return 'red'
    }
  }
  var target = function (index, date){
    var shift = index + 1
    var date = date || new Date()
    return calculateTargetBasedOnShift(shift, date)
  }

  var categories = ['1er Turno','2do Turno','3er Turno']
  var series = []
  var timeTargets = _.map([8.5,8,7.5], function(time){return time * .8});
  var numberOfMachines = _.values(data[1]);
  series.push({
    colorByPoint:true,
    name: 'Piezas por turno',
    dataLabels:{
      style:{
        fontSize:'22px'
      }
    },
    colors:_.map(_.values(data[0]),function(actualVal, index){
      getColor(actualVal, target(index, new Date()))
    }),
    data: _.map(_.values(data[0]),function(el){return +el})
  });
  // series.push({
  //   name:"Meta actual",
  //   type:'spline',
  //   dataLabels:{
  //     enabled:true,
  //     padding:10,
  //     align:'left',
  //     format:'{y} pzs',
  //     style:{
  //       fontSize:'22px'
  //     }
  //   },
  //   data:_.map(numberOfMachines,function(numberOfMachines, index){
  //     return target(numberOfMachines[index])
  //   })
  // });

  series.push({
    name:"Meta de Turno",
    type:'spline',
    dataLabels:{
      enabled:true,
      padding:10,
      align:'left',
      format:'{y} pzs',
      style:{
        fontSize:'22px'
      }
    },
    data:_.map(numberOfMachines,function(numberOfMachines, index){
      if( numberOfMachines == 0 ){numberOfMachines = null}
        // Numero de maquinas * tiempo que dura el turno * numero piezas por hora
        // return Math.round((numberOfMachines||5) * timeTargets[index] * 9)
        return Math.round(timeTargets[index]*4*11)
    })
  })


  window.series = series
  console.log( series);
  window.data = data;