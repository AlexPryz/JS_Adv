var x;
var infoCard = document.querySelector('#card');
var requestURL = 'http://swapi.dev/api/people/?page=1';
var init = {
    method: 'GET'
};

letsGo(requestURL);

function letsGo(requestURL) {
    $(document.querySelector('info')).fadeIn("slow");

    fetch(requestURL, init)
        .then(function (resp) {
            return resp.json();
        }).then(function (data) {
            var divInCont = document.querySelector('.icons-container');
            var jsonObj = data;
            createDivs(jsonObj);
            x = jsonObj;
            if (!x.previous) {
                document.querySelector('#up-arrow').style = "border: solid grey; border-width: 0 7px 7px 0;display: inline-block; padding: 7px;";
            } else {
                document.querySelector('#up-arrow').style = "border: solid white; border-width: 0 7px 7px 0;display: inline-block; padding: 7px;";

            }
            if (!x.next) {
                document.querySelector('#down-arrow').style = "border: solid grey; border-width: 0 7px 7px 0;display: inline-block; padding: 7px;";

            } else {
                document.querySelector('#down-arrow').style = "border: solid white; border-width: 0 7px 7px 0;display: inline-block; padding: 7px;";

            }
after
            var upArrow = document.querySelector('#up');
            upArrow.addEventListener("click", up);
            var downArrow = document.querySelector('#down');
            downArrow.addEventListener("click", down);
            var infoCard = document.querySelector('#back');
            infoCard.addEventListener("click", close);

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
                document.querySelector('#card').style.display = "none";


                var header = document.querySelector('#header');
                header.innerHTML = x.results[this.id].name;

                var year = document.querySelector('#year');
                year.innerHTML = x.results[this.id].birth_year;
                var gender = document.querySelector('#gender');
                gender.innerHTML = x.results[this.id].gender;

                fetch(x.results[this.id].homeworld, {
                        method: 'GET'
                    })
                    .then(function (resp) {
                        return resp.json();
                    }).then(function (data) {
                        var planet = document.querySelector('#planet');
                        planet.innerHTML = data.name;
                    }).catch(function (err) {
                        console.error(err)
                    });

                var subtype = document.querySelector('#subtype');


                if (!x.results[this.id].species[0]) {
                    subtype.innerHTML = "n/a";;
                } else {
                    fetch(x.results[this.id].species[0], {
                            method: 'GET'
                        })
                        .then(function (resp) {
                            return resp.json();
                        }).then(function (data) {
                            subtype = document.querySelector('#subtype');
                            subtype.innerHTML = data.name;

                        }).catch(function (err) {
                            console.error(err);
                        });
                }


                for (var j = 0; j < x.results[this.id].films.length; j++) {
                    getMovies(x.results[this.id].films[j]);

                    function getMovies(url) {

                        fetch(url, init)
                            .then(function (resp) {
                                return resp.json();
                            }).then(function (data) {
                                var movies = document.querySelector('#movies');
                                movies.innerHTML += data.title + "<br>";


                            }).catch(function (err) {
                                console.error(err)
                            });
                    }
                    movies.innerHTML = " ";
                }
                $(document.querySelector('#card')).fadeIn("slow");
            }

        }).catch(function (err) {
            console.error(err)
        });
}

function up() {
    if (!x.previous) {
        return;
    } else {
        requestURL = x.previous;
        letsGo(requestURL);
    }
}

function down() {
    if (!x.next) {
        return;
    } else {
        requestURL = x.next;
        letsGo(requestURL);
    }
}

function close() {
    $(document.querySelector('#card')).fadeOut("slow");
}