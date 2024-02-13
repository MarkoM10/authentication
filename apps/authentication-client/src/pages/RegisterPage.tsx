import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { RootState } from '../redux/store';
import SpinnerComponent from '../components/SpinnerComponent';

const RegisterPage = () => {
  const { showLogin } = useSelector((state: RootState) => state.showLogin);

  return (
    <div className="row-span-1 h-90vh flex items-center w-screen justify-center">
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default RegisterPage;
