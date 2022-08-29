import Header from './components/layout/js/header';
import Footer from './components/layout/js/footer';
import Main from "./pages/js/main"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelInfo from "./pages/js/hotelInfo";
import Join from './pages/js/join';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/auth/hotel/info" element={<HotelInfo />}></Route>
          <Route path="/auth/join" element={<Join />}></Route>
				</Routes>
        <Footer />
			</BrowserRouter>
    </div>
  );
}

export default App;
