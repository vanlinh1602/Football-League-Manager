import { selectUserId } from 'features/user/store/selectors';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthorizedRoute = () => {
  const location = useLocation();
  const useId = useSelector(selectUserId);

  if (!useId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default AuthorizedRoute;
