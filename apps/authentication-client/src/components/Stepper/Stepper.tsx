import ProgressBar from './ProgressBar';
import StepOne from './StepOne';

const Stepper = () => {
  return (
    <div className="w-1/2 h-2/3 dark:bg-gray-800 p-8 rounded-xl">
      <div className="grid grid-cols-4 gap-4 w-full h-full">
        <ProgressBar />
        <StepOne />
      </div>
    </div>
  );
};

export default Stepper;
