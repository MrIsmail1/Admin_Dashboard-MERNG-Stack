import { Helmet } from 'react-helmet';
import {
  Box,
	Button,
  Container,
  Grid
} from '@material-ui/core';
import {AuthContext} from 'src/context/Auth';
import {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import PropositionForm from 'src/components/Proposition/PropositionForm';
import PropositionDialog from 'src/components/Proposition/PropositionDialog';
import {useState} from 'react';



const Dashboard = () => {
	const {user} = useContext(AuthContext);
	const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
     };
	if (!user) {return <Navigate to="/login"/>}
	
    
	return (
	  <>
    <Helmet>
      <title>Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
      <PropositionForm/>
      </Container>
    </Box>
  </>
)};

export default Dashboard;
