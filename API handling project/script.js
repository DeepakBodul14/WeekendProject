document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');

    const getWeatherBtn = document.getElementById('get-weather-btn');

    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    const API_KEY = '5f56d525d1619d0a2cd2eac4ce55588e'; // Replace with your OpenWeatherMap API key


    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();

        if (!city) return;

        try {
            const weatherData = await fetchWeatherInfo(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error("Error fetching weather info:", error);
            showError();
        }



    })


    async function fetchWeatherInfo(city) {

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        console.log("Fetch response:", response);
        if (!response.ok) {
            throw new Error('City not found');
        }

        // convert into json object
        const data = await response.json();
        return data;
    }

    function displayWeatherInfo(displayData) {
        console.log("Displaying weather info:", displayData);
        const { name, main, weather } = displayData;
        cityName.textContent = name;
        temperature.textContent = `Temperature: ${main.temp} °C`;
        description.textContent = `Description: ${weather[0].description}`;
        console.log("City Name:", name);
        weatherInfo.classList.remove('hidden');
        weatherInfo.classList.add('visible');


    }

    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

})