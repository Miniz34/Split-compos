import { useState, useEffect } from "react";
import PlayerCard from "../components/PlayerCard";
import RaidRecap from "../layout/RaidRecap";
import "../components/PlayerCard.scss";
import "./Home.scss";

export interface Player {
  id: number;
  mainChar: {
    name: string;
    class: string;
    token: string;
    setPieces: {
      helm: boolean;
      shoulders: boolean;
      chest: boolean;
      hands: boolean;
      legs: boolean;
    };
    role: string; // Assuming role is within mainChar
  };
  altChar: {
    name: string;
    class: string;
    token: string;
    setPieces: {
      helm: boolean;
      shoulders: boolean;
      chest: boolean;
      hands: boolean;
      legs: boolean;
    };
  };
}

function Home() {
  const [players, setPlayers] = useState<Player[]>([]); // Initialize players state

  useEffect(() => {
    // Fetch the data when the component mounts
    async function fetchData() {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setPlayers(data); // Update the players state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData(); // Call the fetchData function
  }, []); // The empty dependency array ensures this effect runs only once

  console.log(players);
  // Sort players based on role
  const sortedPlayers = [...players].sort((a, b) => {
    const roleOrder = {
      TANK: 1,
      HEALER: 2,
      RANGED_DPS: 3,
      MELEE_DPS: 4,
    };
    // @ts-ignore
    return roleOrder[a.mainChar.role] - roleOrder[b.mainChar.role];
  });

  const groupedPlayers: Record<string, Player[]> = {};
  sortedPlayers.forEach((player) => {
    const { role } = player.mainChar;
    if (!groupedPlayers[role]) {
      groupedPlayers[role] = [];
    }
    groupedPlayers[role].push(player);
  });

  return (
    <>
      <div className="container">
        <div className="cards-container">
          {Object.entries(groupedPlayers).map(([role, players]) => (
            <div key={role} className="role-section">
              <div className="player-cards">
                {players.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="additional-component">
          <RaidRecap />
        </div>
      </div>
    </>
  );
}

export default Home;
