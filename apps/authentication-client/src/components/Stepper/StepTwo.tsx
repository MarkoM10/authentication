import { useDispatch, useSelector } from 'react-redux';
import { decrementStep, incrementStep } from '../../redux/slices/stepSlice';
import {
  ClipboardDocumentCheckIcon,
  PresentationChartBarIcon,
  WalletIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { updateStepTwoData } from '../../redux/slices/formDataSlice';

const StepTwo = () => {
  interface IPLan {
    id: number;
    planName: string;
    subscriptionType: boolean;
    planSubscription: string;
    freeMonths: string;
    icon: any;
    planPrice: number;
    clickedStyle: string;
  }

  const dispatch = useDispatch();

  const [subscriptionType, setSubscriptionType] = useState('monthly');
  const [chosenPlans, setChosenPlans] = useState<IPLan[]>([]);
  const [borderStyle, setBorderStyle] = useState('border-slate-500');

  const handleToggle = (checked: boolean) => {
    if (checked) {
      setSubscriptionType('yearly');
    } else {
      setSubscriptionType('monthly');
    }
  };

  const isPlanChosen = chosenPlans.length > 0;

  const planArray: IPLan[] = [
    {
      id: 1,
      planName: 'Starter',
      subscriptionType: subscriptionType === 'yearly' ? true : false,
      planSubscription: subscriptionType === 'yearly' ? 'year' : 'month',
      freeMonths: subscriptionType === 'yearly' ? '2 months free' : '',
      icon: <PresentationChartBarIcon className="h-12 w-12 text-main-blue" />,
      planPrice: subscriptionType === 'yearly' ? 59 : 39,
      clickedStyle: chosenPlans.some((plan) => plan.id === 1)
        ? 'sm:gap-4 xl:gap-6 rounded-lg cursor-pointer border border-main-blue'
        : `sm:gap-4 xl:gap-6 rounded-lg cursor-pointer border hover:border-main-blue ${borderStyle}`,
    },
    {
      id: 2,
      planName: 'Advanced',
      subscriptionType: subscriptionType === 'yearly' ? true : false,
      planSubscription: subscriptionType === 'yearly' ? 'year' : 'month',
      freeMonths: subscriptionType === 'yearly' ? '2 months free' : '',
      icon: <WalletIcon className="h-12 w-12 text-main-blue" />,
      planPrice: subscriptionType === 'yearly' ? 99 : 79,
      clickedStyle: chosenPlans.some((plan) => plan.id === 2)
        ? 'sm:gap-4 xl:gap-6 rounded-lg cursor-pointer border border-main-blue'
        : `sm:gap-4 xl:gap-6 rounded-lg cursor-pointer border hover:border-main-blue ${borderStyle}`,
    },
    {
      id: 3,
      planName: 'Pro',
      subscriptionType: subscriptionType === 'yearly' ? true : false,
      planSubscription: subscriptionType === 'yearly' ? 'year' : 'month',
      freeMonths: subscriptionType === 'yearly' ? '2 months free' : '',
      icon: <ClipboardDocumentCheckIcon className="h-12 w-12 text-main-blue" />,
      planPrice: subscriptionType === 'yearly' ? 159 : 109,
      clickedStyle: chosenPlans.some((plan) => plan.id === 3)
        ? 'sm:gap-4 xl:gap-6 rounded-lg cursor-pointer border border-main-blue'
        : `sm:gap-4 xl:gap-6 rounded-lg cursor-pointer border hover:border-main-blue ${borderStyle}`,
    },
  ];

  const handlePlan = (plan: IPLan) => {
    setChosenPlans((prevPlans) => {
      const isClicked = prevPlans.some(
        (clickedPlan) => clickedPlan.id === plan.id
      );
      if (!isClicked) {
        setBorderStyle('border-slate-500');
        return [plan];
      } else {
        return prevPlans.filter((clickedPlan) => clickedPlan.id !== plan.id);
      }
    });
  };

  const handleNext = () => {
    if (isPlanChosen) {
      chosenPlans.map((el) => {
        el.planSubscription = subscriptionType === 'yearly' ? 'year' : 'month';
      });
      dispatch(updateStepTwoData(chosenPlans));
      dispatch(incrementStep());
    } else {
      setBorderStyle('border-red-500');
    }
  };

  return (
    <div className="col-span-3 flex justify-center">
      <div className="lg:relative w-full lg:w-3/4">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Select your plan
          </label>
          <p className="text-slate-500">
            You have the option of monthly or yearly billing.
          </p>
        </div>
        <div className="mt-5 w-full flex flex-col lg:grid lg:grid-cols-3 gap-2 lg:gap-4 ">
          {planArray.map((el) => (
            <div
              key={el.id}
              className={el.clickedStyle}
              onClick={() => handlePlan(el)}
            >
              <div className="flex flex-col h-24 lg:h-48 p-4 max-w-lg text-gray-900 bg-white rounded-lg shadow dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                <div className="flex lg:flex-col items-center lg:items-baseline h-full lg:justify-between">
                  {el.icon}
                  <div className="flex flex-col ml-4">
                    <label className="font-extrabold cursor-pointer">
                      {el.planName}
                    </label>
                    <span className="mr-2 font-extrabold text-sm">
                      {el.planPrice}$
                      <span className="text-gray-500 font-normal dark:text-gray-400 text-sm">
                        /{el.planSubscription}
                      </span>
                    </span>
                    <label className="text-sm">{el.freeMonths}</label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-16 bg-regal-blue w-full rounded-lg mt-5 flex justify-center align-center">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={(event) => handleToggle(event.target.checked)}
              // checked={planArray.map((el) =>
              //   el.subscriptionType ? true : false
              // )}
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
        <div className="absolute flex justify-between bottom-0 left-0 w-full bg-regal-blue lg:bg-transparent py-4 pr-5 lg:py-0 lg:px-0">
          <div className="pl-5 lg:pl-0">
            <button
              type="button"
              className="py-2.5 px-5 me-2  text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => dispatch(decrementStep())}
            >
              Go Back
            </button>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => handleNext()}
            >
              Next Step
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
