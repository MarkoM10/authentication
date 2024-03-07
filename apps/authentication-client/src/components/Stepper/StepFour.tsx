import { setShowModal } from '../../redux/slices/modalSlice';
import { decrementStep } from '../../redux/slices/stepSlice';
import { useDispatch, useSelector } from 'react-redux';
import Confirmation from '../Confirmation';
import { RootState } from '../../redux/store';

const StepFour = () => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(setShowModal(true));
  };

  const { showConfirm } = useSelector((state: RootState) => state.confirm);
  const { formData } = useSelector((state: RootState) => state);

  console.log(formData);

  return (
    <div className="col-span-3 flex justify-center">
      <div className="relative w-3/4">
        {showConfirm ? (
          <Confirmation />
        ) : (
          <>
            <div className="mt-3">
              <label className="text-white bold text-3xl font-bold">
                Finishing up
              </label>
              <p className="text-slate-500">
                Double-check everything looks fine before confirming.
              </p>
            </div>
            <div className="mt-5">
              <div className="h-full w-5/6 p-6 bg-regal-blue rounded-lg">
                <div className="flex justify-between">
                  <label className="font-bold text-white">
                    Arcade<span>(Monthly)</span>
                  </label>
                  <label className="font-bold text-white">$9/mo</label>
                </div>
                <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <label className="text-gray-300">Online service</label>
                    <label className="text-gray-300 font-semibold">
                      +$1/mo
                    </label>
                  </div>
                  <div className="flex justify-between">
                    <label className="text-gray-300">Larger storage</label>
                    <label className="text-gray-300 font-semibold">
                      +$2/mo
                    </label>
                  </div>
                </div>
              </div>
              <div className="w-5/6 p-6 text-gray-300 flex justify-between items-center">
                <label>
                  Total <span>(per month)</span>
                </label>
                <label className="text-xl font-extrabold text-white-light">
                  +$12/mo
                </label>
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
                onClick={() => handleConfirm()}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StepFour;
