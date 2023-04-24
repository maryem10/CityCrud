import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import City from "./pages/City";
import ZoneManagementComponent from "./pages/ZoneManagementComponent";
import CityList from "./pages/CityList";



import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
      <div>


    <Router>
      <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<City />} />
          <Route path="/lists" element={<ZoneManagementComponent />} />
        </Routes>
      </div>

    </Router>
      </div>
  );
}

export default App;
