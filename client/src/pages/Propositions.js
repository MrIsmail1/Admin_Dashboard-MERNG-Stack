import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination
} from '@material-ui/core';
import ProductListToolbar from 'src/components/Proposition/ProductListToolbar';
import PropositionCard from 'src/components/Proposition/PropositionCard';
import {useQuery} from '@apollo/react-hooks';
import { Navigate } from 'react-router-dom';
import {AuthContext} from 'src/context/Auth';
import {useContext} from 'react';
import {FETCH_PROPOSITIONS_QUERY} from 'src/util/graphql';





const Propositions = () => {
const {data:{ getPropositions: propositions} = {}} = useQuery(FETCH_PROPOSITIONS_QUERY);
const {user} = useContext(AuthContext);
if (!user) {return <Navigate to="/login"/>}

	return (
	<>
	<Helmet>
		<title>Propositions</title>
	  </Helmet>
	  <Box
		sx={{
		  backgroundColor: 'background.default',
		  minHeight: '100%',
		  py: 3
		}}
	  >
		<Container maxWidth={false}>
		  <ProductListToolbar />
		  <Box sx={{ pt: 3 }}>
			<Grid
			  container
			  spacing={3}
			>
			  {
			  propositions && propositions.map((proposition) => (
				<Grid
				  item
				  key={proposition.id}
				  lg={4}
				  md={6}
				  xs={12}
				>
				  <PropositionCard proposition={proposition}/>
				</Grid>
				))
		  }
			</Grid>
		  </Box>
		  <Box
			sx={{
			  display: 'flex',
			  justifyContent: 'center',
			  pt: 3
			}}
		  >
			<Pagination
			  color="primary"
			  count={3}
			  size="small"
			/>
		  </Box>
		</Container>
	  </Box>
	  </>
	  );
}

export default Propositions;
