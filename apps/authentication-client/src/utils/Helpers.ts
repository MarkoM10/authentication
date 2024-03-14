export const confirmDataSend = (data: any) => {
  const { name, phoneNumber, address } = data.stepOneData;
  const { planName, planPrice, planSubscription } = data.stepTwoData[0];
  const addonsData = data.stepThreeData;

  const formattedAddonsData: { [key: string]: any } = {};

  addonsData.forEach((addon: any, index: number) => {
    formattedAddonsData[`addon${index + 1}`] = addon;
  });

  const multistepFormObject = {
    personalData: {
      name,
      phoneNumber,
      address,
    },
    planData: {
      planName,
      planPrice,
      planSubscription,
    },
    addonsData: formattedAddonsData,
  };

  return multistepFormObject;
};

export const BASE_URL = 'http://localhost:3600';
