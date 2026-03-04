import React, { useMemo } from "react";
import { accountId, matches } from "./mock";
import { Link } from "react-router-dom";

export default function MatchAverage() {
  const { playerName, averages, meta } = useMemo(() => {
    // ✅ player info
    const playerData = matches.find((item) => item?.data?.[0]?.type === "player");
    const player = playerData?.data?.[0];

    const name = player?.attributes?.name || "Unknown Player";
    const shardId = player?.attributes?.shardId || "-";
    const patchVersion = player?.attributes?.patchVersion || "-";

    // ✅ match only
    const matchDetails = matches.filter((item) => item?.data?.type === "match");

    // ✅ stats list (my actor)
    const statsList = matchDetails
      .map((match) => {
        const participant = match.included?.find(
          (p) => p.type === "participant" && p.attributes.actor === accountId
        );
        return participant?.attributes?.stats;
      })
      .filter(Boolean);

    const count = statsList.length;
    if (count === 0) {
      return { playerName: name, averages: null, meta: { shardId, patchVersion } };
    }

    const sum = (key) => statsList.reduce((acc, cur) => acc + (Number(cur?.[key]) || 0), 0);
    const avg = (key) => sum(key) / count;

    return {
      playerName: name,
      meta: { shardId, patchVersion },
      averages: {
        gameCount: count,
        avgKills: avg("kills"),
        avgDamage: avg("damageDealt"),
        avgRank: avg("winPlace"),
        avgSurvival: avg("timeSurvived"),
        avgHeadshot: avg("headshotKills"),
        avgWalk: avg("walkDistance"),
        avgRide: avg("rideDistance"),
      },
    };
  }, []);

  if (!averages) return <div style={styles.empty}>매치 데이터가 없습니다.</div>;

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.kicker}>PLAYER STATS</div>
            <h2 style={styles.title}>
              <span style={styles.accent}>{playerName}</span>
              <span style={styles.titleSub}> · 최근 {averages.gameCount}게임 평균</span>
            </h2>
            <div style={styles.metaRow}>
              <span style={styles.metaPill}>SHARD: {meta.shardId}</span>
              <span style={styles.metaPill}>PATCH: {meta.patchVersion}</span>
            </div>
          </div>

          <div style={styles.badge}>
            <div style={styles.badgeLabel}>AVG DAMAGE</div>
            <div style={styles.badgeValue}>{averages.avgDamage.toFixed(0)}</div>
          </div>
        </div>

        {/* Cards */}
        <div style={styles.grid}>
          <StatCard label="평균 킬" value={averages.avgKills.toFixed(2)} suffix="" icon="🎯" />
          <StatCard label="평균 딜량" value={averages.avgDamage.toFixed(1)} suffix="" icon="💥" />
          <StatCard label="평균 등수" value={averages.avgRank.toFixed(1)} suffix="" icon="🏆" />
          <StatCard label="평균 생존시간" value={averages.avgSurvival.toFixed(0)} suffix="초" icon="⏱" />
          <StatCard label="평균 헤드샷킬" value={averages.avgHeadshot.toFixed(2)} suffix="" icon="🎯" />
          <StatCard label="평균 도보거리" value={averages.avgWalk.toFixed(0)} suffix="m" icon="🚶" />
          <StatCard label="평균 차량거리" value={averages.avgRide.toFixed(0)} suffix="m" icon="🚗" />
        </div>

        {/* Footer tip */}
        <div style={styles.footer}>
          <span style={styles.footerLine} />
          <span style={styles.footerText}>
            TIP · “딜량은 좋은데 등수가 낮으면” 교전 후 이동/포지셔닝을 더 빨리 가져가보세요. <Link to='/' style={{ textDecoration: 'none', color: 'skyblue' }}>(메인으로)</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, suffix, icon }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTop}>
        <div style={styles.cardIcon}>{icon}</div>
        <div style={styles.cardLabel}>{label}</div>
      </div>
      <div style={styles.cardValue}>
        {value}
        {suffix && <span style={styles.cardSuffix}>{suffix}</span>}
      </div>
      <div style={styles.cardBarWrap}>
        <div style={styles.cardBar} />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 600px at 10% 10%, rgba(255, 200, 0, 0.08), transparent 60%)," +
      "radial-gradient(900px 500px at 90% 30%, rgba(255, 200, 0, 0.05), transparent 55%)," +
      "linear-gradient(180deg, #0b0f14 0%, #070a0e 100%)",
    color: "#e7edf5",
    display: "flex",
    justifyContent: "center",
    padding: "44px 18px",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji"',
  },

  shell: {
    width: "min(960px, 100%)",
    background: "rgba(10, 14, 20, 0.78)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 18,
    padding: 22,
    boxShadow: "0 18px 55px rgba(0, 0, 0, 0.55)",
    backdropFilter: "blur(10px)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "stretch",
    marginBottom: 18,
  },

  kicker: {
    fontSize: 12,
    letterSpacing: "0.16em",
    color: "rgba(231, 237, 245, 0.65)",
    marginBottom: 8,
  },

  title: {
    margin: 0,
    fontSize: 22,
    lineHeight: 1.25,
  },
  accent: {
    color: "#ffc400",
    textShadow: "0 0 18px rgba(255, 196, 0, 0.18)",
  },
  titleSub: {
    color: "rgba(231, 237, 245, 0.75)",
    fontWeight: 500,
  },

  metaRow: {
    display: "flex",
    gap: 8,
    marginTop: 10,
    flexWrap: "wrap",
  },
  metaPill: {
    fontSize: 12,
    padding: "7px 10px",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    color: "rgba(231, 237, 245, 0.8)",
  },

  badge: {
    minWidth: 190,
    borderRadius: 16,
    padding: "14px 14px",
    background:
      "linear-gradient(180deg, rgba(255,196,0,0.12) 0%, rgba(255,196,0,0.04) 100%)",
    border: "1px solid rgba(255, 196, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  badgeLabel: {
    fontSize: 11,
    letterSpacing: "0.14em",
    color: "rgba(255, 196, 0, 0.75)",
    marginBottom: 6,
  },
  badgeValue: {
    fontSize: 34,
    fontWeight: 800,
    color: "#ffc400",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: 12,
  },

  card: {
    gridColumn: "span 4",
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.06)",
    borderRadius: 16,
    padding: 14,
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
  },

  cardTop: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  cardIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255, 196, 0, 0.10)",
    border: "1px solid rgba(255, 196, 0, 0.18)",
  },
  cardLabel: {
    fontSize: 13,
    color: "rgba(231, 237, 245, 0.75)",
  },
  cardValue: {
    fontSize: 26,
    fontWeight: 800,
    color: "#e7edf5",
    letterSpacing: "-0.02em",
  },
  cardSuffix: {
    fontSize: 14,
    fontWeight: 700,
    marginLeft: 6,
    color: "rgba(231, 237, 245, 0.65)",
  },
  cardBarWrap: {
    marginTop: 12,
    height: 6,
    borderRadius: 999,
    overflow: "hidden",
    background: "rgba(255, 255, 255, 0.06)",
  },
  cardBar: {
    height: "100%",
    width: "55%",
    background: "linear-gradient(90deg, rgba(255,196,0,0.9), rgba(255,196,0,0.2))",
  },

  footer: {
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "rgba(231, 237, 245, 0.65)",
    fontSize: 12,
  },
  footerLine: {
    flex: 1,
    height: 1,
    background: "rgba(255,255,255,0.08)",
  },
  footerText: {
    whiteSpace: "nowrap",
  },

  empty: {
    padding: 20,
    background: "#0b0f14",
    color: "#e7edf5",
  },
};