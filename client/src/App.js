import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Otp from './pages/Otp';
import Error from './pages/Error';
import { Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Booking from './pages/Booking/Booking';
import Funded from './pages/Booking/Funded';
import Exited from './pages/Booking/Exited';
import About from './pages/About/About';
import Itemtoexport from './pages/Itemtoexport/Itemtoexport';
import Fundeded from './pages/Itemtoexport/Fundeded';
import Exiteded from './pages/Itemtoexport/Exiteded';
import Wallet from './pages/Wallet/Wallet';
import Portfolio from './pages/Portfolio/Portfolio';
import Home from './pages/Home/Home';
import Cartitems from './pages/cart/Cartitems';
import Propertiesoverview from './pages/propertiesview/Propertiesoverview';
import Verificaton from './pages/Verification/Verificaton';
import Admindash from './pages/Admin/Admindash';
import axios from 'axios';
import { UserContext, UserContextProvider } from './pages/userContext/Usercontext';
import { useContext } from 'react';
import Addtrade from './pages/Admin/Addtrade/Addtrade';
import Edittrade from './pages/Admin/Addtrade/Edittrade';
import DepositPage from './Components/cart/wallet/DepositPage';
import WithdrawPage from './Components/cart/wallet/WithdrawPage';
import WithdrawAccept from './pages/Admin/Withdraws/WithdrawAccept';
import { WalletProvider } from './Components/cart/wallet/walletContext/WalletContext';
import Addprofit from './pages/Admin/Addprofit/Addprofit';


function App() {
  axios.defaults.withCredentials = true;
  const { id } = useContext(UserContext)
  console.log(id);
  return (
    <>
      <UserContextProvider>
        <WalletProvider>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/booking' element={<Booking />} />
            <Route path='/funded' element={<Funded />} />
            <Route path='/exited' element={<Exited />} />
            <Route path='/about' element={<About />} />
            <Route path='/itemtoexport' element={<Itemtoexport />} />
            <Route path='/fundeded' element={<Fundeded />} />
            <Route path='/exiteded' element={<Exiteded />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/portfolio' element={<Portfolio />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cart' element={<Cartitems />} />
            <Route path='/propertiesview/:id' element={<Propertiesoverview />} />
            <Route path='/verification' element={<Verificaton />} />
            <Route path='/admindash' element={<Admindash />} />
            <Route path='/register' element={<Register />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/user/otp' element={<Otp />} />
            <Route path='*' element={<Error />} />
            <Route path='/addtrade' element={<Addtrade />} />
            <Route path='/edittrade/:id' element={<Edittrade />} />
            <Route path='/addprofit/:id' element={<Addprofit />} />
            <Route path='/deposit' element={<DepositPage />} />
            <Route path='/withdraw' element={<WithdrawPage />} />
            <Route path='/withdrawaccept' element={<WithdrawAccept />} />
          </Routes>
        </WalletProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
