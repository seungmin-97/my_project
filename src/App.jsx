// App.jsx
import { Routes, Route } from "react-router-dom";
import Login from "./LoginPage/Login.jsx";
import Signup from "./LoginPage/SigninPage/Signup.jsx";
import PlayersPage from "./pages/PlayersPage.jsx";
import Home from "./pages/Home.jsx";
import MatchAverage from "./Search/MatchAvg.jsx";

function App() {
  return (
    <Routes>
      <Route path="/matchAverage" element={<MatchAverage/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;