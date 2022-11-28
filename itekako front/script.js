

const loader = document.querySelector("#loading");


function displayLoading() {
  loader.classList.add("display");
  setTimeout(() => {
      loader.classList.remove("display");
  }, 5000);
}

function hideLoading() {
  loader.classList.remove("display");
}





async function fetchAsync () {    
  displayLoading();
  let response = await fetch("https://itk-exam-api.herokuapp.com/api/offices");   
  let data = await response.json();
  return data;    
}

window.addEventListener('load', (event) => {

  var map = L.map('map').setView([37, 35], 2);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  fetchAsync()
  .then(function (data) {
 data.forEach((data) => {
  const {id, name, description, latitude, longitude, photo} = data;
 var marker = L.marker([latitude, longitude]).addTo(map);
 var place = name.split(" ");
 marker.bindPopup(`<b> ${name} </b><br>Itekako office in ${place[0]}.`)
})
})

  fetchAsync()
  .then(function (data) {
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('offices').innerHTML = loader;
    let result = '';
    let i=0;
    data.forEach((data) => {
      hideLoading();
      document.getElementById("mapcontainer").style.display = "none";
      const {id, name, description, latitude, longitude, photo} = data;
      result +=
          `<div class="div-office-${id} office-items">
              <ul>
                  <img class="circular_image" src="${photo}" alt="${name}">
                  <div id="profileImage" class="div${i}${photo==null? ' setindex':''}">${name.charAt(0)}</div>
                  <li><h4> ${name}<h4></li>
                  <li> ${description}</li>
              </ul>
              <hr>
          </div>`;
          document.getElementById('offices').innerHTML = result;
          i++;
  })})

});


const grid= document.querySelector(".grid");
grid.addEventListener('click',function () {
  fetchAsync()
  .then(function (data) {
    hideLoading();
    document.getElementById("mapcontainer").style.display = "none";
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('offices').innerHTML = loader;
    let result = '';
    let i=0;
    data.forEach((data) => {
      const {id, name, description, latitude, longitude, photo} = data;
      result +=
          `<div class="div-office-${id} office-items">
              <ul>
              
              <img class="circular_image" src="${photo}" alt="${name}">
              <div id="profileImage" class="div${i}${photo==null? ' setindex':''} ">${name.charAt(0)}</div>
                  <li><h4> ${name}<h4></li>
                  <li> ${description}</li>
              </ul>
              <hr>
          </div>`;
          document.getElementById('offices').innerHTML = result;
  })})
  if(document.getElementById("offices").className == "offices")
   document.getElementById("offices").className = "gridclass";
})

const list= document.querySelector(".list");
list.addEventListener('click',function () { fetchAsync()
  .then(function (data) {
    hideLoading();
    document.getElementById("mapcontainer").style.display = "none";
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('offices').innerHTML = loader;
    let result = '';
    let i=0;
    data.forEach((data) => {
      const {id, name, description, latitude, longitude, photo} = data;
      result +=
          `<div class="div-office-${id} office-items">
              <ul>
                
                  <img class="circular_image" src="${photo}" alt="${name}">
                  <div id="profileImage" class="div${i} ${photo==null? ' setindex':''}">${name.charAt(0)}</div>
                  <li><h4> ${name}<h4></li>
                  <li> ${description}</li>
              </ul>
              <hr>
          </div>`;
          document.getElementById('offices').innerHTML = result;

  }) 
  })
  if(document.getElementById("offices").className == "gridclass")
   document.getElementById("offices").className = "offices";

})



const mapa= document.querySelector(".mapa");

mapa.addEventListener('click',function () {
 const div= document.getElementById('offices').innerHTML = "";
 document.getElementById("mapcontainer").style.display = "block";
})

