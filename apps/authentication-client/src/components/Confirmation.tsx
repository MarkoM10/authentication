import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Confirmation = () => {
  const { auth } = useSelector((state: RootState) => state.auth);

  console.log(auth);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      {auth ? (
        <>
          <CheckBadgeIcon color="#387550" className="h-20 w-20" />
          <label className="font-extrabold text-white text-2xl">
            Thank you!
          </label>
          <p className="text-slate-500 text-center">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@example.com
          </p>
        </>
      ) : (
        <>
          <ExclamationCircleIcon color="#af2828" className="h-20 w-20" />
          <label className="font-extrabold text-white text-2xl">
            Request failed!
          </label>
          <p className="text-slate-500 text-center">
            Oops! It seems there was an issue with your subscription. We
            apologize for any inconvenience this may have caused. If you require
            assistance or have any questions, please don't hesitate to reach out
            to us at support@example.com. We're here to help resolve any
            problems you may encounter. Thank you for your understanding.
          </p>
        </>
      )}
    </div>
  );
};

export default Confirmation;
