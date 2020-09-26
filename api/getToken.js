const fetch = require('node-fetch');
const encodeToB64 = string => {
    const binary = Buffer.from(string, 'utf8');
    return binary.toString('base64');
}

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/users/tinynow/playlists';

const credentials = `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`;
const basicAuth = `Basic ${encodeToB64(credentials)}`
const headers = {
    'Authorization': basicAuth,
    'Content-Type': 'application/x-www-form-urlencoded',
}

const urlencoded = new URLSearchParams();
urlencoded.append('grant_type', 'client_credentials');
const tokenRequestOptions = {
    method: 'POST',
    headers: headers,
    body: urlencoded,
    redirect: 'follow',
};


const fetchDataFromSpotify = async result => { 
    // "access_token": "BQDPYwJsh..GMEdA", "token_type": "Bearer", "expires_in": 3600
    const { access_token, token_type } = JSON.parse(result);
    const auth = `${token_type} ${access_token}`
    const headers = {
       'Authorization': auth,
    }
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };
    //TODO: abstract for other endpoints
    return fetch(PLAYLIST_ENDPOINT, requestOptions)
        .then(response => response.text());
}

exports.handler = async (event, context) => {
    return fetch(TOKEN_ENDPOINT, tokenRequestOptions)
        .then(response => response.text())
        .then(result => fetchDataFromSpotify(result))
        .then(result => ({
            statusCode: 200,
            body: result,
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};




