import Header from './components/layout/js/header';
import Footer from './components/layout/js/footer';
import Main from "./pages/js/main"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelInfo from "./pages/js/hotelInfo";
import JoinPage from './pages/js/joinPage';
import LoginPage from './pages/js/loginPage';
import HotelMain from "./pages/js/hotelMain";
import HotelRoomList from "./pages/js/hotelRoomList";
import HotelSearch from "./pages/js/hotelSearch";
import ClientReservation from './pages/js/clientReservation';
import FindId from './pages/js/findId';
import FindPassword from './pages/js/findPassword';
import ChangePassword from "./pages/js/changePassword";
import HotelRoomDetailListPage from './pages/js/hotelRoomDetailListPage';
import HotelReservationPage from './pages/js/hotelReservationPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/auth/hotel/info/" element={<HotelInfo />}></Route>
          <Route path="/auth/join" element={<JoinPage />}></Route>
          <Route path="/auth/login" element={<LoginPage />}></Route>
          <Route path="/auth/hotel/main" element={<HotelMain />}></Route>
          <Route path="/auth/hotel/roomList" element={<HotelRoomList />}></Route>
          <Route path="/auth/hotel/roomDetailList" element={<HotelRoomDetailListPage />}></Route>
          <Route path="/auth/hotel/reservationList" element={<HotelReservationPage />}></Route>
          <Route path="/search" element={<HotelSearch/>}></Route>
          <Route path="/reservationList" element={<ClientReservation/>}></Route>
          <Route path='/auth/findId' element={<FindId/>}></Route>
          <Route path='/auth/findPassword' element={<FindPassword/>}></Route>
          <Route path='/auth/changePassword' element={<ChangePassword/>}></Route>
				</Routes>
        <Footer />
			</BrowserRouter>
    </div>
  );
}

export default App;
