import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Home from './Home';

const routes = [
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/register',
    element: <RegisterForm />,
  },
  {
    path: '/home',
    element: <Home />,
  },
];

export default routes;
