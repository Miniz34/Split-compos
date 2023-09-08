import { useSelector } from "react-redux";
import "./RaidRecap.scss";
import RaidCard from "../components/RaidCard"; // Import the new RaidCard component

function RaidRecap() {
  // @ts-ignore
  const raidOneState = useSelector((state) => state.raidOne);
  // @ts-ignore
  const raidTwoState = useSelector((state) => state.raidTwo);

  const names = raidOneState.players.map(
    (player: { name: any }) => player.name
  );
  // const tokens = raidOneState.players.map(
  //   (player: { token: any }) => player.token
  // );

  // @ts-ignore
  const TokenRaidOne = raidOneState.players.map((player) => {
    if (player.main) {
      return player.token;
    }
  });
  // @ts-ignore
  const TokenRaidTwo = raidTwoState.players.map((player) => {
    if (player.main) {
      return player.token;
    }
  });

  console.log("TOKENTEST ICI::", TokenRaidOne);

  const roles = raidOneState.players.map(
    // @ts-ignore
    (player: { role: any }) => player.role
  );

  // const classes = raidOneState.players.map(
  //   (player: { playerClass: any }) => player.playerClass
  // );

  const veneratedCount = TokenRaidOne.filter(
    (token: string) => token === "Venerated"
  ).length;

  const mysticCount = TokenRaidOne.filter(
    (token: string) => token === "Mystic"
  ).length;
  const dreadfulCount = TokenRaidOne.filter(
    (token: string) => token === "Dreadful"
  ).length;
  const zenithCount = TokenRaidOne.filter(
    (token: string) => token === "Zenith"
  ).length;

  const roles2 = raidTwoState.players.map(
    (player: { role: any }) => player.role
  );

  const names2 = raidTwoState.players.map(
    (player: { name: any }) => player.name
  );
  // const tokens2 = raidTwoState.players.map(
  //   (player: { token: any }) => player.token
  // );

  // const classes2 = raidTwoState.players.map(
  //   (player: { playerClass: any }) => player.playerClass
  // );
  const veneratedCount2 = TokenRaidTwo.filter(
    // @ts-ignore
    (token) => token === "Venerated"
  ).length;
  const mysticCount2 = TokenRaidTwo.filter(
    (token: string) => token === "Mystic"
  ).length;
  const dreadfulCount2 = TokenRaidTwo.filter(
    (token: string) => token === "Dreadful"
  ).length;
  const zenithCount2 = TokenRaidTwo.filter(
    (token: string) => token === "Zenith"
  ).length;

  const playerData: string[] = [];
  raidOneState.players.forEach(
    (player: { name: string; playerClass: string }) => {
      // @ts-ignore
      playerData.push({
        name: player.name,
        playerClass: player.playerClass,
      });
    }
  );

  const playerData2: string[] = [];
  raidTwoState.players.forEach(
    (player: { name: string; playerClass: string }) => {
      // @ts-ignore
      playerData2.push({
        name: player.name,
        playerClass: player.playerClass,
      });
    }
  );

  console.log("RAID 1 ICI", raidOneState);
  console.log("DATA 11", playerData);
  console.log("RAID 2 ICI", raidTwoState);

  console.log("DATA 22222", playerData2);

  // Repeat the same data fetching and calculations for raid 2 (raidTwoState)

  return (
    <div className="raid-recap-wrapper">
      {/* Use RaidCard component for raid 1 */}
      <RaidCard
        // @ts-ignore
        playerData={playerData}
        role={roles}
        className="raid-card-wrapper-1"
        raidName="raid 1"
        veneratedCount={veneratedCount}
        mysticCount={mysticCount}
        dreadfulCount={dreadfulCount}
        zenithCount={zenithCount}
        names={names}
      />

      {/* Use RaidCard component for raid 2 */}
      {/* Pass relevant data for raid 2 as props */}
      <RaidCard
        // @ts-ignore
        playerData={playerData2}
        role={roles2}
        className="raid-card-wrapper-2"
        raidName="raid 2"
        veneratedCount={veneratedCount2}
        mysticCount={mysticCount2}
        dreadfulCount={dreadfulCount2}
        zenithCount={zenithCount2}
        names={names2}
      />
    </div>
  );
}

export default RaidRecap;
