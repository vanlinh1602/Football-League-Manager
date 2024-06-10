import { Outlet } from 'react-router-dom';

const AuthorizedRoute = () => (
  // const location = useLocation();
  // const useId = useSelector(selectUserId);

  // if (!useId) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  <Outlet />
);
export default AuthorizedRoute;
