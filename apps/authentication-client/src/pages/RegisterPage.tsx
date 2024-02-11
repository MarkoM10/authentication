import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { RootState } from '../redux/store';

const RegisterPage = () => {
  const { showLogin } = useSelector((state: RootState) => state.showLogin);
  console.log(showLogin);

  return (
    <div className="items-center h-screen">
      {showLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default RegisterPage;
