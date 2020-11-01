const fetch = require('node-fetch'); //TODO: use esm import
const getToken = require('./getToken');

/* Endpoint */
const SPOTIFY_ROOT_URI = 'https://api.spotify.com/v1/';
const params = new URLSearchParams();
const fields = 'items(added_by.id,track(name,href,duration_ms,external_urls,id,preview_url,uri,album(external_urls,href,id,images,releaseDate,uri),artist(external_urls,href,id,name,uri)))';
params.append('fields', fields);



const getPlaylist = async ({ access_token, token_type }, playlistId) => {
    const playlistUri = `${SPOTIFY_ROOT_URI}playlists/${playlistId}?market=US`;
    // const playlistTracksUri = `${playlistUri}/tracks?${params}`;
    const auth = `${token_type} ${access_token}`
    const headers = {
        'Authorization': auth,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    const requestOptions = {
        method: 'GET',
        headers: headers,
    };
    const playlist = await fetch(playlistUri, requestOptions)
        .then(response => response.json());
    // const { items } = await fetch(playlistTracksUri, requestOptions)
    //     .then(response => response.json());
    
    return playlist;
}

exports.handler = async (event) => {
    const { playlistId } = event.queryStringParameters;
    return getToken()
        .then(result => getPlaylist(result, playlistId))
        .then(data => ({
            statusCode: 200,
            body: JSON.stringify(data),
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};