import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import SignUp from "./pages/signUp/SignUp";
import Login from "./pages/login/Login";
import PrivateRoute from "./routes/PrivateRoute";
import AddBoard from "./pages/add-board/AddBoard";
import BoardList from "./pages/board-list/BoardList";
import MyBoardList from "./pages/myboard-list/MyBoardList";
import Board from "./pages/board/Board";

const App = () => {
  const location = useLocation();
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/add-board"
          element={<PrivateRoute path="/add-board" component={AddBoard} />}
        />
        <Route path="/board-list" element={<BoardList />} />
        <Route
          path="/myboard-list"
          element={
            // 쿼리 파라미터가 존재하므로 전체 url을 PrivateRoute에 넘겨준다
            <PrivateRoute
              path={`${location.pathname}`}
              component={MyBoardList}
            />
          }
        />
        <Route path="/board/:board_id" element={<Board />} />
      </Routes>
    </React.Fragment>
  );
};
export default App;
