/* Import faunaDB sdk */
const faunadb = require('faunadb')
const q = faunadb.query
const createSingleTrack = data => q.Create(q.Collection('Tracks'), { data });
const createManyTracks = data => q.Map(data, q.Lambda('track', q.Create(
    q.Collection('Tracks'),
    { data: q.Var('track') }
)))


exports.handler = async (event, context) => {
    /* configure faunaDB Client with our secret */
    const client = new faunadb.Client({
        secret: process.env.FAUNADB_SERVER_SECRET,
    })
    /* parse the string body into a useable JS object */
    const data = JSON.parse(event.body)
    console.log('Function `tracksCreate` invoked', data)

    /* construct the fauna query */
    return client.query(Array.isArray(data) ? createManyTracks(data) : createSingleTrack(data))
        .then((response) => {
            console.log('success', response)
            /* Success! return the response with statusCode 200 */
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            }
        }).catch((error) => {
            console.log('error', error)
            /* Error! return the error with statusCode 400 */
            return {
                statusCode: 400,
                body: JSON.stringify(error),
            }
        })
}
