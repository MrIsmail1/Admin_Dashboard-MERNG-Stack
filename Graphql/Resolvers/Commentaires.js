const { UserInputError } = require('apollo-server-errors');
const Proposition = require('../../Models/Proposition');
const CheckAuth= require ('../../Util/Check-Auth');

module.exports = {
    Mutation: {
      createComment: async (_, { propositionID, body }, context) => {
        const { username } = CheckAuth(context);
        if (body.trim() === '') {
          throw new UserInputError('Empty comment', {
            errors: {
              body: 'Comment body must not empty'
            }
          });
        }
  
        const proposition = await Proposition.findById(propositionID);
  
        if (proposition) {
          proposition.comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString()
          });
          await proposition.save();
          return proposition;
        } else throw new UserInputError('Proposition not found');
      },
    deleteComment: async (_, { propositionID, commentID }, context) => {
        const { username } = CheckAuth(context)
        const proposition = await Proposition.findById(propositionID);
        if (proposition) {
          const commentIndex = proposition.comments.findIndex((c) => c.id === commentID);
          if (proposition.comments[commentIndex].username === username) {
              proposition.comments.splice(commentIndex,1);
              await proposition.save();
              return proposition;
          } else {
              throw new AuthenticationError('Action is not allowed');
          }
        } else {
            throw new UserInputError('Proposition not found');
        }
    }
    } 
}