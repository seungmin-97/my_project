export const accountId = "account.myPlayer123";
export const matches = [
  {
    data: [
      {
        type: "player",
        id: "account.myPlayer123",
        attributes: {
          name: "MockPlayer",
          shardId: "steam",
          patchVersion: "27.1.1",
          banType: "Innocent",
          titleId: "pubg",
        },
        relationships: {
          matches: {
            data: [
              { type: "match", id: "match-001" },
              { type: "match", id: "match-002" },
              { type: "match", id: "match-003" },
            ],
          },
        },
      },
    ],
  },
  {
    data: {
      type: "match",
      id: "match-001",
      attributes: {
        duration: 1500,
        gameMode: "squad",
        mapName: "Erangel",
        isCustomMatch: false,
      },
    },
    included: [
      {
        type: "participant",
        id: "p1",
        attributes: {
          actor: "account.myPlayer123",
          stats: {
            name: "MockPlayer",
            kills: 3,
            damageDealt: 450,
            winPlace: 5,
            timeSurvived: 1300,
            headshotKills: 1,
            walkDistance: 1200,
            rideDistance: 800,
          },
        },
      },
    ],
  },
  {
    data: {
      type: "match",
      id: "match-002",
      attributes: {
        duration: 1800,
        gameMode: "squad",
        mapName: "Miramar",
        isCustomMatch: false,
      },
    },
    included: [
      {
        type: "participant",
        id: "p2",
        attributes: {
          actor: "account.myPlayer123",
          stats: {
            name: "MockPlayer",
            kills: 7,
            damageDealt: 820,
            winPlace: 1,
            timeSurvived: 1780,
            headshotKills: 2,
            walkDistance: 1500,
            rideDistance: 1200,
          },
        },
      },
    ],
  },
  {
    data: {
      type: "match",
      id: "match-003",
      attributes: {
        duration: 1800,
        gameMode: "squad",
        mapName: "Erangel",
        isCustomMatch: false,
      },
    },
    included: [
      {
        type: "participant",
        id: "p2",
        attributes: {
          actor: "account.myPlayer123",
          stats: {
            name: "MockPlayer",
            kills: 11,
            damageDealt: 1132,
            winPlace: 1,
            timeSurvived: 1780,
            headshotKills: 5,
            walkDistance: 540,
            rideDistance: 1650,
          },
        },
      },
    ],
  },
];
