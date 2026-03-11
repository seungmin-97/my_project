/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("게시글 조회 오류:", error);
        setErrorMessage("게시글을 불러오지 못했습니다.");
      }
    };

    fetchPost();
  }, [id]);

  if (errorMessage) {
    return <div style={{ padding: "40px" }}>{errorMessage}</div>;
  }

  if (!post) {
    return <div style={{ padding: "40px" }}>로딩 중...</div>;
  }

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "24px" }}>
      <h1>{post.title}</h1>
      <p><strong>작성자:</strong> {post.nickname}</p>
      <p><strong>작성일:</strong> {post.createdAt}</p>
      <hr />
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px" }}>
        {post.content}
      </div>

      <button
        style={{ marginTop: "24px" }}
        onClick={() => navigate("/")}
      >
        목록으로
      </button>
    </div>
  );
}