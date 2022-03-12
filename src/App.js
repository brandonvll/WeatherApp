import axios from 'axios';
import './App.css';
import {useEffect, useState} from 'react';
import img from './imagenes/Nube.png'



function App() {

    const [weather, setWeather] = useState({})
    const [Degrees, setDegrees] = useState(false);
    const success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;  
    
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=fe633c61aab44476648bf9b620645ce4`)
        .then(res => setWeather(res.data));
  }
  useEffect(() => {
       navigator.geolocation.getCurrentPosition(success);
    }, [])

    console.log(weather);

  const changeName = () => {
     if(!Degrees){
      setDegrees(true);
     } else{
      setDegrees(false);
     }
    
  };

  const celsius = Math.round(weather.main?.temp)/5;
  const farenheit = Math.round(weather.main?.temp)*5;

  return (
    
      <div className = "App">
          <div className="slide-container">
  <div className='wrapper'>
    <div className='card barbarian'>
      <div className='card__image card__image'>
      <img src={img} alt="imagen" />
      </div>  
         <div className='card__unit-name'><h1>Weather App</h1>
            <div >City {weather.name},</div>
              <img src ={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="imagen2"></img>
         </div>
         {(!Degrees) ? (
           <h3>{celsius}°C</h3>
         ):(
          <h3>{farenheit}°F</h3>
         )}
          <div className='card__unit-name'> 
          <button onClick={changeName}>
              Change to {!Degrees ? "Farenheit" : "Celsius"}
            </button>
          </div>

        
      <div className="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
        <div className="one-third">
          <div className="stat">{weather.wind?.speed}<sup>m/s</sup></div>
          <div className="stat-value">Wind Speed</div>
        </div>

        <div className="one-third">
          <div className="stat">{weather.clouds?.all}<sup>%</sup></div>
          <div className="stat-value">Clouds</div>
        </div>

        <div className="one-third no-border">
          <div className="stat">{weather.main?.pressure}<sup>mb</sup></div>
          <div className="stat-value">Pressure</div>
        </div>

      </div>

    </div> 
   </div>
  </div> 
</div> 
  
  );
}
export default App;
