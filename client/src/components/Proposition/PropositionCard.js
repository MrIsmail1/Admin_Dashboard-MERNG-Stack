import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { IconButton, Typography,Box } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import moment from 'moment';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import {AuthContext} from 'src/context/Auth';
import {useContext} from 'react';
import VoteButton from 'src/components/Proposition/VoteButton';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';



const handleAddToCalendar = (
) =>{
};
const handleDelete = () =>{};

const PropositionCard = ({ proposition:{id,body,date,type,createdAt,username,nbVotes,nbComments,votes}, ...rest }) => {
  const {user} = useContext(AuthContext);
	return (
  <Card
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardHeader 
               action= {
                <IconButton onClick={<Navigate to="/app/propositions"/>}>
            <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
          </IconButton>
               }
               title = {type}
               subheader = {moment(date).format('L')}
           />
           <CardContent >
               <Typography color="textSecondary">{body}</Typography>
               <Typography color="textSecondary" >{moment(createdAt).fromNow(true)}</Typography>
               <Typography color="textSecondary">{username}</Typography>
               <Typography color="textSecondary">Votes {nbVotes} <VoteButton user={user} proposition={{id,votes}}/></Typography>
               <Typography color="textSecondary">Comments {nbComments} <ChatBubbleOutlineOutlinedIcon/></Typography>
               <IconButton onClick={handleDelete}>
                   <DeleteOutlined color="primay"/>
               </IconButton>
               
               </CardContent>
			   </Card>
);
}
PropositionCard.propTypes = {
  proposition: PropTypes.object.isRequired
};

export default PropositionCard;
