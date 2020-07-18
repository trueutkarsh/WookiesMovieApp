

const BASE_URL = "https://wookie.codesubmit.io";

export default function getMovies() {

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
