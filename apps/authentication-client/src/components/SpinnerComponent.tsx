import { useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import { RootState } from '../redux/store';

const SpinnerComponent = () => {
  const { showSpinner } = useSelector((state: RootState) => state.showSpinner);

  return (
    <>
      {showSpinner && (
        <div className="absolute w-screen h-screen z-10 bg-black bg-opacity-70">
          <PuffLoader className="top-1/2 left-1/2" color="#4169e1" />
        </div>
      )}
    </>
  );
};

export default SpinnerComponent;
