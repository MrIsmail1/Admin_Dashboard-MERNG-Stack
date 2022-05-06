const {model,Schema} = require('mongoose');

const ptypeSchema = new Schema({
    value : String,
    label : String,
    createdAt : String,
})
module.exports = model("Ptype",ptypeSchema);