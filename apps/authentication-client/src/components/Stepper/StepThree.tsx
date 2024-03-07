import { useDispatch, useSelector } from 'react-redux';
import { decrementStep, incrementStep } from '../../redux/slices/stepSlice';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { updateStepThreeData } from '../../redux/slices/formDataSlice';

const StepThree = () => {
  const dispatch = useDispatch();

  const { stepTwoData } = useSelector((state: RootState) => state.formData);

  const [selectedAddons, setSelectedAddons] = useState<any>([]);
  const { stepThreeData } = useSelector((state: RootState) => state.formData);

  useEffect(() => {
    setSelectedAddons(stepThreeData);
  }, []);

  const { subscription } = stepTwoData;

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
      p: 'Access to multiplayer games',
      type: 'checkbox',
      value: 'service',
      name: 'serviceInput',
      price: subscription === 'monthly' ? 3 : 10,
    },
    {
      id: 2,
      label: 'Larger storage',
      p: 'Extra 1tb of cloud save',
      type: 'checkbox',
      value: 'storage',
      name: 'storageInput',
      price: subscription === 'monthly' ? 10 : 20,
    },
    {
      id: 3,
      label: 'Customizable profile',
      p: 'Custom theme on your profile',
      type: 'checkbox',
      value: 'profile',
      name: 'profileInput',
      price: subscription === 'monthly' ? 15 : 35,
    },
  ];

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    addon: Addon
  ) => {
    const isChecked = event.target.checked;

    console.log(addon);
    if (isChecked) {
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
    }
  };

  return (
    <div className="col-span-3 flex justify-center">
      <div className="relative w-3/4">
        <div className="mt-3">
          <label className="text-white bold text-3xl font-bold">
            Pick add-ons
          </label>
          <p className="text-slate-500">
            Add-ons help enhance your gaming experience.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {addonsArray.map((el) => (
            <div
              key={el.id}
              className={`h-20 border border-gray-200 rounded dark:border-gray-700 ${
                !isAnyCheckboxChecked && '!border !border-red-500'
              }`}
              style={{
                display: 'grid',
                gridTemplateColumns: '0.25fr 0.5fr 0.25fr',
                paddingLeft: '2rem',
                alignItems: 'center',
              }}
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
                <label className="w-full font-medium text-gray-900 dark:text-gray-300">
                  {el.label}
                </label>
                <label className="text-sm font-medium text-slate-500">
                  {el.p}
                </label>
              </div>
              <div className="">
                <label className="text-white font-bold">
                  +{el.price}$/{subscription === 'yearly' ? 'y' : 'mo'}
                </label>
              </div>
            </div>
          ))}
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

export default StepThree;
