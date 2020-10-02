const fetch = require('node-fetch'); //TODO: use esm import
/* Encode a string to base 64 */
const encodeToB64 = string => {
    const binary = Buffer.from(string, 'utf8');
    return binary.toString('base64');
}
/* Endpoint */
const TOKEN_URI = 'https://accounts.spotify.com/api/token';

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

module.exports = getToken;