import { useSelector } from 'react-redux';
import Alert from './Alert';
import { RootState } from '../redux/store';
import Modal from './Modal';

const Dialogs = () => {
  const { showAlert } = useSelector(
    (state: RootState) => state.showAlert.showAlert
  );
  const { showModal } = useSelector((state: RootState) => state.modal);

  return (
    <>
      {showAlert && (
        <div className="flex items-center w-screen justify-center">
          <Alert />
        </div>
      )}
      {showModal && <Modal />}
    </>
  );
};

export default Dialogs;
