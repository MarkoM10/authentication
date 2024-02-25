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
  console.log(step);

  const steps = [
    {
      title: 'Personal Info',
      description: 'Step details here',
      step: 1,
      stepActive: step === 1 ? '#386150' : 'gray',
      icon: <UserIcon className="h-4 w-4 text-gray-300" />,
    },
    {
      title: 'Account Info',
      description: 'Second step details here',
      step: 2,
      stepActive: step === 2 ? '#386150' : 'gray',
      icon: <IdentificationIcon className="h-4 w-4 text-gray-300" />,
    },
    {
      title: 'Review',
      description: 'Third step details here',
      step: 3,
      stepActive: step === 3 ? '#386150' : 'gray',
      icon: <ClipboardDocumentListIcon className="h-4 w-4 text-gray-300" />,
    },
    {
      title: 'Confirmation',
      description: 'Fourth step details here',
      step: 4,
      stepActive: step === 4 ? '#386150' : 'gray',
      icon: <CheckBadgeIcon className="h-4 w-4 text-gray-300" />,
    },
  ];

  return (
    <div className="col-span-1 bg-regal-blue pt-5 rounded-xl flex justify-center">
      <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {steps.map((stepInfo, index) => (
          <li key={index} className="mb-10 ms-6 relative">
            <span
              style={{ backgroundColor: stepInfo.stepActive }}
              className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-red dark:ring-gray-900"
            >
              {stepInfo.icon}
            </span>
            <div className="ml-12">
              <h3 className="font-medium leading-tight text-white">
                {stepInfo.title}
              </h3>
              <p className="text-sm">{stepInfo.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProgressBar;
