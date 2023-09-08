// raidOneSlice.js
import { createSlice } from "@reduxjs/toolkit";

const raidOneSlice = createSlice({
  name: "raidTwo",
  initialState: {
    players: [],
  },
  reducers: {
    // Define reducers specific to RaidOne
    addPlayer: (state, action) => {
      // @ts-ignore
      const { id, mainChar, playerClass } = action.payload;

      // @ts-ignore
      state.players.push(action.payload);
      // state.players.sort((a, b) => a.id - b.id);
      state.players.sort((a, b) => {
        const roleOrder = {
          TANK: 1,
          HEALER: 2,
          RANGED_DPS: 3,
          MELEE_DPS: 4,
        };
        // @ts-ignore
        return roleOrder[a.role] - roleOrder[b.role];
      });
    },
    removePlayer: (state, action) => {
      const playerIdToRemove = action.payload;
      state.players = state.players.filter(
        // @ts-ignore
        (player) => player.id !== playerIdToRemove
      );
    },
  },
});

export const { actions, reducer } = raidOneSlice;
