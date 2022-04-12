let nextPlanet;
let nextPlanetBtn = document.getElementById('next-planet');
let previousPlanet;
let previousPlanetBtn = document.getElementById('previous-planet');
let goRight = document.getElementById('go-right');
let nextImg = document.getElementById('next');
let goLeft = document.getElementById('go-left');
let previousImg = document.getElementById('previous');



let allData = JSON.parse(window.localStorage.getItem('allData'));
let planetData = JSON.parse(window.localStorage.getItem('planetData'));


currentPlanetPage(allData, planetData); //Kallar på funktionen med planetData som användaren klickat på i index.html


//GÅ TILLBAKA TILL STARTSIDAN
let goBack = document.getElementById('go-to-start-wrap');
goBack.addEventListener('click', () => {
    window.location.href = 'index.html'
})

//GÅ TILL SÖKSIDAN
let searchPage = document.getElementById('go-to-search');
searchPage.addEventListener('click', () => {
    window.location.href = 'searchPage.html';
})

//UPPDATERAR PLANETSIDAN EFTER DEN VALDA PLANETEN
async function updateUI(planetData) {
    let moons = document.getElementById('moons');
    moons.innerHTML = '';

    let pageTitle = document.querySelector('title');
    pageTitle.innerHTML = planetData.name;


    let img = document.getElementById('planet-image');


    if (planetData.name == 'Solen') {
        img.setAttribute('src', 'img/sun.png');
        previousImg.setAttribute('src', 'img/neptune.png')
        nextImg.setAttribute('src', 'img/mercury.png');
    } else if (planetData.name == 'Merkurius') {
        img.setAttribute('src', 'img/mercury.png');
        previousImg.setAttribute('src', 'img/sun.png')
        nextImg.setAttribute('src', 'img/venus.png');
    } else if (planetData.name == 'Venus') {
        img.setAttribute('src', 'img/venus.png');
        previousImg.setAttribute('src', 'img/mercury.png')
        nextImg.setAttribute('src', 'img/earth-2.png');
    } else if (planetData.name == 'Jorden') {
        img.setAttribute('src', 'img/earth-2.png');
        previousImg.setAttribute('src', 'img/venus.png')
        nextImg.setAttribute('src', 'img/mars.png');
    } else if (planetData.name == 'Mars') {
        img.setAttribute('src', 'img/mars.png');
        previousImg.setAttribute('src', 'img/earth-2.png')
        nextImg.setAttribute('src', 'img/jupiter.png');
    } else if (planetData.name == 'Jupiter') {
        img.setAttribute('src', 'img/jupiter.png');
        previousImg.setAttribute('src', 'img/mars.png')
        nextImg.setAttribute('src', 'img/saturn.png');
    } else if (planetData.name == 'Saturnus') {
        img.setAttribute('src', 'img/saturn.png');
        previousImg.setAttribute('src', 'img/jupiter.png')
        nextImg.setAttribute('src', 'img/uranus.png');
    } else if (planetData.name == 'Uranus') {
        img.setAttribute('src', 'img/uranus.png');
        previousImg.setAttribute('src', 'img/saturn.png')
        nextImg.setAttribute('src', 'img/neptune.png');
    } else if (planetData.name == 'Neptunus') {
        img.setAttribute('src', 'img/neptune.png');
        previousImg.setAttribute('src', 'img/uranus.png')
        nextImg.setAttribute('src', 'img/sun.png');
    }


    let planetName = document.getElementById('name');
    planetName.innerText = planetData.name.toUpperCase();

    let latinName = document.getElementById('latin-name');
    latinName.innerText = planetData.latinName.toLowerCase();

    let planetDesc = document.getElementById('planet-info');
    planetDesc.innerText = planetData.desc;

    let circumference = document.getElementById('circumference');
    circumference.innerText = `${planetData.circumference} km`;

    let distance = document.getElementById('distance');
    distance.innerText = `${planetData.distance} km`;
    if (planetData.id == 0) {
        distance.style.display = 'none';
        document.getElementById('km').style.display = 'none';
    } else {
        distance.style.display = 'block';
        document.getElementById('km').style.display = 'block';
    }

    let tempDay = document.getElementById('temp-day');
    tempDay.innerText = `${planetData.temp.day} °C`;

    let tempNight = document.getElementById('temp-night');
    tempNight.innerText = `${planetData.temp.night} °C`;

    if (planetData.moons.length == 0) {
        document.getElementById('moons-container').style.display = 'none'; //lägga moons-container i en variabel
    } else {
        document.getElementById('moons-container').style.display = 'block';
        planetData.moons.forEach(moon => {
            moons.innerHTML += moon + ' ';
        });
    }

}


//ÄNDRAR DATA TILL NÄSTA/FÖREGÅENDE PLANET
goRight.addEventListener('click', () => {
    currentPlanetPage(allData, nextPlanet)
})

goLeft.addEventListener('click', () => {
    currentPlanetPage(allData, previousPlanet)
})



//UPPDATERAR DEN NUVARNADE PLANETEN, SKAPAR NÄSTA/FÖREGÅEDE, SAMT KALLAR PÅ UI 
async function currentPlanetPage(data, planet) {
    let planetId = planet.id;
    let nextPlanetId = Number(planetId) + 1; //löste med hjälp av Number()
    let previousPlanetId = planetId - 1;

    //så att det går att bläddra till början från slutet och vice versa
    if (planet.id == 0) {
        previousPlanetId = 8;
    } else if (planet.id == 8) {
        nextPlanetId = 0;
    }

    for (i = 0; i < data.length; i++) {

        if (data[i].id == nextPlanetId) {
            nextPlanet = data[i];
            nextPlanetBtn.innerText = nextPlanet.name.toUpperCase();
        } else if (data[i].id == previousPlanetId) {
            previousPlanet = data[i]
            previousPlanetBtn.innerText = previousPlanet.name.toUpperCase();
        }

        if (planetId == data[i].id) {
            updateUI(planet)
        }
    }
}