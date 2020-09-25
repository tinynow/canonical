exports.handler = function (event, context, callback) {
    const { SPOTIFY_SECRET } = process.env
    callback(null, {
        statusCode: 200,
        body: 'Hello, World' + SPOTIFY_SECRET,
    });
}