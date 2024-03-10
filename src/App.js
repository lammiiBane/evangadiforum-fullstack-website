import axios from "axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import AskQuestion from "./Pages/Askquestion/Askquestion";
import AnsQuestion from "./Pages/AnsQuestion/AnsQuestion";
import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import LandingPage from "./Pages/MiddleSection/LandingPage";
import SignUp from "./Pages/SignUp/SignUp";
function App() {
  const [userData, setUserData] = useContext(UserContext);
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      const userRes = await axios.get("http://localhost:4000/api/users", {
        headers: { "x-auth-token": token },
      });
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header logout={logout} />
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home logout={logout} />} />
          <Route path="/home" element={<Home logout={logout} />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path={`/answer/:questionId`} element={<AnsQuestion />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
export default App;

