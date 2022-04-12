let planetSearchList = JSON.parse(window.localStorage.getItem('planetList'));
console.log(planetSearchList);

let allData = JSON.parse(window.localStorage.getItem('allData'));


let inputSearch = document.getElementById('search');
let searchList = [];

let searchWrap = document.getElementById('search-results-wrap');

let paginationWrap = document.getElementById('pagination');

let currentPage = 1;
let perPage = 3;


let noMatch = document.getElementById('no-match')


//DISPLAYA PLANETERNA FRÅN PLANETSEARCH, SKAPA ARTICLES EFTER HUR MÅNGA TRÄFFAR PERPAGE//
async function displayPlanets(array, perPage, page) {
    searchWrap.innerHTML = ""; //tömmer searchWrap för varje sida
    page--; //page börjar på 1 med arrayen kommer börja på 0, därför page - 1.

    let firstPlanet = perPage * page; // ex. för första sidan blir detta 0
    let lastPlanet = firstPlanet + perPage; //får ut så många resultat vi vill ha, ex. 0-2.

    //slice(start, end), plockar ut de valda objekten.
    let paginatedPlanets = await array.slice(firstPlanet, lastPlanet); //ex. slice(0, 3)

    //göra en for-loop för att skapa element till alla objekt i paginatedPlanets
    for (let i = 0; i < paginatedPlanets.length; i++) {
        let planet = paginatedPlanets[i];

        let planetArticle = document.createElement('article');
        planetArticle.setAttribute('id', 'planet-article');


        let planetImg = document.createElement('img');
        planetImg.setAttribute('id', 'planet-img');
        if (planet.name == 'Solen') {
            planetImg.setAttribute('src', 'img/sun.png');
        } else if (planet.name == 'Merkurius') {
            planetImg.setAttribute('src', 'img/mercury.png');
        } else if (planet.name == 'Venus') {
            planetImg.setAttribute('src', 'img/venus.png');
        } else if (planet.name == 'Jorden') {
            planetImg.setAttribute('src', 'img/earth-2.png');
        } else if (planet.name == 'Mars') {
            planetImg.setAttribute('src', 'img/mars.png');
        } else if (planet.name == 'Jupiter') {
            planetImg.setAttribute('src', 'img/jupiter.png');
        } else if (planet.name == 'Saturnus') {
            planetImg.setAttribute('src', 'img/saturn.png');
        } else if (planet.name == 'Uranus') {
            planetImg.setAttribute('src', 'img/uranus.png');
        } else if (planet.name == 'Neptunus') {
            planetImg.setAttribute('src', 'img/neptune.png');
        }

        let textDiv = document.createElement('div');

        let planetName = document.createElement('h2');
        planetName.setAttribute('id', 'planet-name');
        planetName.innerHTML = `${planet.name.toUpperCase()}  <span> ${planet.latinName.toLowerCase()}</span>`;

        let planetDesc = document.createElement('p');
        planetDesc.setAttribute('id', 'planet-desc');
        let description = planet.desc.substring(0, 140) + "...";
        planetDesc.innerHTML = description;

        planetArticle.addEventListener('click', () => {
            window.localStorage.setItem('planetData', JSON.stringify(planet));
            window.location.href = 'planetPage.html';

        })

        searchWrap.appendChild(planetArticle)
        planetArticle.appendChild(planetImg)
        planetArticle.appendChild(textDiv)
        textDiv.appendChild(planetName)
        textDiv.appendChild(planetDesc)
    }
}


//SKAPA PAGINATION EFTER LÄNGD PÅ ARRAY OCH PERPAGE//
async function createPagination(array, wrapper, perPage) {
    wrapper.innerHTML = '';

    let pageCount = Math.ceil(array.length / perPage); //avrunda uppåt för att få med alla planeter på sidorna. 

    for (i = 1; i < pageCount + 1; i++) { // vill att första knappen ska ha 1 som pageNum
        let button = await createBtn(i, array); //kallar på createBtn funktionen för varje sida
        wrapper.appendChild(button);
    }
    if (pageCount < 2) {
        wrapper.style.display = 'none';
    } else {
        wrapper.style.display = 'block';
    }
}

//SKAPA KNAPPARNA I PAGINATIONEN//
async function createBtn(pageNum, array) {
    let btn = document.createElement('button');

    btn.innerText = pageNum;

    if (currentPage == pageNum) { //gör att knappen på första sidan får styling som .active.
        btn.classList.add('active');
    }

    btn.addEventListener('click', () => {
        currentPage = pageNum;
        displayPlanets(array, perPage, currentPage);

        let currentBtn = document.querySelector('.active'); // hittar den aktiva sidan
        currentBtn.classList.remove('active'); //tar bort classen

        btn.classList.add('active'); //sätter klassen active på den klickade knappen
    })

    return btn;
}


displayPlanets(planetSearchList, perPage, currentPage);
createPagination(planetSearchList, paginationWrap, perPage);



//PLANETSÖK EVENTLYSSNARE PÅ INPUT//
async function planetSearch(data) {

    inputSearch.addEventListener('keyup', async (e) => {
        searchList = []; //tömmer listan för nästa sök

        currentPage = 1; //återställer currentPage för nytt sök
        if (e.key === 'Enter') {

            input = inputSearch.value.toLowerCase();
            let foundPlanet;
            let includesInput = false;

            if (input.toLowerCase() == 'alien') {
                document.getElementById('alien').style.animation = 'alienDance 10s ease-in 0s';
            }

            for (i = 0; i < data.length; i++) {

                if (data[i].name.toLowerCase().includes(input)) { //includes() är case-sensitive!
                    includesInput = true;
                    foundPlanet = data[i];
                    searchList.push(foundPlanet);

                } else if (data[i].latinName.toLowerCase().includes(input)) {
                    includesInput = true;
                    foundPlanet = data[i];
                    searchList.push(foundPlanet);
                }
            }

            if (includesInput) {
                noMatch.style.display = 'none';
                displayPlanets(searchList, perPage, currentPage);
                createPagination(searchList, paginationWrap, perPage);

            }
            if (!includesInput) {
                noMatch.style.display = 'block';
                noMatch.innerHTML = `Det finns ingen himlakropp med namet "${input}" i vårat solsystem, testa igen!`
            }
        }
    })
}

planetSearch(allData);


//GÅ TILBAKA TILL START
let goBack = document.getElementById('go-to-start-wrap');
goBack.addEventListener('click', () => {
    window.location.href = 'index.html'
})