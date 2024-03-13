import { useDispatch, useSelector } from 'react-redux';
import { decrementStep, incrementStep } from '../../redux/slices/stepSlice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { updateStepThreeData } from '../../redux/slices/formDataSlice';

const StepThree = () => {
  const dispatch = useDispatch();

  const { stepTwoData } = useSelector((state: RootState) => state.formData);

  const [selectedAddons, setSelectedAddons] = useState<any>([]);
  const [addonPicked, setAddonPicked] = useState('border border-gray-200');

  const subscription = stepTwoData[0].planSubscription;

  interface Addon {
    id: number;
    label: string;
    p: string;
    type: string;
    value: string;
    name: string;
    price: number;
  }

  const addonsArray: Addon[] = [
    {
      id: 1,
      label: 'Online Service',
      p: 'Extra access to online services',
      type: 'checkbox',
      value: 'service',
      name: 'serviceInput',
      price: subscription === 'month' ? 3 : 10,
    },
    {
      id: 2,
      label: 'Larger computer storage',
      p: 'Extra 1tb of cloud save',
      type: 'checkbox',
      value: 'storage',
      name: 'storageInput',
      price: subscription === 'month' ? 10 : 20,
    },
    {
      id: 3,
      label: 'Customizable profile',
      p: 'Custom theme on your profile',
      type: 'checkbox',
      value: 'profile',
      name: 'profileInput',
      price: subscription === 'month' ? 15 : 35,
    },
  ];

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    addon: Addon
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setAddonPicked('border border-gray-200');
      setSelectedAddons([
        ...selectedAddons,
        { label: addon.label, price: addon.price },
      ]);
    } else {
      setSelectedAddons(
        selectedAddons.filter((item: any) => item.label !== addon.label)
      );
    }
  };

  const isAnyCheckboxChecked = selectedAddons.length > 0;

  const handleNext = () => {
    if (isAnyCheckboxChecked) {
      dispatch(updateStepThreeData(selectedAddons));
      dispatch(incrementStep());
    } else {
      setAddonPicked('!border !border-red-500');
    }
  };

  return (
    <div className="col-span-3 flex justify-center">
      <div className="lg:relative w-full lg:w-3/4">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Pick add-ons
          </label>
          <p className="text-slate-500">
            Add-ons help you expand your profile.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {addonsArray.map((el) => (
            <div
              key={el.id}
              className={`flex justify-between px-2 lg:px-4 items-center h-20 border border-gray-200 rounded dark:border-gray-700 ${addonPicked}`}
            >
              <div className="flex items-center gap-2 ">
                <input
                  type={el.type}
                  value={el.value}
                  name={el.name}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  checked={selectedAddons.some(
                    (item: any) => item.label === el.label
                  )}
                  onChange={(event) => handleCheckboxChange(event, el)}
                />
              </div>
              <div className="flex flex-col justify-center">
                <label className="w-full font-small lg:font-medium text-gray-900 dark:text-gray-300">
                  {el.label}
                </label>
                <label className="text-sm font-medium text-slate-500">
                  {el.p}
                </label>
              </div>
              <div className="">
                <label className="text-white font-bold">
                  +{el.price}$/{subscription === 'year' ? 'y' : 'mo'}
                </label>
              </div>
            </div>
          ))}
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

export default StepThree;
