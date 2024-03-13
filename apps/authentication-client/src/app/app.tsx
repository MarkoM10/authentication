import Dialogs from '../components/Dialogs';
import Homepage from '../pages/Homepage';
import RegisterPage from '../pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';
import SpinnerComponent from '../components/SpinnerComponent';

export function App() {
  return (
    <div className={`bg-form bg-cover`}>
      <div className="bg-gray-900 bg-opacity-70 flex h-screen justify-items-center flex-col">
        <SpinnerComponent />
        <div className="flex items-center justify-center w-screen flex-col h-screen gap-3 relative">
          <Dialogs />
          <Routes>
            <Route index element={<RegisterPage />} path="/" />
            <Route element={<Homepage />} path="/homepage" />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
