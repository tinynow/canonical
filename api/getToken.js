const fetch = require('node-fetch');
const encodeToB64 = string => {
    const binary = Buffer.from(string, 'utf8');
    return binary.toString('base64');
}

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
// const PLAYLIST_ENDPOINT = 'https://api.spotify.com/v1/users/tinynow/playlists';

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
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
};


exports.handler = async (event, context) => {
    return fetch(TOKEN_ENDPOINT, tokenRequestOptions)
        .then(response => response.text())
        .then(result => ({
            statusCode: 200,
            body: result,
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};




