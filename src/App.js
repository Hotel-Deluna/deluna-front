import Header from './components/layout/js/header';
import Footer from './components/layout/js/footer';
import Main from "./pages/js/main"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelInfo from "./pages/js/hotelInfo";
import JoinPage from './pages/js/joinPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/auth/hotel/info" element={<HotelInfo />}></Route>
          <Route path="/auth/join" element={<JoinPage />}></Route>
				</Routes>
        <Footer />
			</BrowserRouter>
    </div>
  );
}

export default App;
