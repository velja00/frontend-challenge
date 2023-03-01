// remove empty space
// remove empty space
const loader = document.querySelector("#loading");
// remove empty space

function displayLoading() {
    // Name of css classes should not be named as css properties
  loader.classList.add("display");
  // This is totally wrong approach. You should never use timeout for hiding loader.
    // Hide loader when are sure that data is retrieved from backend API endpoint.
  setTimeout(() => {
      loader.classList.remove("display");
  }, 5000);
  // What will happend  with loader in cases when api call takes more or less than 5000ms? user will see loader and offices at the same time.
}

function hideLoading() {
  loader.classList.remove("display");
}
// remove useless empty line

async function fetchAsync () {    
  displayLoading();
  // response and data variables must be const, use let only in case where its needed.
  let response = await fetch("https://run.mocky.io/v3/7e49690a-fa76-4ac5-ac19-054f9f10d857?mocky-delay=400ms");
  let data = await response.json();
  return data;    
}

window.addEventListener('load', (event) => {

  var map = L.map('map').setView([37, 35], 2);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

 //
  fetchAsync()
  .then(function (data) {
      // add null  check and handle zero result (anyway you should cover case data.length === 0
    data.forEach((data) => {
        // useless id, description, photo variables
       const {id, name, description, latitude, longitude, photo} = data;
       var marker = L.marker([latitude, longitude]).addTo(map); // use const
       var place = name.split(" "); // use const
       marker.bindPopup(`<b> ${name} </b><br>Itekako office in ${place[0]}.`)
  })
  })

    // This is unacceptable. you shod NEVER call same endpoint twice retrieve totally same data.
  fetchAsync()
  .then(function (data) {
    let loader = `<div class="boxLoading"></div>`; // use const
    document.getElementById('offices').innerHTML = loader;
    let result = '';
    let i=0;  // totally useless counter forEach has index as second parameter https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    data.forEach((data) => {
      hideLoading();
      // never locate element selector in loop (foreach in this case).
      document.getElementById("mapcontainer").style.display = "none";  // how meny time  your going to hide this element? :-)  also hide element by add/rremove css class
      const {id, name, description, latitude, longitude, photo} = data; // useless variables  latitude and longitude
        // Some of offices have no image so don't  render img tag in all cases. Add condition which will check is photo is  null or not.
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
          document.getElementById('offices').innerHTML = result; // This is unacceptable. You should render result only once outside of loop (forEach)
          i++; // remove counter
  })})

});

// from this to end all code is totally useless. just think about better solution and DRY principe https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
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
    // why do you need variable div
 const div= document.getElementById('offices').innerHTML = "";
 document.getElementById("mapcontainer").style.display = "block";
 document.getElementById("mapcontainer").style.visibility = "visible";
})

