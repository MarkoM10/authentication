import { useSelector } from 'react-redux';
import Alert from './Alert';
import { RootState } from '../redux/store';

const Dialogs = () => {
  const { showAlert } = useSelector(
    (state: RootState) => state.showAlert.showAlert
  );

  return (
    <>
      {showAlert && (
        <div className="flex items-center w-screen justify-center">
          <Alert />
        </div>
      )}
    </>
  );
};

export default Dialogs;
