const { AuthenticationError } = require('apollo-server-errors');
const Proposition = require('../../Models/Proposition');
const CheckAuth= require ('../../Util/Check-Auth')
module.exports ={
    Query : {
    async getPropositions(){
     try {
     const Propositions = await Proposition.find().sort({createdAt: -1});
     return Propositions;
    }catch (err) {
  throw new Error(err);
    }
  },
  async getProposition(_,{propositionID}){
    try {
const proposition = await proposition.findById(propositionID);
if (proposition) {
  return proposition;
} else {
  throw new Error('Propostion not found')
}
    } catch (err) {
      throw new Error(err)
    }
  }
    },
    Mutation : {
      async createProposition(_,{date,type,body},context) {
const user = CheckAuth(context);
if (body.trim() === '') {
  throw new Error('Proposition body must not be empty');
}


const newProposition = new Proposition({
  body,
  date : new Date().toISOString(),
  type,
  user: user.id,
username:user.username,
createdAt: new Date().toISOString()
});
const proposition = await newProposition.save();
return proposition;
      },
      async deleteProposition(_,{propositionID},context) {
        const user = CheckAuth(context);
        try {
          const proposition = await Proposition.findById(propositionID);
          if (user.username === proposition.username) {
            await proposition.delete();
            return 'Proposition deleted successfuly';
          } else {
            throw new AuthenticationError('Action not allowed');
          }
        } catch (err) {
          throw new Error(err);
        }
      },
      async updateProposition(_,{propositionID,body,date,type},context) {
        const user = CheckAuth(context);
        try {
          const proposition = await Proposition.findById(propositionID);
          if (user.username === proposition.username) {
            await proposition.update({body,date,type})
            return proposition;
          } else {
            throw new AuthenticationError('Action not allowed');
          }
        } catch (err) {
          throw new Error(err);
        }
      },voteProposition : async (_, { propositionID,},context) => {
        const {username} = CheckAuth(context);
        const proposition = await Proposition.findById(propositionID);
        if (proposition){
            if (proposition.votes.find((vote) => vote.username === username)){
                proposition.votes = proposition.votes.filter((vote) => vote.username !== username);
            } else {
                proposition.votes.push ({ 
                username,
                createdAt : new Date().toISOString()
            })
            }
            await proposition.save();
            return proposition;
        } else {
            throw new UserInputError('Proposition not found');
        }
                }
    }

  };