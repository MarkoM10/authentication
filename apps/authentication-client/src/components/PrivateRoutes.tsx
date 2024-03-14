import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../redux/store';

const PrivateRoutes = () => {
  const { token } = useSelector((state: RootState) => state.token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
