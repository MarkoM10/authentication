import { useDispatch, useSelector } from 'react-redux';
import { incrementStep } from '../../redux/slices/stepSlice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { validateName, validatePhoneNumber } from '../../utils/validation';
import { updateStepOneData } from '../../redux/slices/formDataSlice';
import { RootState } from '../../redux/store';

const StepOne = () => {
  const dispatch = useDispatch();
  //Step one data from session storage
  const { stepOneData } = useSelector((state: RootState) => state.formData);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
  });

  //Setting user input data from session storage to current form data, then use that data as values of input fields (to keep previously entered input data shown between step navigation)
  useEffect(() => {
    setFormData(stepOneData);
  }, []);

  const { name, phoneNumber, address } = formData;

  const [errors, setErrors] = useState<any>({
    nameErr: '',
    phoneNumberErr: '',
    addressErr: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let isValid = true;
    let errorMessage = '';

    switch (name) {
      case 'name':
        isValid = validateName(value);
        errorMessage = isValid ? '' : 'Name is not in a valid format.';
        break;
      case 'phoneNumber':
        isValid = validatePhoneNumber(value);
        errorMessage = isValid ? '' : 'Phone number is not in a valid format.';
        break;
      case 'address':
        errorMessage = value ? '' : 'Address should not be empty.';
        break;
    }
    setErrors({ ...errors, [`${name}Err`]: errorMessage });
    setFormData({ ...formData, [name]: value });
  };

  const validation = () => {
    const { name, phoneNumber, address } = formData;
    const nameIsValid = validateName(name);
    const phoneNumberIsValid = validatePhoneNumber(phoneNumber);
    const addressIsValid = address.trim() !== '';

    setErrors({
      nameErr: nameIsValid ? '' : 'Name is not in a valid format.',
      phoneNumberErr: phoneNumberIsValid
        ? ''
        : 'Phone number is not in a valid format.',
      addressErr: addressIsValid ? '' : 'Address should not be empty.',
    });

    return nameIsValid && phoneNumberIsValid && addressIsValid;
  };
  const handleNextStep = () => {
    const isValid = validation();
    if (isValid) {
      dispatch(updateStepOneData(formData));
      dispatch(incrementStep());
    }
  };

  const { nameErr, phoneNumberErr, addressErr } = errors;

  return (
    <div className="col-span-3 flex justify-center w-full h-full">
      <div className="lg:relative lg:w-3/4">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Personal Info
          </label>
          <p className="text-slate-500">
            Please provide your name, phone number and address.
          </p>
        </div>
        <div className="mt-5">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium leading-6 text-white ${
                  nameErr && 'text-red-700 dark:text-red-500'
                }`}
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  required
                  className={`block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                    nameErr ? 'border  border-red-500 focus:ring-red-500' : ''
                  }`}
                  value={name}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div>
                {nameErr && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {nameErr}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className={`block text-sm font-medium leading-6 text-white ${
                  phoneNumberErr && 'text-red-700 dark:text-red-500'
                }`}
              >
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="phoneNumber"
                  autoComplete="phoneNumber"
                  required
                  className={`block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                    phoneNumberErr
                      ? 'border  border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                  value={phoneNumber}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div>
                {phoneNumberErr && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {phoneNumberErr}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className={`block text-sm font-medium leading-6 text-white ${
                  addressErr && 'text-red-700 dark:text-red-500'
                }`}
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  name="address"
                  type="address"
                  autoComplete="address"
                  required
                  className={`block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                    addressErr
                      ? 'border  border-red-500 focus:ring-red-500'
                      : ''
                  }`}
                  value={address}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
              <div>
                {addressErr && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {addressErr}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="bg-regal-blue lg:bg-transparent w-full flex items-center justify-end py-4 pr-5 lg:py-0 lg:px-0 sm:w-unset absolute bottom-0 right-0">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleNextStep()}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
