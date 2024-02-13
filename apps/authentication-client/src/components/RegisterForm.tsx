import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowLogin } from '../redux/slices';
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from '../utils/validation';
import heroImg from '../assets/images/hero.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SpinnerComponent from './SpinnerComponent';

const RegisterForm = () => {
  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:3600';
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
      case 'email':
        isValid = validateEmail(value);
        errorMessage = isValid ? '' : 'Email is not in a valid format.';
        break;
      case 'username':
        isValid = validateUsername(value);
        errorMessage = isValid ? '' : 'Username is not in a valid format.';
        break;
      case 'password':
        isValid = validatePassword(value);
        errorMessage = isValid ? '' : 'Password is not in a valid format.';
        break;
      case 'confirmPassword':
        const password = e.currentTarget.form.password.value;
        isValid = password === value;
        errorMessage = isValid ? '' : 'Passwords do not match.';
        break;
      default:
        break;
    }
    setValidationState({ ...validationState, [name]: isValid });
    setErrors({ ...errors, [`${name}Err`]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  const validation = () => {
    const { email, username, password, confirmPassword } = validationState;
    setErrors({
      emailErr: email ? '' : 'Email is not in a valid format.',
      usernameErr: username ? '' : 'Username is not in a valid format.',
      passwordErr: password ? '' : 'Password is not in a valid format.',
      confirmPasswordErr: confirmPassword ? '' : 'Passwords do not match.',
    });

    if (email && username && password && confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const registerUserData = async (e: any) => {
    e.preventDefault();

    const isValid = validation();
    const { email, username, password } = formData;

    if (isValid) {
      console.log('Data valid for sending...');
      console.log(email, username, password);

      const userRegisterData = { email, username, password };

      try {
        const response = await axios.post(
          BASE_URL + '/register',
          userRegisterData
        );

        if (response.status === 200) {
          navigate('/homepage');
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Data invalid for sending...');
    }
  };

  const { emailErr, usernameErr, passwordErr, confirmPasswordErr } = errors;

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
              Register your account
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form
                className="space-y-6"
                action="#"
                method="POST"
                noValidate
                onSubmit={(e) => registerUserData(e)}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => handleOnChange(e)}
                    />
                  </div>
                  <div>
                    {emailErr && (
                      <p className="text-red-500 mt-2 text-xs">{emailErr}</p>
                    )}
                  </div>
                </div>

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
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
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

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Confirm password
                    </label>
                  </div>
                  <div className="mt-2 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword.cfrnmPass ? 'text' : 'password'}
                      autoComplete="confirmPassword"
                      required
                      className="block w-full rounded-md border-0 px-1.5 py-1.5 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => handleOnChange(e)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
                      onClick={() =>
                        handleTogglePasswordVisibility('cfrnmPass')
                      }
                    >
                      {showPassword.cfrnmPass ? (
                        <EyeSlashIcon className="w-5 h-5" /> // EyeOffIcon should represent the icon for hiding the password
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <div>
                    {confirmPasswordErr && (
                      <p className="text-red-500 mt-2 text-xs">
                        {confirmPasswordErr}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-sm text-white">
                  Already have an account?
                  <span
                    className="font-semibold leading-6 text-indigo-600 hover:cursor-pointer px-1"
                    onClick={() => dispatch(setShowLogin(true))}
                  >
                    Click here
                  </span>
                </p>
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
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

export default RegisterForm;
