import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  UserIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  CheckBadgeIcon,
} from '@heroicons/react/24/solid';

const ProgressBar = () => {
  const { step } = useSelector((state: RootState) => state.step);

  const steps = [
    {
      title: 'Personal Info',
      description: 'Enter personal data',
      step: 1,
      stepActive: step === 1 ? '#0f7234' : 'gray',
      icon: <UserIcon className="h-6 w-6 sm:h-4 sm:w-4 text-gray-300" />,
    },
    {
      title: 'Plan',
      description: 'Choose your plan',
      step: 2,
      stepActive: step === 2 ? '#0f7234' : 'gray',
      icon: (
        <IdentificationIcon className="h-6 w-6 sm:h-4 sm:w-4 text-gray-300" />
      ),
    },
    {
      title: 'Add-ons',
      description: 'Pick add-ons',
      step: 3,
      stepActive: step === 3 ? '#0f7234' : 'gray',
      icon: (
        <ClipboardDocumentListIcon className="h-6 w-6 sm:h-4 sm:w-4 text-gray-300" />
      ),
    },
    {
      title: 'Confirmation',
      description: 'Confirm data',
      step: 4,
      stepActive: step === 4 ? '#0f7234' : 'gray',
      icon: <CheckBadgeIcon className="h-6 w-6 sm:h-4 sm:w-4 text-gray-300" />,
    },
  ];

  return (
    <div className="col-span-1 lg:bg-regal-blue pt-5 rounded-xl flex justify-center absolute lg:relative top-0 left-0 w-full">
      <ol className="relative flex justify-evenly items-center lg:block text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {steps.map((stepInfo, index) => (
          <li key={index} className="mb-10 ms-6 px-3 relative">
            <span
              style={{ backgroundColor: stepInfo.stepActive }}
              className="absolute flex items-center justify-center w-11 h-11 lg:w-8 lg:h-8 bg-green-200 rounded-full -start-4 ring-4 ring-red dark:ring-gray-900"
            >
              {stepInfo.icon}
            </span>
            <div className="ml-12 w-full sm:w-full flex justify-center sm:block">
              <h3 className="font-medium leading-tight text-white max-lg:hidden">
                {stepInfo.title}
              </h3>
              <p className="text-sm max-lg:hidden">{stepInfo.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressBar;
