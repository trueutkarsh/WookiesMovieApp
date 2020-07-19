

const BASE_URL = "https://wookie.codesubmit.io";

export function getMovies() {

    let URL = BASE_URL + "/movies"
    let headers = new Headers();
    headers.append("Authorization", "Bearer Wookie2019");


    return fetch(URL, {
        method: 'GET',
        headers: headers
    })
    .then(response => response.json())
    .catch((error) => 
        {
            console.log(error)
        }
    )
}

export function searchMovies(entry) {

    let URL = BASE_URL + "/movies?q=" + (entry || "")
    let headers = new Headers();
    headers.append("Authorization", "Bearer Wookie2019");


    return fetch(URL, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        return response.json()
    })
    .catch((error) => 
        {
            console.log("searching error on this", entry, error)
        }
    )
}
