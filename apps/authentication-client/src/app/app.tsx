import RegisterPage from '../pages/RegisterPage';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
