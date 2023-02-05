import { Pagination } from "@mui/material";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "../board-list/boardList.scss";
import moment from "moment";
import { FiLayers } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineFire } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { IoChatboxOutline } from "react-icons/io5";
import { BsPencilSquare } from "react-icons/bs";
const MyBoardList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // user의 id를 알아내기 위해 token 가져오기
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const userId = useSelector((state) => state.Auth.id);
  let [click, setClick] = useState("latest");
  const getBoardByPreference = async (e) => {
    const page_number = searchParams.get("page");
    setClick(e);
    try {
      const { data } = await axios.get(
        `/api/v1/mypage/board/${e}?page=${page_number}&size=5`
      );
      setBoardList(data.content);
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };
  // 렌더링 되고 한번만 전체 게시물 갯수 가져와서 페이지 카운트 구하기
  // 렌더링 되고 한번만 페이지에 해당하는 게시물 가져오기
  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기
    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      const { data } = await axios.get(
        `/api/v1/mypage/board/latest?page=${page_number}&size=5`
      );
      console.log(data);
      setPageCount(data.totalPages);
      return data;
    };
    getBoardList().then((result) => setBoardList(result.content));
  }, []);

  return (
    <div className="boardList-wrapper">
      <div className="boardList-header">
        <div
          className={
            click == "latest"
              ? "boardList-item-active"
              : "boardList-item-notActive"
          }
          onClick={() => getBoardByPreference("latest")}
        >
          <BsPencilSquare className="icon" />
          <p>내가 작성한 게시물</p>
        </div>
        <div
          className={
            click == "liked"
              ? "boardList-item-active"
              : "boardList-item-notActive"
          }
          onClick={() => getBoardByPreference("liked")}
        >
          <AiOutlineHeart className="icon" />
          <p>내가 좋아요 누른 게시물</p>
        </div>
        <div
          className={
            click == "replied"
              ? "boardList-item-active"
              : "boardList-item-notActive"
          }
          onClick={() => getBoardByPreference("replied")}
        >
          <IoChatboxOutline className="icon" />
          <p>내가 댓글 작성한 게시물</p>
        </div>
      </div>
      <div className="boardList-body">
        {boardList.map((item, index) => (
          <Card
            key={item.id}
            username={item.nickname}
            date={moment(item.created).add(9, "hour").format("YYYY-MM-DD")}
            title={item.title}
            content={item.content}
            board_id={item.id}
            img_url={item.imgUrl}
            view={item.view}
            likeCount={item.likeCount}
            likeStatus={item.liked}
          />
        ))}
      </div>
      <div className="boardList-footer">
        {/*페이지네이션: count에 페이지 카운트, page에 페이지 번호 넣기*/}
        <Pagination
          variant="outlined"
          color="primary"
          page={Number(searchParams.get("page"))}
          count={pageCount}
          size="large"
          onChange={(e, value) => {
            window.location.href = `/myboard-list?page=${value}`;
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
export default MyBoardList;
