import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import theme from 'src/theme';
import routes from 'src/routes';
import {AuthProvider} from 'src/context/Auth';
import React from 'react';
function App() {
	const routing = useRoutes(routes);
  return (
	  <AuthProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
	</AuthProvider>
  );
}

export default App;
