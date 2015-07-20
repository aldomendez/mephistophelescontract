
  // console.table(data);
  window.data = [{"SFT1":"301","SFT2":"41","SFT3":"0"},{"SFT1":"4","SFT2":"4","SFT3":"0"}];

  pad = function(data){
    return data < 10 ? '0' + data : '' + data
  }
  var time = new Date();
  // time = new Date(time.getFullYear(),time.getMonth(),time.getDate(),14,59);
  var generateTimeinHHMI = function(time){
    if(time == null){
      throw new Error('You should pass a Date object for this to work')
    }
    return function(){
      return time.getHours() + pad(time.getMinutes())
    } // regresa la hora en formato HHMI
  }
  hr = generateTimeinHHMI(new Date())
    
  var normalizedTarget = function(start,end,inc){
    return Math.round(((end - start)/1000/60/60) * inc);
  }
  createSOD = function(date, dayOffset, h, m){
    // SOD = start of day;
    // Crea la base de hora para la que se estara haciendo la verificacion.
    return new Date(date.getFullYear(),date.getMonth(),date.getDate() + dayOffset,h,m)
  }
  target = function (numberOfMachines){
    var date = new Date()
    if(hr() > 630 && hr() < 1500){
      sod= createSOD(date,0,6,30);
      return normalizedTarget(sod, time, numberOfMachines * 11)
    } else if(hr()>1500 && hr()<2300){
      sod= createSOD(date,0,15,0)
      return normalizedTarget(sod, time, numberOfMachines * 11)
    } else if (hr()>2300){
      sod= createSOD(date,0,23,0)
      return normalizedTarget(sod, time, numberOfMachines * 11)
    } else if (hr() < 630){
      sod= createSOD(date,-1,23,0)
      return normalizedTarget(sod, time, numberOfMachines * 11)
    }
  }

  categories = ['1er Turno','2do Turno','3er Turno']
  series = []
  timeTargets = _.map([8.5,8,7.5], function(time){return time * .8});
  numberOfMachines = _.values(data[1]);
  series.push({
    colorByPoint:true,
    name: 'Piezas por turno',
    dataLabels:{
      style:{
        fontSize:'22px'
      }
    },
    colors:_.map(_.values(data[0]),function(actualVal, index){
      if(target(4) < actualVal){
        return 'green'
      } else {
        return 'red'
      }
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