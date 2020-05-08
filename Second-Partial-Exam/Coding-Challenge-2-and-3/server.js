const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Sport} = require('./models/sport-model')

const app = express();
app.use(jsonParser)

let sportsId = []
/* Your code goes here */
app.delete('/sports/delete', (req, res) => {
    console.log(req.body)

    if(req.body == undefined){
        res.message = "No body found";

        return res.status(406).end()
    }

    //ii
    let bodyId = req.body.id;

    if(!bodyId || bodyId == null || bodyId == undefined) {
        res.message = "No id in the body of the request";
        return res.status(406).end()
    }

    //iii
    let queryId = req.query.sportId

    if(queryId == null || queryId == undefined) {
        res.message = "No sportId in the query of the request"
        return res.status(406).end()
    }

    //iv
    if(queryId != bodyId){
        res.message = "sportId doesn't match id from body";
        return res.status(409).end()
    }

    //v
    //No se como hacerle para buscar en mongoose.
    if (false) {
        res.message = "Id is not a sport id";
        return res.status(404).end()
    }

    //vi
    Sport.deleteSport(queryId)
    .then(response => {
        return res.status(204).end()
    })
    .catch(err => {
        return res.status(500).end()
    })

    return res.status(204).end()
})

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});