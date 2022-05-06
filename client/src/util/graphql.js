import gql from 'graphql-tag';
export const FETCH_PROPOSITIONS_QUERY = gql`
{
  getPropositions {
    id
    body
    date
    type
    createdAt
    username
    nbVotes
    nbComments
    comments {id body username createdAt}
    votes {id createdAt username}
  }
}
`;
export const CREATE_PROPOSITION_MUTATION = gql`
mutation createProposition ($body:String!,$date:String!,$type:String!) {
	createProposition(body:$body,date:$date,type:$type ) {
	id body date type createdAt	username 
	votes {
		id username createdAt
	}
	nbVotes
	comments {
		id body username createdAt
	}
	nbComments
	}
}
`;
export const FETCH_USERS_QUERY = gql`
{
  getUsers {
  username
	email
	createdAt
  }
}
`;
export const FETCH_PTYPES_QUERY = gql`
{
  getPtypes {
  value
	label
  }
}
`;
export const CREATE_PTYPE_MUTATION = gql`
mutation createPtype ($value:String!,$label:String!) {
	createPtype(value:$value,label:$label) {
	value
  label
  }
}
`; 
export const VOTE_PROPOSITION_MUTATION = gql`
mutation voteProposition($propositionID: ID!) {
  voteProposition(propositionID: $propositionID) {
    id
    votes {
      id
      username
    }
    nbVotes
  }
}
`;
export const FETCH_PROPOSITION_QUERY = gql`
  query($propositionID: ID!) {
    getProposition(propositionID: $propositionID) {
      id
      body
      date
      type
      createdAt
      username
      nbVotes
      votes {
        username
      }
      nbComments
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export const DELETE_PROPOSITION_MUTATION = gql`
  mutation deletePost($propositionID: ID!) {
    deletePost(propositionID: $propositionID) 
  }
`;