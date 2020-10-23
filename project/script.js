var requestURL = 'http://swapi.dev/api/people/?page=1';
var x;
var infoCard = document.querySelector('#card');

letsGo();

function letsGo() {
    var divInCont = document.querySelector('.icons-container');
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var jsonObj = request.response;
        console.log(jsonObj);
        createDivs(jsonObj);
        x = jsonObj;
        var upArrow = document.querySelector('#up');
        upArrow.addEventListener("click", up);
        var downArrow = document.querySelector('#down');
        downArrow.addEventListener("click", down);
        var infoCard = document.querySelector('#back');
        infoCard.addEventListener("click", close);
    };

    function createDivs(jsonObj) {
        divInCont.innerHTML = " ";
        for (var i = 0; i < jsonObj.results.length; i++) {
            var newDiv = document.createElement('div');
            newDiv.innerHTML = jsonObj.results[i].name;
            newDiv.id = i;
            newDiv.addEventListener("click", go);
            divInCont.appendChild(newDiv);

        }
    }

    function go() {
        $(infoCard).hide();
        var jsonObj = request.response;
        $(infoCard).fadeToggle("200");
        var idStr = this.id;
        var header = document.querySelector('#header');
        header.innerHTML = jsonObj.results[idStr].name;
        var year = document.querySelector('#year');
        year.innerHTML = jsonObj.results[idStr].birth_year;
        var gender = document.querySelector('#gender');
        gender.innerHTML = jsonObj.results[idStr].gender;

        function getPlanet(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var jsonObj = request.response;
                console.log(jsonObj.name);

                var planet = document.querySelector('#planet');
                planet.innerHTML = jsonObj.name;
            };
        }
        getPlanet(jsonObj.results[idStr].homeworld);

        function getSubtype(url) {
            var request = new XMLHttpRequest();
            request.open('GET', url);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
                var jsonObj = request.response;
                var subtype = document.querySelector('#subtype');
                if (!jsonObj) {
                    subtype.innerHTML = "its not assigned";
                } else {
                    subtype = document.querySelector('#subtype');
                    subtype.innerHTML = jsonObj.name;
                }

            };
        }
        getSubtype(jsonObj.results[idStr].species);

        var url = jsonObj.results[idStr].films;
        for (var j = 0; j < url.length; j++) {
            getMovies(jsonObj.results[idStr].films);
            function getMovies(url) {
                console.log(url);
                var request = new XMLHttpRequest();
                request.open('GET', url[j]);
                request.responseType = 'json';
                request.send();
                request.onload = function () {
                    var jsonObj = request.response;
                    var movies = document.querySelector('#movies');
                    movies.innerHTML += jsonObj.title + "<br>";
                };
            }
            movies.innerHTML = " ";
        }
    }
}

function up() {
    if (!x.previous) {
        return;
    } else {
        requestURL = x.previous;
        letsGo();
    }
}

function down() {
    if (!x.next) {
        return;
    } else {
        requestURL = x.next;
        letsGo();
    }
}

function close() {
    $(infoCard).fadeToggle("slow");
}