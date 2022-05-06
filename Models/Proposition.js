const {model,Schema} = require('mongoose');

const propositionSchema = new Schema ({
    body : String,
    date : String,
    type : String, 
    createdAt : String,
    username : String,
    comments : [{
        body: String,
        username : String,
        createdAt : String
    }],
    votes : [{
        username: String,
        createdAt:String
    }],
    user : {
        type:Schema.Types.ObjectId,
        ref:'users'
    },
});
module.exports = model('Proposition' ,propositionSchema); 