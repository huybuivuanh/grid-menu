import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/HomePage";
import Grid50 from "./pages/Grid50";
import Grid100 from "./pages/Grid100";
import Grid300 from "./pages/Grid300";
import Grid500 from "./pages/Grid500";
import Dropdown50 from "./pages/Dropdown50";
import Dropdown100 from "./pages/Dropdown100";
import Dropdown300 from "./pages/Dropdown300";
import Dropdown500 from "./pages/Dropdown500";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/grid-50" element={<Grid50 />} />
        <Route path="/grid-100" element={<Grid100 />} />
        <Route path="/grid-300" element={<Grid300 />} />
        <Route path="/grid-500" element={<Grid500 />} />
        <Route path="/dropdown-50" element={<Dropdown50 />} />
        <Route path="/dropdown-100" element={<Dropdown100 />} />
        <Route path="/dropdown-300" element={<Dropdown300 />} />
        <Route path="/dropdown-500" element={<Dropdown500 />} />
      </Routes>
    </Router>
  );
}

export default App;
