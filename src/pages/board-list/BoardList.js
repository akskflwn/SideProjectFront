import { Pagination } from "@mui/material";
import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import "./boardList.scss";
import moment from "moment";

const BoardList = () => {
  const [pageCount, setPageCount] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // 렌더링 되고 한번만 전체 게시물 갯수 가져와서 페이지 카운트 구하기
  // 렌더링 되고 한번만 페이지에 해당하는 게시물 가져오기
  useEffect(() => {
    // 페이지에 해당하는 게시물 가져오기
    const getBoardList = async () => {
      const page_number = searchParams.get("page");
      const { data } = await axios.get(
        `/api/v1/boards/list?page=${page_number}&size=5`
      );
      console.log(data);
      setPageCount(data.totalPages);
      return data;
    };
    // 현재 페이지에 해당하는 게시물로 상태 변경하기
    getBoardList().then((result) => setBoardList(result.content));
    // 게시물 전체 갯수 구하기
    // 페이지 카운트 구하기: (전체 board 갯수) / (한 페이지 갯수) 결과 올림
  }, []);

  return (
    <div className="boardList-wrapper">
      <div className="boardList-header">전체 게시물 📝</div>
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
            window.location.href = `/board-list?page=${value}`;
          }}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
};
export default BoardList;
