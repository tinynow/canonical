const fetch = require('node-fetch'); //TODO: use esm import
const getToken = require('./getToken');

/* Endpoint */
const SPOTIFY_ROOT_URI = 'https://api.spotify.com/v1/';

const getPlaylist = ({ access_token, token_type }, playlistId) => {
    const playlistUri = `${SPOTIFY_ROOT_URI}playlists/${playlistId}/tracks`;
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