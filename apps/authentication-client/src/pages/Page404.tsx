import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:w-1/2 w-11/12 lg:h-2/3 dark:bg-gray-800 p-8 rounded-xl flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-main-blue">404</h1>
        <h1 className="text-2xl lg:text-5xl font-medium py-8 text-white">
          Oops! Page not found
        </h1>
        <p className="text-lg lg:text-xl pb-8 px-12 font-medium text-slate-500">
          Oops! The page you are looking for does not exist. It might have been
          moved or deleted.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-main-blue text-white font-semibold px-6 py-3 rounded-md mr-6"
        >
          HOME
        </button>
      </div>
    </div>
  );
};

export default Page404;
