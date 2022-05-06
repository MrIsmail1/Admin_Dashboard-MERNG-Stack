import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UserList from 'src/components/Users/UserList';
import {FETCH_USERS_QUERY} from 'src/util/graphql';
import {useQuery} from '@apollo/react-hooks';


const CustomerList = () => {
	const {data:{ getUsers: users} = {}} = useQuery(FETCH_USERS_QUERY);
	return(
  <>
    <Helmet>
      <title>Users</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <UserList users={users} />
        </Box>
      </Container>
    </Box>
  </>
)
	};

export default CustomerList;
