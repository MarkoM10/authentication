import { useDispatch } from 'react-redux';
import { decrementStep, incrementStep } from '../../redux/slices/stepSlice';
import { ChangeEvent, FormEvent, useState } from 'react';

const StepThree = () => {
  const dispatch = useDispatch();

  const [checkboxesValid, setCheckboxesValid] = useState('');

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    checked ? setCheckboxesValid('valid') : setCheckboxesValid('invalid');
  };

  const handleNext = () => {
    if (checkboxesValid === 'valid') {
      dispatch(incrementStep());
    } else {
      setCheckboxesValid('invalid');
    }
  };

  return (
    <div className="col-span-3 flex justify-center">
      <div className="relative w-3/4">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Pick add-ons
          </label>
          <p className="text-slate-500">
            Add-ons help enhance your gaming experience.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <div
            className={`h-20 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 justify-between ${
              checkboxesValid === 'invalid' && 'border !border-red-500'
            }`}
          >
            <div className="ml-6 flex items-center gap-2 ">
              <input
                id="bordered-checkbox-1"
                type="checkbox"
                value="service"
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => handleCheckbox(e)}
              />
              <div className="ml-2 flex flex-col justify-center">
                <label className="w-full font-medium text-gray-900 dark:text-gray-300">
                  Online service
                </label>
                <label className="text-sm font-medium text-slate-500">
                  Access to multiplayer games
                </label>
              </div>
            </div>
            <div className="mr-6">
              <label className="text-white font-bold">+3$/mo</label>
            </div>
          </div>
          <div
            className={`h-20 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 justify-between ${
              checkboxesValid === 'invalid' && 'border !border-red-500'
            }`}
          >
            <div className="ml-6 flex items-center gap-2">
              <input
                id="bordered-checkbox-1"
                type="checkbox"
                value="storage"
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => handleCheckbox(e)}
              />
              <div className="ml-2 flex flex-col justify-center">
                <label className="w-full font-medium text-gray-900 dark:text-gray-300">
                  Larger storage
                </label>
                <label className="text-sm font-medium text-slate-500">
                  Extra 1tb of cloud save
                </label>
              </div>
            </div>
            <div className="mr-6">
              <label className="text-white font-bold">+5$/mo</label>
            </div>
          </div>
          <div
            className={`h-20 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 justify-between ${
              checkboxesValid === 'invalid' && 'border !border-red-500'
            }`}
          >
            <div className="ml-6 flex items-center gap-2">
              <input
                id="bordered-checkbox-1"
                type="checkbox"
                value="profile"
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => handleCheckbox(e)}
              />
              <div className="ml-2 flex flex-col justify-center">
                <label className="w-full font-medium text-gray-900 dark:text-gray-300">
                  Customizable profile
                </label>
                <label className="text-sm font-medium text-slate-500">
                  Custom theme on your profile
                </label>
              </div>
            </div>
            <div className="mr-6">
              <label className="text-white font-bold">+1$/mo</label>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => dispatch(decrementStep())}
          >
            Go Back
          </button>
        </div>
        <div className="absolute bottom-0 right-0">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleNext()}
          >
            Next Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepThree;
