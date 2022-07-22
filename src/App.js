import "./App.css";
import Toggle from "./Components/Toggle/Toggle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homescreen from "./Components/Screens/Homescreen";
import CalenderScreen from './Components/Screens/CalenderScreen';
import Favourites from './Components/Screens/FavouriteScreen';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/calender" element={<CalenderScreen/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
