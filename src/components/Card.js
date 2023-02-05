import "./card.scss";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
export const Card = ({
  board_id,
  title,
  content,
  img_url,
  username,
  date,
  view,
  likeCount,
  likeStatus,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(likeStatus);
  const [LikeCnt, setLikeCnt] = useState(likeCount);

  const hitLike = async () => {
    try {
      console.log(isLiked);
      setIsLiked(!isLiked);
      if (isLiked) {
        setLikeCnt(LikeCnt - 1);
      } else {
        setLikeCnt(LikeCnt + 1);
      }
      await axios.post(`/api/v1/boards/like/${board_id}`);

      alert("좋아요 완료 되었습니다😎");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <>
      <div className="card-wrapper">
        <div
          className="move"
          onClick={() => {
            navigate(`/board/${board_id}`);
          }}
        >
          <div className="card-header">
            <div className="date">{date}</div>
          </div>
          <div className="card-body-img">
            <img src={img_url} />
          </div>

          <div className="card-body-text">
            <div className="card-body-text-title">{title}</div>
            <div className="card-body-text-content">{content}</div>
          </div>
        </div>
        <div className="card-footer">
          <div className="infoItem-username">
            <BsEye size={16} color={"#9A9A9A"} />
            <p className="card-username">{username}</p>
          </div>
          <div className="infoItem">
            <BsEye size={16} color={"#9A9A9A"} />
            <p className="views">{view}</p>
          </div>
          {isLiked ? (
            <>
              <div className="infoItem" onClick={hitLike}>
                <img
                  className="itemImg2"
                  src="/image/heart_filled.png"
                  alt="likes"
                />
                <p>{LikeCnt}</p>
              </div>
            </>
          ) : (
            <>
              <div className="infoItem" onClick={hitLike}>
                <img
                  className="itemImg"
                  src="/image/heart_filled1.png"
                  alt="likes"
                />
                <p>{LikeCnt}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
