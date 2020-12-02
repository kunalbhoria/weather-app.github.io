// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// c60e21be15362fabae87b660d2dad3f4

const weatherApi ={
    key:"c60e21be15362fabae87b660d2dad3f4" ,
    address:"http://api.openweathermap.org/data/2.5/weather"
}

//getname
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keypress' , (event) => {

    if( event.keyCode == 13) {

        console.log(searchBar.value);
        getWeatherReport(searchBar.value);
        document.querySelector('#details-box').style.display = "block";
    }
});


function getWeatherReport(city){
     fetch(`${weatherApi.address}?q=${city}&appid=${weatherApi.key}&units=metric`)
    // fetch(`http://api.openweathermap.org/data/2.5/weather?q=mumbai&APPID=c60e21be15362fabae87b660d2dad3f4`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

function showWeatherReport(weather){
    console.log(weather);
    
    let city = document.getElementById('location');
    city.innerHTML= `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML= `${Math.round(weather.main.temp)}&deg;C`;
     
    let minMax = document.getElementById('min-max');
    minMax.innerHTML= `${Math.floor(weather.main.temp_min)}&deg;C (min)/${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let atmostphere = document.getElementById('atmostphere');
    atmostphere.innerHTML= `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todaydate = new Date();
    date.innerHTML= datemanager(todaydate);

    if(atmostphere.textContent == 'Sunny'){
        document.body.style.backgroundImage = "url(img/sunny.jpg)";
        document.getElementById("img").innerHTML="&#9729; ";
    } else if(atmostphere.textContent == 'Haze'){
        document.body.style.backgroundImage = "url(img/haze.jpg)";
         document.getElementById("img").innerHTML=" &#x1F324;";
    } else if(atmostphere.textContent == 'Clouds'){
        document.body.style.backgroundImage = "url(img/cloudy2.jpg)";
        document.getElementById("img").innerHTML="&#9729; ";
    } else if(atmostphere.textContent == 'Mist'){
        document.body.style.backgroundImage = "url(img/mist.jpg)";
       document.getElementById("img").innerHTML="&#9780; ";
    }
    else if(atmostphere.textContent == 'Rain'){
        document.body.style.backgroundImage = "url(img/rainy.jpg)";
        document.getElementById("img").innerHTML="&#127783; ";
    } else if(atmostphere.textContent == 'Smoke'){
        document.body.style.backgroundImage = "url(img/smoke.jpg)";
        document.getElementById("img").innerHTML="&#xf75f; ";
    } else if(atmostphere.textContent == 'Thunderstorm'){
        document.body.style.backgroundImage = "url(img/thunderstorm.jpg)";
        document.getElementById("img").innerHTML="&#9928; ";
    } else if(atmostphere.textContent == 'Clear'){
        document.body.style.backgroundImage = "url(img/clear.jpg)";
        document.getElementById("img").innerHTML="&#9728; ";
    } else if(atmostphere.textContent == 'Snow'){
        document.body.style.backgroundImage = "url(img/snow.jpg)";
        document.getElementById("img").innerHTML="&#9731; ";
    }

}

 function datemanager(datearg){
     let days = ["Sunday", "Monday" , "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

     let months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     
     let year = datearg.getFullYear();
     let month = months[datearg.getMonth()];
     let date = datearg.getDate();
     let day = days[datearg.getDay()];

     return `${day}, ${date} ${month} ${year}`;
}