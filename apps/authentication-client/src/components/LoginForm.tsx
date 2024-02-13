import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { setShowLogin } from '../redux/slices';
import { validatePassword, validateUsername } from '../utils/validation';
import heroImg from '../assets/images/hero.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  const handleOnChange = (e: any) => {
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

  const loginUserData = async (e: any) => {
    e.preventDefault();

    const isValid = validation();
    const { username, password } = formData;

    if (isValid) {
      console.log('Data valid for sending...');
      console.log(username, password);

      const userLoginData = { username, password };

      try {
        const response = await axios.post(BASE_URL + '/login', userLoginData);
        const resStatus = response.status;

        if (resStatus === 200) {
          navigate('/homepage');
        } else if (resStatus === 401) {
          console.log('User with given credentials doesnt exist.');
        }
      } catch (error) {}
    } else {
      console.log('Data invalid for sending...');
    }
  };

  const { usernameErr, passwordErr } = errors;

  return (
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <section>
        <div className="flex items-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm m-5">
            {/* <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        /> */}
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
                    className="block text-sm font-medium leading-6 text-white"
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
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                  <div>
                    {usernameErr && (
                      <p className="text-red-500 mt-2 text-xs">{usernameErr}</p>
                    )}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-white"
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
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-900"
                      onClick={() => handleTogglePasswordVisibility('pass')}
                    >
                      {showPassword.pass ? (
                        <EyeSlashIcon className="w-5 h-5" /> // EyeOffIcon should represent the icon for hiding the password
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div>
                    {passwordErr && (
                      <p className="text-red-500 mt-2 text-xs">{passwordErr}</p>
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
      </section>
    </div>
  );
};

export default LoginForm;
