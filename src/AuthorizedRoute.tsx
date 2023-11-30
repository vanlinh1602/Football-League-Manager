import { Navigate, useLocation } from 'react-router-dom';

type Props = {
  children: JSX.Element;
};

const AuthorizedRoute = ({ children }: Props) => {
  const location = useLocation();

  const user = true;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AuthorizedRoute;
