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

const SubComments = ({ board_id, subReplyList }) => {
  const [commentList, setCommentList] = useState(subReplyList);
  const isAuth = useSelector((state) => state.Auth.isLogin);
  const USERID = useSelector((state) => state.Auth.id);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = () => {
    if (!isAuth) {
      setShow(true);
    }
  };
  const goLogin = () => {
    setShow(false);
    navigate(`/login?redirectUrl=${location.pathname}`);
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
                  <Button className="subComments-button" onClick={() => {}}>
                    <p>삭제</p>
                  </Button>
                  <Button
                    className="subComments-button"
                    onClick={() => {
                      //댓글 수정하는 부분//
                    }}
                  >
                    <p>수정</p>
                  </Button>
                </div>
              )}
            </div>
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
