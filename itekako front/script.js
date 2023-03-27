const loader = document.querySelector("#loading");

function showLoading() {
  loader.classList.add("display");
}

function hideLoading() {
  loader.classList.remove("display");
}

async function fetchAsync () {    
  showLoading();
  const response = await fetch("https://run.mocky.io/v3/7e49690a-fa76-4ac5-ac19-054f9f10d857?mocky-delay=400ms");   
  const data = await response.json();
  hideLoading();
  return data;
}

window.addEventListener('load', (event) => {
  var map = L.map('map').setView([37, 35], 2);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 15,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  fetchAsync()
  .then(function (data) {
    data.forEach((data) => {
       const {name, latitude, longitude, description} = data;
       const marker = L.marker([latitude, longitude]).addTo(map);
       marker.bindPopup(`<b> ${name} </b><br>${description}.`)
  })
    document.getElementById("mapcontainer").style.display = "none";
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('offices').innerHTML = loader;
    let result = '';
    data.forEach((data,i) => 
    {
      const {id, name, description, photo} = data;
      result +=
          `<div class="div-office-${id} office-items">
              <ul>
                  ${photo==null?`<div id="profileImage" class="div${i}">${name.charAt(0)}</div>`:
                  `<img class="circular_image" src="${photo}" alt="${name}"></img>`}
                  <li><h4> ${name}<h4></li>
                  <li> ${description}</li>
              </ul>
              <hr>
          </div>`;
     }) 
  document.getElementById('offices').innerHTML = result;
})
});

const grid= document.querySelector(".grid");

grid.addEventListener('click',function () {
  document.getElementById('offices').style.display = "flex";
  if(document.getElementById("offices").className == "offices")
   document.getElementById("offices").className = "gridclass";
   document.getElementById("mapcontainer").style.display = "none";
})

const list= document.querySelector(".list");

list.addEventListener('click',function () { 
  document.getElementById('offices').style.display = "flex";
  if(document.getElementById("offices").className == "gridclass")
   document.getElementById("offices").className = "offices";
   document.getElementById("mapcontainer").style.display = "none";
})

const maps= document.querySelector(".maps");

maps.addEventListener('click',function () {
 document.getElementById('offices').style.display = "none";
 document.getElementById("mapcontainer").style.display = "block";
 document.getElementById("mapcontainer").style.visibility = "visible";
})

