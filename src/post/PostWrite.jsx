/** @jsxImportSource @emotion/react */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as s from "./PostWrite_style";

export default function PostWrite() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    try {
      const userString = localStorage.getItem("user");

      if (!userString) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      const user = JSON.parse(userString);

      if (!formData.title.trim()) {
        setErrorMessage("제목을 입력해주세요.");
        return;
      }

      if (!formData.content.trim()) {
        setErrorMessage("내용을 입력해주세요.");
        return;
      }

      if (!user.nickname) {
        setErrorMessage("사용자 닉네임 정보가 없습니다.");
        return;
      }

      const requestBody = {
        nickname: user.nickname,
        title: formData.title.trim(),
        content: formData.content.trim(),
      };

      await axios.post("http://localhost:8080/posts", requestBody);

      alert("게시글이 등록되었습니다.");
      navigate("/posts");
    } catch (error) {
      console.error("게시글 작성 오류:", error);
      setErrorMessage("게시글 작성에 실패했습니다.");
    }
  };

  return (
    <div css={s.container}>
      <div css={s.writeBox}>
        <h2 css={s.title}>게시글 작성</h2>

        <input
          css={s.input}
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          css={s.textarea}
          name="content"
          placeholder="내용을 입력하세요"
          value={formData.content}
          onChange={handleChange}
        />

        {errorMessage && <p css={s.errorText}>{errorMessage}</p>}

        <div css={s.buttonGroup}>
          <button
            css={s.cancelButton}
            type="button"
            onClick={() => navigate(-1)}
          >
            취소
          </button>
          <button
            css={s.submitButton}
            type="button"
            onClick={handleSubmit}
          >
            작성하기
          </button>
        </div>
      </div>
    </div>
  );
}