import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ weather, setWeather ] = useState({
    temp: '',
    desc: '',
    icon: '',
  });

  useEffect(() => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Busan&units=Metric&APIkey=97ecf71354bc3ae55067e705d7d8488a')
    .then(response => response.json())
    .then(data => {
      setWeather({
        temp: data.main.temp,
        desc: data.weather[0].description,
        icon: data.weather[0].icon
      })
    })  
    .catch(error => console.error(error));
  },[]);
  if (weather.icon) {
    return (
      <>
        <p>기온 : {weather.temp}°C</p>
        <p>날씨 : {weather['desc']}</p>
        <p>아이콘 string : {weather.icon}</p>
        <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="날씨 아이콘" />
      </>
    ) 
  } else {
    return <p>날씨 정보를 불러오는 중...</p>
  }
}

export default App