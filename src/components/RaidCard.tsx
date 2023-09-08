import "./RaidCard.scss";

interface PlayerData {
  name: string;
  playerClass: string;
}

interface RaidCardProps {
  // @ts-ignore
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

function RaidCard({
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

  // Define the player classes you want to check for
  const requiredPlayerClasses = [
    "Priest",
    "Druid",
    "Mage",
    "DH",
    "Warrior",
    "Warlock",
    "Monk",
  ];

  // Create an array to store missing player classes
  const missingPlayerClasses = requiredPlayerClasses.filter((className) => {
    // Check if any player has the required class
    return !playerData.some((player) => player.playerClass === className);
  });

  // Render the missing player classes
  const missingBuffs = missingPlayerClasses.map((className, index) => (
    <span key={index} className="missing-buff">
      {className}
    </span>
  ));

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

      {/* Display missing buffs */}
      <div className="missing-buffs">
        {missingBuffs.length > 0 && (
          <div className="missing-buffs-label">Missing Buffs:</div>
        )}
        {missingBuffs}
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

export default RaidCard;
