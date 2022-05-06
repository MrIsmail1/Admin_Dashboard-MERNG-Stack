import React from 'react'
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { IconButton, Typography,Box} from '@material-ui/core';
import {VOTE_PROPOSITION_MUTATION} from 'src/util/graphql';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
export default function VoteButton({user,proposition: {id,votes}}) {
   const [voted,setVoted] = useState(false);
    useEffect(() => {
        if (user && votes.find((vote) => vote.username === user.username)) {
          setVoted(true);
        } else setVoted(false);
      }, [user, votes]);
      const [voteProposition] = useMutation(VOTE_PROPOSITION_MUTATION, {
        variables: { propositionID: id }
      });
      const voteButton = user && (voted ? (<FavoriteOutlinedIcon style={{color:"red"}}/>) : (<FavoriteOutlinedIcon style={{color:"grey"}}/>))
    return (
      <>
        <IconButton style={{paddingLeft:'0px',display:"inline" ,paddingTop:7}} onClick={voteProposition}>
        {voteButton}
        </IconButton>
        </>
    )
}
