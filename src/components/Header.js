import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLogin, setUser } from "../redux/reducers/AuthReducer";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (isLogin) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [isLogin]);
  // 비동기로 처리!
  const logout = async () => {
    try {
      await axios.get("/api/v1/logout");
      dispatch(setLogin(false));
      dispatch(setUser(0));
      alert("로그아웃 되었습니다😎");
      navigate("/");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="header-wrapper">
      <div className="header-title">
        <Link to="/">
          <span>SideProject</span>
        </Link>
      </div>
      <div className="header-menu">
        <Link to="/board-list/?page=1">게시판</Link>
        <Link to="/add-board">글쓰기</Link>
        {isAuth ? (
          <>
            <Link to="/myboard-list/?page=1">내 게시물</Link>
            <Link to="#" onClick={logout}>
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/sign-up">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
