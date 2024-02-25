import { decrementStep } from '../../redux/slices/stepSlice';
import { useDispatch } from 'react-redux';

const StepFour = () => {
  const dispatch = useDispatch();

  return (
    <div className="col-span-3 flex justify-center">
      <div className="relative w-2/3">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Finishing up
          </label>
          <p className="text-slate-500">
            Double-check everything looks fine before confirming.
          </p>
        </div>
        <div className="mt-5"></div>
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
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFour;
