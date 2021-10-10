var lat = 29.74;
var long = -95.46;
// change();
var requestURl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ long +'&units=imperial&exclude=minutely,hourly&appid=d878f5584537405a3385fd42ab6df681';
var eztest = document.querySelectorAll(".head");
var List = document.querySelectorAll("ul");
var List2 = document.querySelectorAll(".listal")
var buttons = document.querySelector(".list-group")
var DateTime = luxon.DateTime;
var HUMIDITY = []
var DAYS1 = []
var DAYS2 = []
var TEMP = []
var WIND = []
var UVI = []
var dayinfo = []



function change(target){
  console.log(target);
  //resets what's in the arrays;
  TEMP.length = 0;
  WIND.length = 0;
  UVI.length = 0;
  HUMIDITY.length = 0;
  console.log(dayinfo);
  //Chicago
  if(target == "Chicago"){
  lat = 29.74
  long = -95.46
  }
  //Tokyo
  if(target == "Tokyo")
  lat = 35.68321
  long =139.80894
  //Denver
  if(target == "Denver")
  lat = 39.45
  long = 104.59

  requestURl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ long +'&units=imperial&exclude=minutely,hourly&appid=d878f5584537405a3385fd42ab6df681';
  getApi(requestURl);
  // console.log(lat);
  // console.log(long);
  // console.log(DAYS2);
}

var buttonClicker = function(event){
  var timezone = event.target.getAttribute('data-timezone');
  console.log(timezone);
  if (timezone){
    change(timezone);
  }
  
}

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        if (response.status !== 200){
          alert("their was an issue getting the data");
          console.log(response.status);
        }
        else{
        return response.json();
        }
      })
      .then(function (data) {
          DATA = data.daily
          console.log(DATA);
          console.log(data.timezone);
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
         dayinfo.push(HUMIDITY, TEMP, WIND, UVI, );

         DAYCHOPTOHEAD();
      });
  }

function DAYCHOPTOHEAD() {


console.log(DAYS1[1]);
  for (let index = 0; index < 6; index++) {
    var int = parseInt(DAYS1[index], 10)
    DAYS2.push(DateTime.fromSeconds(int).toLocaleString());
    console.log(eztest[index]);
    eztest[index].textContent = DAYS2[index];
  }
  displayinfo();
}

function displayinfo() {

  console.log(dayinfo);
// var hum = dayinfo[0][0];
// var hum2 = hum[0];
// console.log(hum);
// hum.textContent = '';
// temp.textContent = '';
// windspeed.textContent = '';
// uvindex.textContent = '';

  for (let L = 0; L < 4; L++) {
      for (let i = 0; i < 6; i++) {
        console.log(dayinfo[L][i]);

        if(L==0){
          var hum = document.createElement('p');
          hum.classList.add("listy")
          hum.textContent = ("Humidity: " + dayinfo[L][i] + "");
          List2[i].appendChild(hum);
        }

        if (L==1){
          var temp = document.createElement('p');
          temp.classList.add("listy")
          temp.textContent = ("Temp: " + dayinfo[L][i] + "°");
          List2[i].appendChild(temp);
          
        }

        if(L==2){
          var windspeed = document.createElement('p');
          windspeed.classList.add("listy")
          windspeed.textContent = ("wind: " + dayinfo[L][i] + "");
          List2[i].appendChild(windspeed);
        }


        //this is the logic to add colors to the current uvi depending on how high it is
        if(L==3){
          if(i == 0){
            var uvindex = document.createElement('div');
              if(dayinfo[L][i]<3){
              uvindex.classList.add("UVL")
              }
              if(dayinfo[L][i]>=3 && dayinfo[L][i]<6){
              uvindex.classList.add("UVM")
              }
              if(dayinfo[L][i]>=6 && dayinfo[L][i]<8){
              uvindex.classList.add("UVH")
              }
              if(dayinfo[L][i]>=8 && dayinfo[L][i]<11){
              uvindex.classList.add("UVVH")
              }
              if(dayinfo[L][i]>=11){
                uvindex.classList.add("UVE")
              }
            uvindex.textContent = ("UVI: " + dayinfo[L][i]);
            List2[i].appendChild(uvindex);
            }
          else{
          var uvindex = document.createElement('p');
          uvindex.classList.add("listy")
          uvindex.textContent = ("UVI: " + dayinfo[L][i] + "");
          List2[i].appendChild(uvindex);
          DAYS1 =[];
          }
        }


      //This is the nightmare infinite loop, leave commented or face the consequence
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
  
// getApi(requestURl)

buttons.addEventListener("click", buttonClicker)
