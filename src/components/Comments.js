import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import "./comments.scss";
import SubComments from "./SubComments";
const Comments = ({ board_id, replyList }) => {
  // 로그인 후 현재 경로로 돌아오기 위해 useLocation 사용
  const location = useLocation();
  const navigate = useNavigate();
  const [commentList, setCommentList] = useState(replyList);
  // 입력한 댓글 내용
  const [content, setContent] = useState("");
  const isAuth = useSelector((state) => state.Auth.isLogin);
  const USERID = useSelector((state) => state.Auth.id);
  // 현재 페이지, 전체 페이지 갯수
  // modal이 보이는 여부 상태
  const [show, setShow] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showUpdateReply, setShowUpdateReply] = useState(false);
  const [click, setClick] = useState(false);

  const [replyId, setReplyId] = useState(0);
  const [replyContent, setReplyContent] = useState("");
  const [addReplyContent, setAddReplyContent] = useState("");
  // 페이지에 해당하는 댓글 목록은 page 상태가 변경될 때마다 가져옴
  // 맨 처음 페이지가 1이므로 처음엔 1페이지에 해당하는 댓글을 가져온다

  // 댓글 추가하기, 댓글 추가하는 API는 인증 미들웨어가 설정되어 있으므로
  // HTTP HEADER에 jwt-token 정보를 보내는 interceptor 사용
  const submitSuper = useCallback(async () => {
    const comment = {
      boardId: board_id,
      // DB에 엔터가 먹힌 상태로 들어가므로 제대로 화면에 띄우기 위해 <br>로 치환
      content: content,
    };
    // axios interceptor 사용 : 로그인한 사용자만 쓸 수 있다!
    await axios.post("/api/v1/boards/reply/create/super", comment);
    alert("댓글 등록 완료");
    window.location.reload();
  }, [content]);
  const submitSub = useCallback(async () => {
    const sub = {
      replyId: replyId,
      content: addReplyContent,
    };
    await axios.post("/api/v1/boards/reply/create/sub", sub);
    alert("댓글 등록 완료");
  });
  /*modal 관련 코드*/
  // 로그인 후 돌아올 수 있게 현재 경로 세팅
  const goLogin = () => {
    setShow(false);
    navigate(`/login?redirectUrl=${location.pathname}`);
  };
  // 로그인을 하지 않은 상태에서 댓글 입력 창을 클릭하면 Modal이 열림.
  const isLogin = () => {
    if (!isAuth) {
      setShow(true);
    }
  };

  const updateReply = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setReplyContent(e.target.value);
  };

  const getTextArea = () => {
    setClick(!click);
  };
  console.log(replyId);
  console.log(commentList);
  return (
    <div className="comments-wrapper">
      <div className="comments-body">
        {commentList.map((item, index) => (
          <div key={index} className="comments-comment">
            <div className="comment-username">{item.userNickname}</div>
            <div className="comment-content">{item.content}</div>
            <div className="comment-username-date">
              <div className="comment-date">
                {moment(item.created)
                  .add(9, "hour")
                  .format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <Button
                className="add-reply-button"
                onClick={() => {
                  setReplyId(item.id);
                  getTextArea();
                }}
              >
                <p>답글쓰기</p>
              </Button>
              {isLogin && USERID === item.userId && (
                <div className="edit-delete-button">
                  <Button
                    className="delete-button"
                    onClick={() => {
                      setReplyId(item.id);
                      setShowReply(true);
                    }}
                  >
                    <p>삭제</p>
                  </Button>
                  <Button
                    className="delete-button"
                    onClick={() => {
                      //댓글 수정하는 부분//
                      setReplyId(item.id);
                      setShowUpdateReply(true);
                      setReplyContent(item.content);
                    }}
                  >
                    <p>수정</p>
                  </Button>
                </div>
              )}
            </div>
            {click && item.id === replyId ? (
              <div className="comments-addReply">
                <TextField
                  className="comments-addReply-textarea"
                  maxRows={2}
                  onClick={isLogin}
                  onChange={(e) => {
                    setAddReplyContent(e.target.value);
                  }}
                  multiline
                  placeholder="댓글을 입력해주세요✏️"
                />
                {addReplyContent !== "" ? (
                  <>
                    <Button
                      className="comments-addReply-button"
                      variant="outlined"
                      onClick={submitSub}
                    >
                      등록
                    </Button>
                  </>
                ) : (
                  <Button
                    className="comments-addReply-button"
                    variant="outlined"
                    disabled={true}
                  >
                    등록
                  </Button>
                )}
                <Button
                  className="comments-addReply-button"
                  variant="outlined"
                  onClick={getTextArea}
                >
                  취소
                </Button>
              </div>
            ) : (
              <></>
            )}
            <div className="cooments-footer">
              <SubComments reply_id={item.id} subReplyList={item.children} />
            </div>
          </div>
        ))}
        <div className="comments-header">
          <TextField
            className="comments-header-textarea"
            maxRows={3}
            onClick={isLogin}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            multiline
            placeholder="댓글을 입력해주세요✏️"
          />
          {content !== "" ? (
            <Button variant="outlined" onClick={submitSuper}>
              등록하기
            </Button>
          ) : (
            <Button variant="outlined" disabled={true}>
              등록하기
            </Button>
          )}
        </div>
      </div>

      {/*modal*/}
      <Dialog open={show}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => {
              setShow(false);
            }}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title">로그인이 필요합니다</div>
            <div className="modal-content">
              로그인 페이지로 이동하시겠습니까?
            </div>
            <div className="modal-button">
              <Button variant="outlined" color="error" onClick={goLogin}>
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShow(false);
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/*modal*/}
      <Dialog open={showReply}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShowReply(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <div className="modal">
            <div className="modal-title"> 정말 삭제하시겠습니까 ?</div>
            <div className="modal-button">
              <Button
                variant="outlined"
                color="error"
                onClick={async () => {
                  setShowReply(false);
                  await axios.post(`/api/v1/boards/reply/delete/${replyId}`);
                  alert("댓글이 삭제되었습니다😊");
                  window.location.href = `${board_id}`;
                }}
              >
                예
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShowReply(false);
                }}
              >
                아니오
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showUpdateReply}>
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={() => setShowUpdateReply(false)}
          >
            <DisabledByDefaultOutlinedIcon />
          </IconButton>
          <form>
            <div className="modal-body">
              <div className="form-group">
                <TextField
                  label="댓글 내용"
                  name="content"
                  variant="outlined"
                  type="text"
                  onChange={updateReply}
                  defaultValue={replyContent}
                  size="small"
                  autoFocus={true}
                />
              </div>
            </div>
            <div className="modal-button">
              <Button
                className="modal"
                variant="outlined"
                color="success"
                onClick={async () => {
                  setShowUpdateReply(false);
                  const content = replyContent;
                  await axios.post(`/api/v1/boards/reply/update`, {
                    replyId,
                    content,
                  });
                  alert("게시물이 수정되었습니다");
                  window.location.href = `${board_id}`;
                }}
              >
                수정하기
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  setShowUpdateReply(false);
                }}
              >
                닫기
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Comments;
