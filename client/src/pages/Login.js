import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import gql from 'graphql-tag';
import {AuthContext} from 'src/context/Auth';
import {useMutation} from '@apollo/react-hooks';
import {useState,useContext} from 'react';
import {useForm} from 'src/hooks/useForm';


const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const context =useContext(AuthContext);
  const { handleChange, handleSubmit, values } = useForm(loginUserCallback, {
    username: '',
    password: ''
  });
  const [loginUser] = useMutation(LOGIN_USER, {
    update(_,{data:{login:userData}}) {
      context.login(userData)
	  navigate('/app/dashboard', { replace: true });

    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    loginUser();
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                </Box>
                <TextField
                  error={errors.username ? true : false}
                  fullWidth
                  helperText={errors.username}
                  label="Usename"
                  margin="normal"
                  name="username"
                  onChange={handleChange}
                  type="text"
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={errors.password ? true : false}
                  fullWidth
                  helperText={errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
        </Container>
      </Box>
    </>
  );
};
const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
 

export default Login;
