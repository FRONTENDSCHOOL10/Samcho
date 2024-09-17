import { Navigate } from 'react-router-dom';
import { authUtils } from '@/utils';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
  const { isAuth } = authUtils.getAuth();

  if (!isAuth) {
    return <Navigate to="/login" state={{ isAuth: false }} replace />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
