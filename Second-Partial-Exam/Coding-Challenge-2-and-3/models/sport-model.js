const mongoose = require( 'mongoose' );
const uuid = require( 'uuid' );

/* Your code goes here */
const sportSchema = mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    num_players: {
        type: Number,
    }

})

let sportModel = mongoose.model('sports', sportSchema)

const Sport = {
    deleteSport: function(sportId){
        sportModel.remove(("id ==" + sportId))
        .then(response => {
            return response;
        })
        .catch(err => {
            return err;
        })
    }
}
module.exports = {
    Sport
};