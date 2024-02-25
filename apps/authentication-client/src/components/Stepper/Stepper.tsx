import { useSelector } from 'react-redux';
import ProgressBar from './ProgressBar';
import StepOne from './StepOne';
import { RootState } from '../../redux/store';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';

const Stepper = () => {
  const { step } = useSelector((state: RootState) => state.step);

  const RenderStep = () => {
    switch (step) {
      case 1:
        return <StepOne />;
      case 2:
        return <StepTwo />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
    }
  };

  return (
    <div className="w-1/2 h-2/3 dark:bg-gray-800 p-8 rounded-xl">
      <div className="grid grid-cols-4 gap-4 w-full h-full">
        <ProgressBar />
        <RenderStep />
      </div>
    </div>
  );
};

export default Stepper;