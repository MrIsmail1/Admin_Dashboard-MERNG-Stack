const propositionsResolvers = require('./Propositions');
const usersResolvers = require('./Users');
const commentsResolvers = require ('./Commentaires');
const ptypeResolvers = require ('./Ptypes');
module.exports = {
    Proposition : {
nbVotes: (parent) => parent.votes.length,
nbComments:(parent) => parent.comments.length
},
    Query : {
    ...propositionsResolvers.Query,
	...usersResolvers.Query,
    ...ptypeResolvers.Query
    },
Mutation: {
    ...usersResolvers.Mutation,
    ...propositionsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...ptypeResolvers.Mutation
}
}