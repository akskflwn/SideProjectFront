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
import "./subComments.scss";
import { BiReply } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";

const SubComments = ({ board_id, subReplyList }) => {
  const [commentList, setCommentList] = useState(subReplyList);
  const isAuth = useSelector((state) => state.Auth.isLogin);
  const USERID = useSelector((state) => state.Auth.id);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [click, setClick] = useState(false);
  const [replyId, setReplyId] = useState(0);
  const [UpdateReplyContent, setUpdateReplyContent] = useState("");

  const getTextArea = () => {
    setClick(!click);
  };
  const isLogin = () => {
    if (!isAuth) {
      setShow(true);
    }
  };
  const goLogin = () => {
    setShow(false);
    navigate(`/login?redirectUrl=${location.pathname}`);
  };

  const updateReply = async () => {
    const reply = {
      replyId: replyId,
      content: UpdateReplyContent,
    };
    try {
      await axios.post(`/api/boards/reply/update`, reply);
      alert("댓글 수정 완료");
      window.location.reload();
    } catch (e) {
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="subComments-wrapper">
      {/* <div className="comments-header"> */}
      <div className="subComments-body">
        {commentList.map((reply, index) => (
          <div key={index} className="subComments-comment">
            <div className="subComments-username">
              {reply.userNickname}
              <BiReply style={{ transform: "rotate(180deg)" }} />
            </div>
            <div className="subComments-content">{reply.content}</div>
            <div className="subComments-username-date">
              <div className="subComments-date">
                {moment(reply.created)
                  .add(9, "hour")
                  .format("YYYY-MM-DD HH:mm:ss")}
              </div>
              {isLogin && USERID === reply.userId && (
                <div className="subComments-delete-button">
                  <Button
                    className="subComments-button"
                    onClick={() => {
                      if (window.confirm("댓글을 삭제하시겠습니까?")) {
                        axios.post(`/api/boards/reply/delete/${reply.id}`);
                        alert("댓글이 삭제되었습니다😊");
                        window.location.href = `${board_id}`;
                      }
                    }}
                  >
                    <p>삭제</p>
                  </Button>
                  <Button
                    className="subComments-button"
                    onClick={() => {
                      setReplyId(reply.id);
                      getTextArea();
                    }}
                  >
                    <p>수정</p>
                  </Button>
                </div>
              )}
            </div>
            {click && reply.id === replyId ? (
              <div className="comments-addReply">
                <TextField
                  className="comments-addReply-textarea"
                  maxRows={2}
                  onChange={(e) => {
                    setUpdateReplyContent(e.target.value);
                  }}
                  multiline
                  placeholder="수정하실 댓글을 입력해주세요✏️"
                  defaultValue={reply.content}
                />
                {UpdateReplyContent !== "" ? (
                  <>
                    <Button
                      className="comments-addReply-button"
                      variant="outlined"
                      onClick={updateReply}
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
                  onClick={() => {
                    setReplyId(replyId);
                    getTextArea();
                  }}
                >
                  취소
                </Button>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
      {/* </div> */}

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
    </div>
  );
};
export default SubComments;
