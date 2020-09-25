import fetch from 'node-fetch';
const { SPOTIFY_SECRET } = process.env;
const API_ENDPOINT = 'https://api.spotify.com/v1/users/tinynow/playlists';

exports.handler = async (event, context) => {
    return fetch(API_ENDPOINT, {
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer BQD1fNL3vAdPwVMOg3XzoEhHPuu0IL0iDq2iLc-XyTNKF2j5XSHaUkxXP7HRG1dSFUxyxTQ_tbA7uWkmNd_3mSQsH03BWTp0i0sG_wsN1AUeds05q8jLckAdDw9O57PADEhzIJmL1N3oJeB0006IfqNaMhk',
         } })
        .then(response => response.json())
        .then(data => ({
            statusCode: 200,
            body: data,
        }))
        .catch(error => ({ statusCode: 422, body: String(error) }));
};
