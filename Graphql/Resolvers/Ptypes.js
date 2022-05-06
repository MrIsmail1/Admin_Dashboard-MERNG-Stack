const { AuthenticationError } = require('apollo-server-errors');
const CheckAuth= require ('../../Util/Check-Auth')
const Ptype = require('../../Models/Ptype');
module.exports = {
    Query : {
        async getPtypes() {
            try {
            const ptypes = await Ptype.find().sort({createdAt:-1})
        return ptypes;
        }
        catch(err) {
            throw new Error(err);
              }
        }
    },
    Mutation : {
        async createPtype (_,{value,label},context) {
            const user = CheckAuth(context);
            if (value.trim() === '') {
                throw new Error('Proposition type name must not be empty');
              }
            if (label.trim() === '') {
                throw new Error('Proposition type label must not be empty');
              }
            const newType = new Ptype ({
                value,
                label,
                createdAt: new Date().toISOString()
            })
            const ptype = await newType.save();
            return ptype;
        }
    }
}
