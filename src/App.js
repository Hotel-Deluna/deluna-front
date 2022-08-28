import Header from './components/layout/js/header';
import Footer from './components/layout/js/footer';
import Main from "./pages/js/main"

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelRegis from "./pages/js/hotelRegistration";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<Main />}></Route>
          <Route path="/auth/hotelRegis" element={<HotelRegis />}></Route>
				</Routes>
        <Footer />
			</BrowserRouter>
    </div>
  );
}

export default App;
