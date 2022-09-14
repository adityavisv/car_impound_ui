import logo from './logo.svg';
import './App.css';
import Loginpage from './pages/Loginpage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registerpage from './pages/RegisterPage';
import SidebarComponent from './components/SidebarComponent';
import CarRegistrationPage from './pages/CarRegistrationPage';

function App() {
  return (
    // <div className="App">
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/register" element={<Registerpage />}/>
            <Route path="/home" element={<SidebarComponent />}/>
            <Route path="/registerCar" element={<CarRegistrationPage />}/>
        </Routes>
      </BrowserRouter>
      {/* <Loginpage/> */}
    </div>
  );
}

export default App;
