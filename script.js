const temp = document.getElementById("temp");
        const place = document.getElementById("city");
        const desc = document.getElementById("desc");
        const feels_like = document.getElementById("feels_like");
        const humidity = document.getElementById("humidity");
        const speed = document.getElementById("speed");
        const input = document.querySelector("input");
        const search = document.getElementById("search");
        const image = document.getElementById("icon");
        const weatherbody = document.querySelector('.weatherbody');
        const error = document.querySelector('.error');
        document.getElementById("icon").className="fa-solid fa-cloud";
        
        async function getWeather(city){
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b73c1e0a39d7f5fc673a2b968815aa20`;
            const data = await fetch(`${url}`).then(response=>response.json());
            console.log(data);
            if(data.cod===`404`){
                console.log("error");
                weatherbody.style.display = "none";
                error.style.display="flex";
                return;
            }
            error.style.display="none";
            weatherbody.style.display = "block";
            temp.innerText=Math.round(data.main.temp-273.15)+"°C";
            place.innerText = data.name;
            desc.innerText=data.weather[0].description;
            feels_like.innerText="Feels like "+Math.round(data.main.feels_like-273.15)+"°C";
            humidity.innerText=data.main.humidity+"%";
            speed.innerText=data.wind.speed+" km/h";
            
            
            document.getElementById("icon").className="fa-solid fa-cloud";
            switch(data.weather[0].main){
                case 'Clouds':
                    image.className="fa-solid fa-cloud";
                    break;
                case 'Clear':
                    image.className="fa-solid fa-sun";
                        break;
                case 'Rain':
                    image.className="fa-solid fa-cloud-showers-heavy";
                        break;
                case 'Mist':
                    image.className="fa-solid fa-cloud-sun";
                        break;
                case 'Snow':
                    image.className="fa-regular fa-snowflake";
                        break;
                case 'Drizzle':
                    image.className="fa-solid fa-cloud-sun-rain";
                case 'Haze':
                    image.className="fa-solid fa-smog";
            }
        }

        search.addEventListener("click", ()=>{
            getWeather(input.value);
        });
