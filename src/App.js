import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* 인증이 필요한 컴포넌트는 아래처럼 PrivateRoute 컴포넌트 사용!*/}
        <Route path="/add-board" element={<PrivateRoute path="/add-board" />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;
