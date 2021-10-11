var lat;
var long;
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
var DAYS3 = []
var TEMP = []
var WIND = []
var UVI = []
var dayinfo = []
var uvindex;
var windspeed;
var temp;
var hum;
var countrysplit = "";

function reset(){
  DAYS1.length = 0;
  DAYS2.length = 0;
  TEMP.length = 0;
  WIND.length = 0;
  UVI.length = 0;
  HUMIDITY.length = 0;
  for (let dex = 0; dex < List2.length; dex++) {
    List2[dex].innerHTML = '';
    eztest[dex].innerHTML = '';
       
 }
 console.log(DAYS1);
 console.log(DAYS2);
}

function change(target){
  console.log(target);
  //resets what's in the arrays;
  reset();


  console.log(uvindex);
  // for (let i = 0; i < 6; i++){
  // uvindex[i].textContent = '';
  // windspeed[i].textContent = '';
  // temp[i].textContent = '';
  // hum[i].textContent = '';
  // }

  console.log(dayinfo);
  //Chicago
  if(target == "Chicago"){
    lat = 41.88425
    long = -87.63245
  }
  //Tokyo
  if(target == "Tokyo"){
    lat = 35.68321
    long = 139.80894
  }
  //Denver
  if(target == "Denver"){
    lat = 39.73
    long = -104.989
  }
  // New York
  if (target == "NY"){
    lat = 40.71455
    long = -74.00712
  }
    // houston
  if (target == "Sydney"){
    lat = -33.8696
    long = 151.20695
  }
      // Moscow
  if (target == "Moscow"){
    lat = 55.75697
    long = 37.61502
  }
    // Reyjavik
  if (target == "Reykjavík"){
    lat = 64.14721
    long = -21.9424
  }
      // london
  if (target == "London"){
    lat = 51.500153
    long = -0.1262362
  }
  if (target == "Toronto"){
    lat = 43.6487
    long = -79.38544
  }
  if (target == "Juneau"){
    lat = 58.300323
    long = -134.41763
  }
  if (target == "Monterrey"){
    lat = 25.6828
    long = -100.31164
  }
  if(target == "Tegucigalpa"){
    lat = 14.10576
    long = -87.2042
  }

  requestURl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ long +'&units=imperial&exclude=minutely,hourly&appid=d878f5584537405a3385fd42ab6df681';
  console.log(lat)
  console.log(long);
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
          alert("There was an issue getting your data, try again later");
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
            console.log(data.timezone);
         }  
         dayinfo.push(HUMIDITY, TEMP, WIND, UVI, );

         DAYCHOPTOHEAD(data.timezone);
      });
  }

function DAYCHOPTOHEAD(timezone) {
  displayinfo();
  countrysplit = timezone.split("/");

  console.log(city);


  //doesn't convert to set timezone
  for (let index = 0; index < 6; index++) {

    // var int = parseInt(DAYS1[index], 10)
    // DAYS2.push(DateTime.fromSeconds(int).toLocaleString());
    // // console.log(eztest[index]);
    // eztest[index].textContent = DAYS2[index];

    //test to convert to timezone
    var tint = parseInt(DAYS1[index], 10);
    var overrideZone = DateTime.fromSeconds(tint, { zone: timezone });
    console.log(overrideZone.toLocaleString());
    DAYS2.push(countrysplit[1] +" "+ overrideZone.toLocaleString());
    eztest[index].textContent = DAYS2[index];

  }
  console.log(DAYS3);
  
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
        // console.log(dayinfo[L][i]);

        if(L==0){
          hum = document.createElement('p');
          hum.classList.add("listy")
          hum.textContent = ("Humidity: " + dayinfo[L][i] + "%");
          List2[i].appendChild(hum);
        }

        if (L==1){
          temp = document.createElement('p');
          temp.classList.add("listy")
          temp.textContent = ("Temp: " + dayinfo[L][i] + "°");
          List2[i].appendChild(temp);
          
        }

        if(L==2){
          windspeed = document.createElement('p');
          windspeed.classList.add("listy")
          windspeed.textContent = ("Wind: " + dayinfo[L][i] + "MPH");
          List2[i].appendChild(windspeed);
        }


        //this is the logic to add colors to the current uvi depending on how high it is
        if(L==3){
          if(i == 0){
             uvindexmain = document.createElement('div');
             uvindextext = document.createElement('div');
             uvindex = document.createElement('div');
             uvindexmain.classList.add("uvblock")
              if(dayinfo[L][i]<3){
              uvindex.classList.add("UVL", "w")
              }
              if(dayinfo[L][i]>=3 && dayinfo[L][i]<6){
              uvindex.classList.add("UVM", "w")
              }
              if(dayinfo[L][i]>=6 && dayinfo[L][i]<8){
              uvindex.classList.add("UVH", "w")
              }
              if(dayinfo[L][i]>=8 && dayinfo[L][i]<11){
              uvindex.classList.add("UVVH", "w")
              }
              if(dayinfo[L][i]>=11){
                uvindex.classList.add("UVE","w")
              }
            uvindextext.textContent = "UV index: "
            uvindex.textContent = (dayinfo[L][i]);
            uvindexmain.appendChild(uvindextext)
            uvindexmain.appendChild(uvindex);
            List2[i].appendChild(uvindexmain);
            }
          else{
          uvindex = document.createElement('p');
          uvindex.classList.add("listy")
          uvindex.textContent = ("UVI: " + dayinfo[L][i] + "");
          List2[i].appendChild(uvindex);
          
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
//Omar D. Ramirez