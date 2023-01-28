// Posts data to url using fetch
// Returns a promsise
export function postData(url, data, token = '') {
    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }).then((response) => {
        // checking if there is an error
        return response.json();
    });
}

// Fetches data (GET)
// Takes in a url that's the path we're getting from
// Takes in a token to make sure the user is signed in
// Shows an error modal to the user on failure
export function getData(url, token) {
    return fetch(url, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
}

// Fetches data (PUT)
// Takes in a url that's the path we're updating
// Takes in data, the information that is being changed
// Takes in a token to make sure the user is signed in
// Shows an error modal to the user on failure
export function updateData(url, data, token) {
    return fetch(url, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }).then((response) => {
        return response.json();
    });
}

// Deletes data (DELETE)
// Takes in a url to whatever information we're deleting
// Takes in a token to make sure the user is signed in
// Shows an error modal to the user on failure
export function deleteData(url, token) {
    return fetch(url, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then((response) => {
        // checking if there is an error
        return response.json();
    });
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// Calculate expected score of A in a match against B
//    :param A: Elo rating for player A
//    :param B: Elo rating for player B
export function expected(A, B) {
    return 1 / (1 + 10 ** ((B - A) / 400));
}

// Calculate the new Elo rating for a player
//     :param old: The previous Elo rating
//     :param exp: The expected score for this match
//     :param score: The actual score for this match
//     :param k: The k-factor for Elo (default: 32)
export function elo(old, exp, score, k = 32) {
    return old + k * (score - exp);
}

export function calculateRank(jokes) {
    let sortedByElo = jokes.sort((a, b) => {
        return b.ELO - a.ELO;
    });

    sortedByElo.forEach((joke, n) => {
        if (joke.PreviousRank === joke.Rank) {
            joke.PreviousRank = joke.Rank;
        }
        joke.Rank = n + 1;
    });

    return sortedByElo;
}
