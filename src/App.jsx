import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import CartsPage from "./pages/CartsPage";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    // for sesson user
    const isUserAlreadyLoggedIN = sessionStorage.getItem("currentUser");
    if (isUserAlreadyLoggedIN && isUserAlreadyLoggedIN !== "undefined") {
      const tempUser = JSON.parse(sessionStorage.getItem("currentUser"));
      setCurrentUser({ ...tempUser });
    } else {
      sessionStorage.setItem("currentUser", JSON.stringify(null));
      setCurrentUser(null);
    }
  }, []);

  const addUserInState = (comingUser) => {
    setCurrentUser({ ...comingUser });
    sessionStorage.setItem("currentUser", JSON.stringify(comingUser));
  };

  const removeUserInState = () => {
    setCurrentUser({});
    sessionStorage.setItem("currentUser", null);
  };
  return (
    <div>
      <Navbar currentUser={currentUser} removeUserInState={removeUserInState} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />}></Route>
        <Route
          path="/login"
          element={<Login addUserInState={addUserInState} />}
        ></Route>
        <Route
          path="/cart"
          element={<CartsPage currentUser={currentUser} />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
