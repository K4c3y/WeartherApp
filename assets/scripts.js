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


let tempWeek = document.getElementsByClassName('week-temp')
let humidWeek = document.getElementsByClassName('week-humid')
let dateWeek = document.getElementsByClassName('week-date')



// storing image URL into a variable, to pull for weather image 
let imageURL = "http://openweathermap.org/img/wn/"


// creating an array of searched cities to store in local storage 

let cities = []
//...
let storedCities = JSON.parse(localStorage.getItem("CityList"));

// if not the first time access the site, load buttons based off of city search history 

if (storedCities !== null) {  

  cities = storedCities
  for (let i = 0; i < cities.length; i++) {
  let newCity = document.createElement('button')
  let newButton = document.getElementById('new-button')
  newCity.innerHTML = cities[i]
  newButton.appendChild(newCity)
  newCity.classList.add("btn", "btn-light", "button-border")

  } 
}

    //making the fetch call to show api value information 
   
 button.addEventListener('click', function () {
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=eee136595c9847438584b0855ae13a6c&units=metric')
  .then (response => response.json())
  .then(data => {

    storeCity()
    

    // getting weather data from the API 
    
    let nameValue = data['name'];
    let descValue = data['weather'][0]['description'];
    let tempValue = data['main']['temp'];
    let windValue = data['wind']['speed'];
    let humidValue = data['main']['humidity'];
    let latValue = data['coord']['lat']
    let longValue = data['coord']['lon']
    let weatherIcon = data.weather[0].icon
    console.log(weatherIcon)
    // discplaying weather values on the website 
    name.innerHTML = 'City Name: ' + nameValue + "<img src=" + imageURL + weatherIcon + '.png' + ">"
    
    temp.innerHTML = 'Temperature: ' + tempValue + '&deg;C'
    desc.innerHTML = 'Description: ' + descValue 
    wind.innerHTML = 'Wind Speed: ' + windValue + 'm/s'
    humid.innerHTML = 'Humidity: ' + humidValue + '%'
    
 


     // save searched input and create button
    storeCity()

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
    // adding color warnings to UV 
    if (displayUV >= 8) {
      uv.classList.add("bg-danger")
      uv.classList.remove("bg-warning")
      uv.classList.remove("bg-success")
    }
    // If the uv index is greater or equal to 8 the disabled button is yellow
    else if (displayUV < 8 && displayUV > 2) {
      uv.classList.add("bg-warning")
      uv.classList.remove("bg-success")
      uv.classList.remove("bg-danger")
    }
    // If the uv index is greater or equal to 8 the disabled button is green
    else {
      uv.classList.add("bg-success")
      uv.classList.remove("bg-danger")
      uv.classList.remove("bg-warning")
    }

    
   

  })
}

// function to display the weekly weather 
function displayWeeklyForcast() {
  fetch('https://api.openweathermap.org/data/2.5/forecast?q='+inputValue.value+'&appid=eee136595c9847438584b0855ae13a6c&units=metric')
  .then(response => response.json())
  .then(data => {
    let tempWeekValue;
    let humidWeekValue;
    let dateWeekValue
    let weatherWeekIcon;
    console.log(dateWeek);

    // created an array of classes to loop through the api properties to get the updated day values vs jsut the 3 hour update. 
    for (let i = 0; i < 40; i+=8) {
      tempWeekValue = data['list'][i]['main']['temp'];
      humidWeekValue = data['list'][i]['main']['humidity'];
      dateWeekValue = data['list'][i]['dt_txt'];
      weatherWeekIcon = data['list'][i]['weather'][0]['icon'];
      console.log(weatherWeekIcon)
      tempWeek[i/8].innerHTML = 'Temperature: ' + tempWeekValue + '&deg;C' + "<img src=" + imageURL + weatherWeekIcon + '.png' + ">"
      humidWeek[i/8].innerHTML = 'Humidity ' + humidWeekValue + '%';
      dateWeek[i/8].innerHTML = 'Date ' +  moment(dateWeekValue).format("YYYY-MM-DD");
    }
    
    
  
    // displaying weekly forecast weather values on the website 
    
 

  })
}


// creating array for stored cities 


// function store new cities in local storage and create matching button. 
function storeCity() {  
  cities.push(inputValue.value)
  console.log(cities)
  localStorage.setItem("CityList", JSON.stringify(cities));
    let newCity = document.createElement('button')
    let newButton = document.getElementById('new-button')
    newCity.innerHTML = cities[cities.length-1]
    newButton.appendChild(newCity)
    newCity.classList.add("btn", "btn-light", "button-border")
  
}



// let cityButtonsArray = JSON.parse(localStorage.getItem("cities")) || []
// for (let i = 0; i < cityButtonsArray.length; i++) {
//     let newCity = document.createElement("button")
//     let buttonsDiv = document.getElementById("buttons")
//     newCity.innerHTML = cityButtonsArray[i]
//     newCity.classList.add("btn", "border", "btn-block", "mt-0", "text-left", "city")
//     newCity.setAttribute("value", cityButtonsArray[i])
//     buttonsDiv.appendChild(newCity)

