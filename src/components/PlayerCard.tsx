import "./PlayerCard.scss";

import { useSelector, useDispatch } from "react-redux";

import { actions as raidOneActions } from "../store/raidOneSlice";
import { actions as raidTwoActions } from "../store/raidTwoSlice";

// import { someAction } from './raidOneSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function PlayerCard({ player }: { player: any }) {
  const { id, mainChar, altChar } = player;

  const dispatch = useDispatch();
  // @ts-ignore
  const raidOneState = useSelector((state) => state.raidOne);
  // @ts-ignore
  const raidTwoState = useSelector((state) => state.raidTwo);

  // @ts-ignore
  const addMainRaidOne = (id, mainChar, altChar) => {
    const existsInRaidOne = raidOneState.players.some(
      // @ts-ignore
      (player) => player.id === id
    );

    const playerInRaidOne = raidOneState.players.some(
      // @ts-ignore
      (player) => player.name === mainChar.name
    );

    if (!existsInRaidOne && mainChar) {
      //Push main in raid One
      const { name, token, role } = mainChar;

      const modifiedPlayer = {
        id,
        name, // Rename to "name"
        token, // Rename to "token"
        role,
        playerClass: mainChar["class"],
        main: true,
      };
      dispatch(raidOneActions.addPlayer(modifiedPlayer));
      if (altChar) {
        //Push alt in raid Two
        const { name, token, role } = altChar;

        const modifiedPlayer = {
          id,
          name,
          token,
          role,
          playerClass: altChar["class"],
          main: false,
        };

        dispatch(raidTwoActions.addPlayer(modifiedPlayer));
      }
    } else if (!playerInRaidOne && existsInRaidOne) {
      const { name, token, role } = altChar;

      const modifiedPlayer = {
        id,
        name,
        token,
        role,
        playerClass: altChar["class"],
        main: false,
      };
      dispatch(raidTwoActions.removePlayer(id));
      dispatch(raidTwoActions.addPlayer(modifiedPlayer));

      if (altChar) {
        const { name, token, role } = mainChar;

        const modifiedPlayerAlt = {
          id,
          name,
          token,
          role,
          playerClass: mainChar["class"],
          main: true,
        };
        dispatch(raidOneActions.removePlayer(id));

        dispatch(raidOneActions.addPlayer(modifiedPlayerAlt));
      }
    }
  };

  // @ts-ignore
  const addMainRaidTwo = (id, mainChar, altChar) => {
    const existsInRaidOne = raidOneState.players.some(
      // @ts-ignore
      (player) => player.id === id
    );

    const playerInRaidTwo = raidTwoState.players.some(
      // @ts-ignore
      (player) => player.name === mainChar.name
    );

    if (!existsInRaidOne && mainChar) {
      const { name, token, role, playerClass } = mainChar;
      console.log(playerClass);

      const modifiedPlayer = {
        id,
        name, // Rename to "name"
        token, // Rename to "token"
        role,
        playerClass: mainChar["class"],
        main: true,
      };
      dispatch(raidTwoActions.addPlayer(modifiedPlayer));
      if (altChar) {
        const { name, token, role } = altChar;
        const modifiedPlayer = {
          id,
          name,
          token,
          role,
          playerClass: altChar["class"],
          main: false,
        };
        dispatch(raidOneActions.addPlayer(modifiedPlayer));
      }
    } else if (!playerInRaidTwo && existsInRaidOne) {
      // @ts-ignore
      const { name, token, role } = mainChar;
      const modifiedPlayer = {
        id,
        name,
        token,
        role,
        playerClass: mainChar["class"],
        main: true,
      };
      dispatch(raidTwoActions.removePlayer(id));
      dispatch(raidTwoActions.addPlayer(modifiedPlayer));

      if (altChar) {
        const { name, token, role } = altChar;

        const modifiedPlayerAlt = {
          id,
          name,
          token,
          role,
          playerClass: altChar["class"],
          main: false,
        };
        dispatch(raidOneActions.removePlayer(id));
        dispatch(raidOneActions.addPlayer(modifiedPlayerAlt));
      }
    }
  };

  const playerInRaidOne = raidOneState.players.some(
    (player: { name: any }) => player.name === mainChar.name
  );

  const playerInRaidTwo = raidTwoState.players.some(
    (player: { name: any }) => player.name === mainChar.name
  );

  return (
    <div className={`player-card  player-card-${mainChar.class}`}>
      <div className="card-wrapper">
        <div className="card-container">
          <div className="main-container">
            <div className="main-text">
              <h2 className={`main-name class-color-${mainChar.class} `}>
                {mainChar.name}
              </h2>
              <span className="main-token">{mainChar.token}</span>
            </div>

            <div className="set-list">
              <p
                className={
                  mainChar.setPieces.helm ? "token-green" : "token-red"
                }
              >
                Helm
              </p>
              <p
                className={
                  mainChar.setPieces.shoulders == true
                    ? "token-green"
                    : "token-red"
                }
              >
                shoulders
              </p>
              <p
                className={
                  mainChar.setPieces.chest == true ? "token-green" : "token-red"
                }
              >
                chest
              </p>
              <p
                className={
                  mainChar.setPieces.hands == true ? "token-green" : "token-red"
                }
              >
                hands
              </p>
              <p
                className={
                  mainChar.setPieces.legs == true ? "token-green" : "token-red"
                }
              >
                legs
              </p>
            </div>

            <div className="button-list">
              {/* <button onClick={handleAddCharacter}>
                Add Character to Raid 1
              </button>{" "} */}
              <button
                className={playerInRaidOne ? "button-in-raid" : ""}
                onClick={() => addMainRaidOne(id, mainChar, altChar)}
              >
                raid 1
              </button>
              <button
                className={playerInRaidTwo ? "button-in-raid" : ""}
                onClick={() => addMainRaidTwo(id, mainChar, altChar)}
              >
                raid 2
              </button>
            </div>
          </div>

          <div className="alt-container">
            <div className="main-text">
              <h2 className={`main-name class-color-${altChar.class}`}>
                {altChar.name}
              </h2>
            </div>

            {/* <div className="button-list">
              <button>raid 1</button>
              <button> raid 2</button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
