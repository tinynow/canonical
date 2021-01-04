export default function extractSpotifyID(spotifyUrlUriOrId) {
    // 7vdEZv4c4MG391dfTFqN95
    // spotify:playlist:7vdEZv4c4MG391dfTFqN95
    // https://open.spotify.com/playlist/0hqMZ0dfGKiaq37NSmM1Oq?si=ovdUP4t1TwirWqlojhBX5g
    if (spotifyUrlUriOrId.startsWith('spotify:playlist:')) {
        return spotifyUrlUriOrId.substring(17);
    } else if (spotifyUrlUriOrId.startsWith('https://open.spotify.com/playlist/')) {
        const queryIndex = spotifyUrlUriOrId.indexOf('?');
        return spotifyUrlUriOrId.substring(34, queryIndex);
    } else {
        return spotifyUrlUriOrId;
    }
}