import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback, useState } from "react";
import ImageUploader from "../../components/ImageUploader";
import TextArea from "../../components/TextArea";
import { Button } from "@mui/material";
import "./addBoard.scss";
import { toast, ToastContainer } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { color } from "@mui/system";

const AddBoard = () => {
  const isLogin = useSelector((state) => state.Auth.isLogin);
  const navigate = useNavigate();
  // 게시판 제목, 내용, 사진
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "image/default_image.png",
  });

  const canSubmit = useCallback(() => {
    return image.image_file !== "" && content !== "" && title !== "";
  }, [image, title, content]);

  const handleSubmit = useCallback(async () => {
    try {
      const formData = new FormData();
      // formData.append("title", title);
      // formData.append("content", content);
      const data = {
        categoryId: 1,
        title: title,
        content: content,
      };

      const request = JSON.stringify(data);
      formData.append(
        "request",
        new Blob([request], { type: "application/json" })
      );
      formData.append("multipartFile", image.image_file);
      await axios.post("/api/boards/create", formData);
      window.alert("게시글 등록 성공" + "😃");
      navigate("/board-list");
    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data + "😭", {
        position: "top-center",
      });
    }
  }, [canSubmit]);

  const onChangeContent = (e) => {
    setContent(e);
  };
  return (
    <div className="addBoard-wrapper">
      <ToastContainer />
      <div className="addBoard-header">게시물 등록하기 🖊️</div>
      <div className="submitButton">
        {canSubmit() ? (
          <Button
            onClick={handleSubmit}
            className="success-button"
            variant="outlined"
          >
            등록하기😃
          </Button>
        ) : (
          <Button className="disable-button" variant="outlined" size="large">
            사진과 내용을 입력해주세요
          </Button>
        )}
      </div>

      <div className="addBoard-title">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
            console.log(title);
          }}
          className="title"
          placeholder="제목을 입력하세요"
          autoFocus={true}
        />
      </div>
      <div className="addBoard-body">
        <ImageUploader setImage={setImage} preview_URL={image.preview_URL} />
        <ReactQuill
          className="content"
          onChange={(e) => {
            onChangeContent(e);
          }}
          placeholder="내용을 입력하세요"
        />
      </div>
    </div>
  );
};

export default AddBoard;
