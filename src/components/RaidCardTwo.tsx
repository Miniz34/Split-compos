import "./RaidCard.scss";

interface PlayerData {
  name: string;
  playerClass: string;
}

interface RaidCardProps {
  playerData: PlayerData[];
  className: string;
  raidName: string;
  veneratedCount: number;
  mysticCount: number;
  dreadfulCount: number;
  zenithCount: number;
  names: string[];
  role: string[];
}

function RaidCardTwo({
  playerData,
  className,
  raidName,
  veneratedCount,
  mysticCount,
  dreadfulCount,
  zenithCount,
  names,
  role,
}: RaidCardProps) {
  console.log("PLAYER DATA RECIEVEE", playerData);
  const roleOrder = ["TANK", "HEALER", "RANGED_DPS", "MELEE_DPS"];

  // Sort the names based on the custom role order
  const playerNames = playerData.map((data) => data.name);
  const playerClasses = playerData.map((data) => data.playerClass);

  // Sort the names based on the custom role order
  const sortedNames = names.sort((a, b) => {
    const roleA = roleOrder.indexOf(role[names.indexOf(a)]);
    const roleB = roleOrder.indexOf(role[names.indexOf(b)]);
    return roleA - roleB;
  });

  const groupedNames: Record<string, string[]> = {};
  sortedNames.forEach((name) => {
    const r = role[names.indexOf(name)];

    if (!groupedNames[r]) {
      groupedNames[r] = [];
    }
    groupedNames[r].push(name);
  });

  return (
    <div className={`raid-card-wrapper ${className}`}>
      <h2>{raidName}</h2>
      <div className="token-container">
        <div className="token-list">
          <span>venerated: {veneratedCount}</span>
          <span>mystic: {mysticCount}</span>
        </div>
        <div className="token-list">
          <span>dreadful: {dreadfulCount}</span>
          <span>zenith: {zenithCount}</span>
        </div>
      </div>
      {/* Display sorted names */}

      {roleOrder.map((r) => (
        <div key={r} className={`raid-card-names`}>
          {groupedNames[r] &&
            groupedNames[r].map((name, index) => {
              const playerIndex = playerNames.indexOf(name); // Find the index of the name
              const playerClass =
                playerIndex !== -1 ? playerClasses[playerIndex] : ""; // Get the associated class
              return (
                <p key={index} className={`class-color-${playerClass}`}>
                  {name}
                </p>
              );
            })}
        </div>
      ))}

      {/* Display names grouped by role */}
      {/* {roleOrder.map((r) => (
        <div key={r} className={`raid-card-names`}>
          <br />
          {groupedNames[r] &&
            groupedNames[r].map((name, index) => (
              <p key={index} className={`class-color-${playerClass[index]}`}>
                {" "}
                {name}
              </p>
            ))}
        </div>
      ))} */}

      {/* {sortedNames.map((name, index) => (
        <p key={index}>{name}</p>
      ))} */}

      <br />
    </div>
  );
}

export default RaidCardTwo;
