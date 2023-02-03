import "./card.scss";
import { useNavigate } from "react-router-dom";
import { BsEye } from "react-icons/bs";
export const Card = ({
  board_id,
  title,
  content,
  img_url,
  username,
  date,
  view,
  like,
  likeStatus,
}) => {
  const navigate = useNavigate();

  console.log(board_id);
  console.log(likeStatus);
  return (
    <div
      className="card-wrapper"
      onClick={() => {
        navigate(`/board/${board_id}`);
      }}
    >
      <section className="card-header">
        <div className="infoItem">
          <BsEye size={16} color={"#9A9A9A"} />
          <p className="views">{view}</p>
        </div>
        {likeStatus ? (
          <>
            <div className="infoItem">
              <img
                className="itemImg2"
                src="/image/heart_filled.png"
                alt="likes"
              />
              <p>{like}</p>
            </div>
          </>
        ) : (
          <>
            <div className="infoItem">
              <img
                className="itemImg"
                src="/image/heart_filled1.png"
                alt="likes"
              />
              <p>{like}</p>
            </div>
          </>
        )}
      </section>

      <div className="card-body-img">
        <img src={img_url} />
      </div>

      <div className="card-body-text">
        <div className="card-body-text-title">{title}</div>
        <div className="card-body-text-content">{content}</div>
      </div>

      <div className="card-footer">
        <div className="username">{username}</div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
};
