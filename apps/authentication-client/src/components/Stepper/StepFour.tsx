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
  const { stepTwoData, stepThreeData } = useSelector(
    (state: RootState) => state.formData
  );

  const planSubscription = stepTwoData[0].planSubscription;
  const planName = stepTwoData[0].planName;
  const planPrice = stepTwoData[0].planPrice;

  const totalPrice = stepThreeData.reduce(
    (accumulator: number, currentValue: any) =>
      accumulator + currentValue.price,
    0
  );

  return (
    <div className="col-span-3 flex justify-center h-full">
      <div className="lg:relative w-full lg:w-3/4">
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
              <div className="h-full lg:w-5/6 p-6 bg-regal-blue rounded-lg">
                <div className="flex justify-between">
                  <label className="font-bold text-white">
                    {planName}
                    <span>
                      {' '}
                      ({planSubscription === 'year' ? 'Year' : 'Month'})
                    </span>
                  </label>
                  <label className="font-bold text-white">
                    {planPrice}$/{planSubscription === 'year' ? 'y' : 'mo'}
                  </label>
                </div>
                <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between flex-col">
                    {stepThreeData.map((el: any, index: number) => (
                      <div className="w-full flex justify-between" key={index}>
                        <label className="text-gray-300">{el.label}</label>
                        <label className="text-gray-300 font-semibold">
                          +${el.price}/
                          {planSubscription === 'year' ? 'y' : 'mo'}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:w-5/6 p-6 text-gray-300 flex justify-between items-center">
                <label>
                  Total{' '}
                  <span>
                    {planSubscription === 'year' ? 'per year' : 'per month'}
                  </span>
                </label>
                <label className="text-xl font-extrabold text-white-light">
                  +${totalPrice + planPrice}/
                  {planSubscription === 'year' ? 'y' : 'mo'}
                </label>
              </div>
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
                  onClick={() => handleConfirm()}
                >
                  Confirm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StepFour;
