var requestURl = 'https://api.openweathermap.org/data/2.5/onecall?lat=29.74&lon=-95.46&units=imperial&exclude=minutely,hourly&appid=d878f5584537405a3385fd42ab6df681'
var eztest = document.querySelectorAll(".head");
var List = document.querySelectorAll("ul");
var DateTime = luxon.DateTime;
var HUMIDITY = []
var DAYS1 = []
var DAYS2 = []
var TEMP = []
var WIND = []
var UVI = []
var dayinfo=[]


dayinfo.push(HUMIDITY, TEMP, WIND, UVI, );


console.log(List[1]);

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        console.log(response.status);
        return response.json();
      })
      .then(function (data) {
          DATA = data.daily
          for (var i = 0; i < DATA.length; i++){
            var days = (JSON.stringify(data.daily[i].dt));
            DAYS1.push(days);
            var temp = (JSON.stringify(data.daily[i].temp.day));
            TEMP.push(temp);
            var humidity = (JSON.stringify(data.daily[i].humidity));
            HUMIDITY.push(humidity);
            var wind = (JSON.stringify(data.daily[i].wind_speed));
            WIND.push(wind);
            var uvi = (JSON.stringify(data.daily[i].uvi));
            UVI.push(uvi);
            
         }   
         DAYCHOPTOHEAD();
      });
  }

function DAYCHOPTOHEAD() {

console.log(DAYS1[1]);
  for (let index = 0; index < DAYS1.length-2; index++) {
    var int = parseInt(DAYS1[index], 10)
    DAYS2.push(DateTime.fromSeconds(int).toLocaleString());
    eztest[index].textContent = DAYS2[index];
  }
  displayinfo();
}

function displayinfo() {

  console.log(dayinfo);
var hum = dayinfo[0][0];
// var hum2 = hum[0];
console.log(hum);

  for (let L = 0; L < 4; L++) {
      for (let i = 0; i < DAYS1.length-2; i++) {
        console.log(dayinfo[L][i]);
      // while (L == 0){
      //   console.log("hey");
      // }

    }


//test 3
    // var lee = document.createElement('li');

    // lee.textContent = [HUMIDITY[L], TEMP[L], WIND[L], UVI[L]];
    
    
//test 2
    // lee.push(HUMIDITY[L])
    // lee.push(TEMP[L])
    // lee.push(WIND[L])
    // lee.push(UVI[L])



    // console.log(lee);
//test 3
    // var hum = 
    // var hot =
    // var winds =
    // var uvii =   
  }
}
  
getApi(requestURl);


