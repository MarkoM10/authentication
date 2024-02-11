import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { RootState } from '../redux/store';

const RegisterPage = () => {
  const { showLogin } = useSelector((state: RootState) => state.showLogin);

  return (
    <div className="flex items-center h-screen w-screen justify-center">
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default RegisterPage;
