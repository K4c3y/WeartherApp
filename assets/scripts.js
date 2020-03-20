// setting variables for getting elements by classes. 

let button = document.querySelector('.button')
let inputValue = document.querySelector('.inputValue')
let name = document.querySelector('.name')
let desc = document.querySelector('.desc')
let temp = document.querySelector('.temp')
let date = document.querySelector('.date')
let wind = document.querySelector('.wind')
let humid = document.querySelector('.humid')
let uv = document.querySelector('.uv')
let lat = document.querySelector('.lat')
let long = document.querySelector('.long')

let descWeek = document.querySelector('.week-desc')
let tempWeek = document.querySelector('.week-temp')
let dateWeek = document.querySelector('.week-date')
let windWeek = document.querySelector('.week-wind')
let humidWeek = document.querySelector('.week-humid')
let uvWeek = document.querySelector('.week-uv')







    //making the fetch call to show api value information 
   
 button.addEventListener('click', function () {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=eee136595c9847438584b0855ae13a6c&units=metric')
  .then (response => response.json())
  .then(data => {
    // getting weather data from the API 
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'];
    let tempValue = data['main']['temp'];
    let windValue = data['wind']['speed'];
    let humidValue = data['main']['humidity'];
    let latValue = data['coord']['lat']
    let longValue = data['coord']['lon']
  
    // discplaying weather values on the website 
    name.innerHTML = 'City Name: ' + nameValue
    temp.innerHTML = 'Temperature: ' + tempValue
    desc.innerHTML = 'Description: ' + descValue
    wind.innerHTML = 'Wind Speed: ' + windValue
    humid.innerHTML = 'Humidity: ' + humidValue
   
    
    // displays UV since it requires a different URL api CALL 
    displayUV(latValue, longValue);
   // displays weekly forcast 
    displayWeeklyForcast()
    
  })
})

// Function that gets UV based on search City and displays it 
function displayUV(latValue, longValue) {
  let queryURL = 'https://api.openweathermap.org/data/2.5/uvi?&appid=eee136595c9847438584b0855ae13a6c&lat='+latValue +'&lon='+longValue 
  fetch(queryURL)
  .then(response => response.json())
  .then(data => {
   let displayUV = data.value
   // change date from ISO to standard "YYYY-MM-DD and display UV and DATE"
   date.innerHTML = 'Date: ' + moment(data.date_iso).format("YYYY-MM-DD")
   uv.innerHTML = 'UV: ' + displayUV

   // show warnings based on UV levels 
   

  })
}

// function to display the weekly weather 
function displayWeeklyForcast() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=eee136595c9847438584b0855ae13a6c&units=metric')
  .then(response => response.json())
  .then(data => {
    
    let tempWeekValue = data['list'][0]['main']['temp'];
    let humidWeekValue = data['list'][0]['main']['humidity'];
  
  
    // discplaying weather values on the website 
    
    tempWeek.innerHTML = 'Temperature: ' + tempWeekValue
    humidWeek.innerHTML = 'Humidity: ' + humidWeekValue

  })
}

