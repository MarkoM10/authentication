import { CheckBadgeIcon } from '@heroicons/react/24/solid';

const Confirmation = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
      <CheckBadgeIcon color="#16A34A" className="h-20 w-20" />
      <label className="font-extrabold text-white text-2xl">Thank you!</label>
      <p className="text-slate-500 text-center">
        Thanks for confirming your subscription! We hope you have fun using our
        platform. If you ever need support, please feel free to email us at
        support@example.com
      </p>
    </div>
  );
};

export default Confirmation;
