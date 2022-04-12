const planetsUrl = 'https://fathomless-shelf-54969.herokuapp.com/bodies';

let inputSearch = document.getElementById('search');
let searchList = [];


// FETCHAR API - KALLAR PÅ FUNKTIONER //
async function getPlanets() {
    try {
        let response = await fetch(planetsUrl, {
            method: 'GET',
            headers: {
                "x-zocom": "solaris-7BTxHCyHhzIME5TI"
            }
        })
        let datas = await response.json()
        let data = datas.bodies;
        goToPlanetPage(data);
        planetSearch(data);
        return await data;


    } catch (err) {
        alert(err);
    }
}

getPlanets();


// EVENTLYSSNARE PÅ PLANETERNA --> GO TO PLANETPAGE //
async function goToPlanetPage(data) {

    window.addEventListener('click', (e) => {

        window.localStorage.setItem('allData', JSON.stringify(data)); //behöver all data för att bläddra mellan planeter på planetPage

        for (i = 0; i < data.length; i++) {
            if (e.target.id == data[i].id) { //om id på klickade planeter är lika planet-id i datan
                window.localStorage.setItem('planetData', JSON.stringify(data[i]))
                window.location.href = 'planetPage.html';
            }
        }
    })
}




// INPUT EVENTLYSSNARE- OM NAMN/LATIN INCLUDES(INPUT) --> SEARCHPAGE//
async function planetSearch(data) {

    inputSearch.addEventListener('keyup', async (e) => {

        if (e.key === 'Enter') {

            input = inputSearch.value.toLowerCase();

            for (let planet of data) {
                if (planet.name.toLowerCase().includes(input)) { //includes() är case-sensitive!
                    searchList.push(planet);
                } else if (planet.latinName.toLowerCase().includes(input)) {
                    searchList.push(planet);
                }
            }
            window.localStorage.setItem('planetList', JSON.stringify(searchList));
            window.location.href = 'searchPage.html';
        }
    })

}


// H1 EVENTLYSSNARE - ROTERAR EN PLANET I TAGET RUNT SIN OMLOPPSBANA //
let systemet = document.getElementById('solsystemet');
let currentDeg = 0
let click = 0;

systemet.addEventListener('click', () => {
    click += 1;
    currentDeg = 360;

    //varannan medsols/motsols
    if (click % 2 == 0) {
        document.getElementById(`orbit-${click}`).style.transform = `rotate(-${currentDeg}deg`;
        document.getElementById(`${click}`).style.transform = `rotate(${currentDeg}deg`;
    } else {
        document.getElementById(`orbit-${click}`).style.transform = `rotate(${currentDeg}deg`;
        document.getElementById(`${click}`).style.transform = `rotate(-${currentDeg}deg`;
    }
})