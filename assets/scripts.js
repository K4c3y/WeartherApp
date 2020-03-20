

// Using API

// Setting the Api key to a variable 
let APIkey = 'eee136595c9847438584b0855ae13a6c'





// This .onclick function will trigger the AJAX Call
document
  .getElementById('find-city')
  .addEventListener('click', function (event) {
    // event.preventDefault() can be used to prevent an event's default behavior.
    // Here, it prevents the submit button from trying to submit a form when clicked
    event.preventDefault()

    // Here we grab the text from the input box
    let cityTitle = document.getElementById('city-input').value

    // Here we construct our URL
   
    let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityTitle + '&appid=' + APIkey

    //making the fetch call to show api value information 
   let cityView = document.getElementById('city-view')
    fetch(queryURL)
    .then (function (response) {
      return response.json()
    })
    .then(function (city) {
        console.log(city.name)
        cityView.innerHTML = city.name
        
    })


  })