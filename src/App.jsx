import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import UserDetails from "./components/UserDetails/UserDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateUser from "./components/update/UpdateUser";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterUser />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/getUsers" element={<UserDetails />} />
          <Route path="/edit/:userId" element={<UpdateUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
