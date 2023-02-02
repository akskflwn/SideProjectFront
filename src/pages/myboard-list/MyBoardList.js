import { Pagination } from "@mui/material";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../board-list/boardList.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";

const MyBoardList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // user의 id를 알아내기 위해 token 가져오기
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const userId = useSelector((state) => state.Auth.id);
  // 렌더링 되고 한번만 전체 게시물 갯수 가져와서 페이지 카운트 구하기
  // 렌더링 되고 한번만 페이지에 해당하는 게시물 가져오기
  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기
    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      const { data } = await axios.get(
        `/api/v1/mypage/board?page=${page_number}&size=5`
      );
      setPageCount(data.totalPages);
      return data;
    };
    getBoardList().then((result) => setBoardList(result.content));
  }, []);

  return (
    <div className="boardList-wrapper">
      <div className="boardList-header">나의 게시물 📝</div>
      <div className="boardList-body">
        {boardList.map((item, index) => (
          <Card
            key={item.id}
            username={item.userNickname}
            date={moment(item.created).add(9, "hour").format("YYYY-MM-DD")}
            title={item.title}
            content={item.content}
            board_id={item.id}
            img_url={item.imgUrl}
            view={item.view}
            like={item.likeCount}
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
