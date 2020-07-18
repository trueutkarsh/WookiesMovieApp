var BASE_URL = "https://wookie.codesubmit.io";
function getMovies() {
    var URL = BASE_URL + "/movies";
    return fetch(URL, {
        method: 'GET',
        headers: {
            'Authentication': 'Bearer Wookie2019',
            'Accept': 'application/json'
        }
    })
        .then(function (response) { return response.json(); })["catch"](function (error) {
        console.log(error);
    });
}
getMovies()
    .then(function (resp) {
    console.log(resp);
});
