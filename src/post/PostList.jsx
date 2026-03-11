/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 목록 조회 오류:", error);
        setErrorMessage("게시글 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <div style={{ padding: "40px" }}>로딩 중...</div>;
  }

  if (errorMessage) {
    return <div style={{ padding: "40px" }}>{errorMessage}</div>;
  }

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px" }}>
      
      {/* 상단 버튼 영역 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>게시글 목록</h2>

        <div>
          <button
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/")}
          >
            홈으로
          </button>

          <button onClick={() => navigate("/posts/write")}>
            글 작성
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <p>등록된 게시글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "14px",
              cursor: "pointer",
            }}
          >
            <h3 style={{ margin: "0 0 10px 0" }}>{post.title}</h3>

            <p style={{ margin: "0 0 8px 0", color: "#666" }}>
              작성자: {post.nickname}
            </p>

            <p
              style={{
                margin: 0,
                color: "#444",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {post.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}