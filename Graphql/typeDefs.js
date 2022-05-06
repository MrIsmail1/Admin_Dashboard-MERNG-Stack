const {gql} = require('apollo-server');
module.exports = gql`
  type Proposition {
    id: ID!
    body: String!
    date: String
    type: String!
    username: String!
    comments: [Comment]!
    votes:[Vote]!
    nbVotes: Int!
    nbComments: Int!
    createdAt: String!
}
type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Vote {
    id: ID!
    createdAt: String!
    username: String!
  }
  type Ptype {
    id: ID!
    value: String!
    label: String!
    createdAt: String!
  }
type User {
    id: ID!
    token: String!
    username: String!
    email: String!
    createdAt: String!
  } 
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
	  getUsers : [User]
    getPropositions : [Proposition]
    getProposition(propositionId:ID!): Proposition
    getPtypes : [Ptype]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username:String!,password:String!):User!
    createProposition(body:String!,date:String!,type:String!): Proposition!
    updateProposition(propositionID:ID!,body:String,date:String, value:String): Proposition!
    deleteProposition(propositionID:ID!):String!
    createComment(propositionID:ID!,body:String!): Proposition!
    createPtype(value:String!,label:String!): Ptype! 
    deleteComment(propositionID:ID!,commentID:String!):Proposition!
    voteProposition(propositionID:ID!):Proposition!
  }
`;