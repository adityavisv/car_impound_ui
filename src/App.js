import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registerpage from './pages/RegisterPage';
import ParkingLotCounterViewPage from './pages/ParkingLotCounterViewPage';
import CarRegistrationPage from './pages/CarRegistrationPage';
import SearchPage from './pages/SearchPage';
import ParkingLotSelectorView from './components/ParkingSelectorView';
import { Loginpage } from './pages/Loginpage';

function App() {
  return (
    // <div className="App">
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/register" element={<Registerpage />}/>
            <Route path="/home" element={<ParkingLotCounterViewPage />}/>
            <Route path="/registerCar" element={<CarRegistrationPage />}/>
            <Route path="/search" element={<SearchPage />}/>
            <Route path="/parkingview" element={<ParkingLotSelectorView />} />
        </Routes>
      </BrowserRouter>
      {/* <Loginpage/> */}
    </div>
  );
}

export default App;
