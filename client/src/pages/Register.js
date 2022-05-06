import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import gql from 'graphql-tag';
import {AuthContext} from 'src/context/Auth';
import {useMutation} from '@apollo/react-hooks';
import {useState,useContext} from 'react';
import {useForm} from 'src/hooks/useForm';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();
  const [errors,setErrors] =useState({});
    const context = useContext(AuthContext);
    const {handleChange,handleSubmit,values} = useForm(registerUser,{
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
    });
    const [addUser]=useMutation(REGISTER_USER, {
        update(_,{data:{register:userData}}){
        context.login(userData)
		navigate('/app/dashboard', { replace: true });
    },
    onError(err) {
        setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables : values
    });
    function registerUser(){
        addUser();
    };

  return (
    <>
      <Helmet>
        <title>Register</title>
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
                    Create new account
                  </Typography>
                </Box>
                <TextField
                  error={errors.username ? true : false}
                  fullWidth
                  helperText={errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={errors.email ? true : false}
                  fullWidth
                  helperText={errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onChange={handleChange}
                  type="email"
                  value={values.email}
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
				<TextField
                  error={errors.confirmPassword ? true : false}
                  fullWidth
                  helperText={errors.confirmPassword}
                  label="Confirm password"
                  margin="normal"
				  type="password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={values.confirmPassword}
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
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
        </Container>
      </Box>
    </>
  );
};
const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Register;
