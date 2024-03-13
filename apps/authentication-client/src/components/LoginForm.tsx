import { ChangeEvent, FormEvent, useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { setShowLogin } from '../redux/slices/loginSlice';
import { validatePassword, validateUsername } from '../utils/validation';
import logo from '../assets/images/logo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setShowSpinner } from '../redux/slices/spinnerSlice';
import { setShowAlert } from '../redux/slices/alertSlice';

const LoginForm = () => {
  const BASE_URL = 'http://localhost:3600';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState({
    pass: false,
    cfrnmPass: false,
  });

  const [validationState, setValidationState] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<any>({
    emailErr: '',
    usernameErr: '',
    passwordErr: '',
    confirmPasswordErr: '',
  });

  const [formData, setFormData] = useState<any>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleTogglePasswordVisibility = (type: string) => {
    type === 'pass'
      ? setShowPassword({ ...showPassword, pass: !showPassword.pass })
      : setShowPassword({
          ...showPassword,
          cfrnmPass: !showPassword.cfrnmPass,
        });
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    let isValid = true;
    let errorMessage = '';

    switch (name) {
      case 'username':
        isValid = validateUsername(value);
        errorMessage = isValid ? '' : 'Username is not in a valid format.';
        break;
      case 'password':
        isValid = validatePassword(value);
        errorMessage = isValid ? '' : 'Password is not in a valid format.';
        break;
      default:
        break;
    }
    setValidationState({ ...validationState, [name]: isValid });
    setErrors({ ...errors, [`${name}Err`]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  const validation = () => {
    const { username, password } = validationState;
    setErrors({
      usernameErr: username ? '' : 'Username is not in a valid format.',
      passwordErr: password ? '' : 'Password is not in a valid format.',
    });

    if (username && password) {
      return true;
    } else {
      return false;
    }
  };

  const loginUserData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validation();
    const { username, password } = formData;

    if (isValid) {
      console.log('Data valid for sending...');
      console.log(username, password);

      const userLoginData = { username, password };

      try {
        dispatch(setShowSpinner(true));
        const response = await axios.post(BASE_URL + '/login', userLoginData);

        const resStatus = response.status;

        if (resStatus === 200) {
          dispatch(setShowSpinner(false));
          dispatch(
            setShowAlert({
              showAlert: false,
            })
          );
          navigate('/homepage');
        }
      } catch (error) {
        console.error('Error:', error);
        dispatch(setShowSpinner(false));
        dispatch(
          setShowAlert({
            showAlert: true,
            alertHeading: 'User not found',
            alertParagraph: "User with given credentials doesn't exist.",
          })
        );
        setTimeout(() => {
          dispatch(
            setShowAlert({
              showAlert: false,
              alertHeading: '',
              alertParagraph: '',
            })
          );
        }, 5000);
      }
    }
  };

  const { usernameErr, passwordErr } = errors;

  return (
    <div className="w-11/12 sm:w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-center">
        <div className="sm:mx-auto w-11/12 sm:w-full sm:max-w-sm m-5">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-white">
            Login to your account
          </h2>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              noValidate
              onSubmit={(e) => loginUserData(e)}
            >
              <div>
                <label
                  htmlFor="username"
                  className={`block text-sm font-medium leading-6 text-white ${
                    usernameErr && 'text-red-700 dark:text-red-500'
                  }`}
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    className={`block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                      usernameErr
                        ? 'border  border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <div>
                  {usernameErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {usernameErr}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className={`block text-sm font-medium leading-6 text-white ${
                      passwordErr && 'text-red-700 dark:text-red-500'
                    }`}
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword.pass ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className={`block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                      passwordErr
                        ? 'border  border-red-500 focus:ring-red-500'
                        : ''
                    }`}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-900"
                    onClick={() => handleTogglePasswordVisibility('pass')}
                  >
                    {showPassword.pass ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div>
                  {passwordErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      {passwordErr}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-sm text-white">
                Don't have an account?
                <span
                  className="font-semibold leading-6 text-indigo-600 hover:cursor-pointer px-1"
                  onClick={() => dispatch(setShowLogin(false))}
                >
                  Click here
                </span>
              </p>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
