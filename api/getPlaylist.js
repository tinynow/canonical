const fetch = require('node-fetch'); //TODO: use esm import
/* Encode a string to base 64 */
const encodeToB64 = string => {
    const binary = Buffer.from(string, 'utf8');
    return binary.toString('base64');
}
/* Endpoints */
const TOKEN_URI = 'https://accounts.spotify.com/api/token';
const SPOTIFY_ROOT_URI = 'https://api.spotify.com/v1/';

/* Get a token from developer tinynow's canonical spotify app */
/* tinynow's credentials stored in netlify */
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;
const TOKEN_AUTH = `Basic ${encodeToB64(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`)}`
const TOKEN_HEADER_OPTIONS = {
    'Authorization': TOKEN_AUTH,
    'Content-Type': 'application/x-www-form-urlencoded',
}
const TOKEN_BODY = new URLSearchParams();
TOKEN_BODY.append('grant_type', 'client_credentials');

const TOKEN_REQUEST_OPTIONS = {
    method: 'POST',
    headers: TOKEN_HEADER_OPTIONS,
    body: TOKEN_BODY,
    redirect: 'follow',
};

const getToken = async () => {
    const response = await fetch(TOKEN_URI, TOKEN_REQUEST_OPTIONS);
    const text = await response.text();
    return JSON.parse(text);
};

const getPlaylist = ({ access_token, token_type }, playlistId) => {
    const playlistUri = `${SPOTIFY_ROOT_URI}playlists/${playlistId}`;
    const auth = `${token_type} ${access_token}`
    const headers = {
        'Authorization': auth,
    }
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };
    return fetch(playlistUri, requestOptions)
        .then(response => response.text());

}

exports.handler = async (event, context) => {
    const { playlistId } = event.queryStringParameters;
    return getToken()
        .then(result => getPlaylist(result, playlistId))
        .then(result => ({
            statusCode: 200,
            body: result,
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};