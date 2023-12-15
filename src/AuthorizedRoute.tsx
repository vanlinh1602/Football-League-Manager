import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthorizedRoute = () => {
  const location = useLocation();

  const user = true;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthorizedRoute;
