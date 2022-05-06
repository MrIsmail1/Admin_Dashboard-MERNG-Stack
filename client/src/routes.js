import { Navigate } from 'react-router-dom';
import Propositions from './pages/Propositions';
import Users from './pages/Users';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import MainLayout from './components/MainLayout';
import DashboardLayout from './components/DashboardLayout';
import Register from 'src/pages/Register';
import Calendar from 'src/pages/Calendar'


const routes = [
    { path: 'app',
      element: <DashboardLayout/>,
      children: [
          { path: 'propositions',element :<Propositions />},
          { path: 'users',element: <Users />},
          { path: 'calendar',element : <Calendar/>}
    
      ]
    },
    { path: '/',
      element: <MainLayout/>,
      children: [
          { path: '/login',element: <Login />},
		      { path: '/register',element :<Register/>},
          { path: '404',element:<NotFound />},
          { path: '/',element: <Navigate to="/app/propositions"/>}
          
      ]
}
];

export default routes;