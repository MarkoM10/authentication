import Dialogs from '../components/Dialogs';
import Homepage from '../pages/Homepage';
import RegisterPage from '../pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';
import bgImg from '../assets/images/formBgImg.jpg';

export function App() {
  return (
    <div style={{ background: `url(${bgImg})`, backgroundSize: 'cover' }}>
      {/* <div className="row-span-1 h-10vh flex items-center justify-center w-screen">
        <Dialogs />
      </div> */}
      <div className="bg-gray-900 bg-opacity-50 grid h-screen justify-items-center">
        <Routes>
          <Route index element={<RegisterPage />} path="/" />
          <Route element={<Homepage />} path="/homepage" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
