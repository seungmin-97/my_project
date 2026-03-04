import React, { useEffect, useState } from "react";
import { fetchPlayers } from "../api/players";
import { Link } from "react-router-dom";

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchPlayers();
        setPlayers(data);
      } catch (err) {
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadPlayers();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>플레이어 목록</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Account ID</th>
            <th>Nickname</th>
            <th>Platform</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td>{player.id}</td>
              <td>{player.pubgAccountId}</td>
              <td>{player.nickname}</td>
              <td>{player.platform}</td>
              <td>{player.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/login">로그인</Link>
      <p>또는</p>
      <Link to="/signup">회원가입</Link>
    </div>
  );
};

export default PlayersPage;