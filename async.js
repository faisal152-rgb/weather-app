const apiKey = "Enter your api key";

async function getWeather(){

    const city=document.getElementById("city").value.trim();

    const loading=document.getElementById("loading");

    if(city===""){
        alert("Please enter a city name");
        return;
    }

    loading.style.display="block";

    try{

        const response=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data=await response.json();

        loading.style.display="none";

        if(!response.ok){
            throw new Error(data.message);
        }

        document.getElementById("cityName").innerHTML=data.name;

        document.getElementById("temperature").innerHTML=
        `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").innerHTML=
        data.weather[0].description;

        document.getElementById("humidity").innerHTML=
        data.main.humidity+"%";

        document.getElementById("wind").innerHTML=
        data.wind.speed+" m/s";

        document.getElementById("pressure").innerHTML=
        data.main.pressure+" hPa";

        document.getElementById("visibility").innerHTML=
        (data.visibility/1000)+" km";

        document.getElementById("weatherIcon").style.display="block";

        document.getElementById("weatherIcon").src=
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    }

    catch(error){

        loading.style.display="none";

        alert("Invalid city name",error);

    }

}

document.getElementById("city").addEventListener("keypress",function(e){

    if(e.key==="Enter"){
        getWeather();
    }

});