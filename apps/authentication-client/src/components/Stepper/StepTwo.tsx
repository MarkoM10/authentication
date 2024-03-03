import { useDispatch } from 'react-redux';
import { decrementStep, incrementStep } from '../../redux/slices/stepSlice';
import {
  ClipboardDocumentCheckIcon,
  PresentationChartBarIcon,
  WalletIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

const StepTwo = () => {
  const dispatch = useDispatch();
  const [toggleValue, setToggleValue] = useState('m');
  const [planValues, setPlanValues] = useState({
    starterPrice: '29$',
    advancedPrice: '99$',
    proPrice: '129$',
    freeMonths: '',
  });

  const handleToggle = () => {
    setToggleValue(toggleValue === 'm' ? 'y' : 'm');
    toggleValue === 'm'
      ? setPlanValues({
          ...planValues,
          starterPrice: '90$',
          advancedPrice: '160$',
          proPrice: '200$',
          freeMonths: '2 months free',
        })
      : setPlanValues({
          starterPrice: '29$',
          advancedPrice: '99$',
          proPrice: '129$',
          freeMonths: '',
        });
  };
  const [selectedDiv, setSelectedDiv] = useState('');

  const handleDivClick = (index: string) => {
    setSelectedDiv(index);
  };

  console.log(selectedDiv);

  const handleNext = () => {
    if (selectedDiv === '' || selectedDiv === 'invalid') {
      setSelectedDiv('invalid');
    } else {
      dispatch(incrementStep());
    }
  };

  const { starterPrice, advancedPrice, proPrice, freeMonths } = planValues;

  return (
    <div className="col-span-3 flex justify-center">
      <div className="relative w-3/4">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Select your plan
          </label>
          <p className="text-slate-500">
            You have the option of monthly or yearly billing.
          </p>
        </div>
        <div className="mt-5 w-full lg:grid lg:grid-cols-3 gap-4 ">
          <div
            className={`sm:gap-4 xl:gap-6 rounded-lg cursor-pointer ${
              selectedDiv === 'invalid' && 'border border-red-500'
            }  ${selectedDiv === 'starter' ? 'border border-main-blue' : ''}`}
            onClick={() => handleDivClick('starter')}
          >
            <div className="flex flex-col h-48 p-4 max-w-lg hover:border-main-blue text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <div className="flex flex-col items-baseline h-full justify-between">
                <PresentationChartBarIcon className="h-12 w-12 text-main-blue" />
                <div className="flex flex-col">
                  <label className="font-extrabold cursor-pointer">
                    Starter
                  </label>
                  <span className="mr-2 font-extrabold text-sm">
                    {starterPrice}
                    <span className="text-gray-500 font-normal dark:text-gray-400 text-sm">
                      /month
                    </span>
                  </span>
                  <label className="text-sm">{freeMonths}</label>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`sm:gap-4 xl:gap-6 rounded-lg cursor-pointer ${
              selectedDiv === 'invalid' && 'border border-red-500'
            } ${selectedDiv === 'advanced' ? 'border border-main-blue' : ''}`}
            onClick={() => handleDivClick('advanced')}
          >
            <div className="flex flex-col h-48 p-4 max-w-lg hover:border-main-blue text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <div className="flex flex-col items-baseline h-full justify-between">
                <WalletIcon className="h-12 w-12 text-main-blue" />
                <div className="flex flex-col">
                  <label className="font-extrabold cursor-pointer">
                    Advanced
                  </label>
                  <span className="mr-2 font-extrabold text-sm">
                    {advancedPrice}
                    <span className="text-gray-500 font-normal dark:text-gray-400 text-sm">
                      /month
                    </span>
                  </span>
                  <label className="text-sm">{freeMonths}</label>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`sm:gap-4 xl:gap-6 cursor-pointer rounded-lg ${
              selectedDiv === 'invalid' && 'border border-red-500'
            } ${selectedDiv === 'pro' ? 'border border-main-blue' : ''}`}
            onClick={() => handleDivClick('pro')}
          >
            <div className="flex flex-col h-48 p-4 max-w-lg hover:border-main-blue  text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white">
              <div className="flex flex-col items-baseline h-full justify-between">
                <ClipboardDocumentCheckIcon className="h-12 w-12 text-main-blue" />
                <div className="flex flex-col">
                  <label className="font-extrabold cursor-pointer">Pro</label>
                  <span className="mr-2 font-extrabold text-sm">
                    {proPrice}
                    <span className="text-gray-500 font-normal dark:text-gray-400 text-sm">
                      /month
                    </span>
                  </span>
                  <label className="text-sm">{freeMonths}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16 bg-regal-blue w-full rounded-lg mt-5 flex justify-center align-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              checked={toggleValue === 'y'}
              onChange={handleToggle}
            />
            <span className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Monthly
            </span>
            <div className="relative w-11 h-6 bg-main-blue peer-focus:outline-none  rounded-full peer dark:bg-main-blue peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-main-blue"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              Yearly
            </span>
          </label>
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

export default StepTwo;
