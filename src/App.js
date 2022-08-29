import { Route, Routes } from "react-router-dom";
// import "./App.css";
import Countries from "./pages/Countries";
import SearchCountry from "./pages/SearchCountry";
import NewCountry from "./pages/NewCountry";
import DeleteCountry from "./pages/DeleteCountry";
import UpdateCountry from "./pages/UpdateCountry";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Countries />} />
        <Route path="/search" element={<SearchCountry />} />
        <Route path="/new-country" element={<NewCountry />} />
        <Route path="/delete-country" element={<DeleteCountry />} />
        <Route path="/update-country" element={<UpdateCountry />} />
      </Routes>
    </div>
  );
}

export default App;
