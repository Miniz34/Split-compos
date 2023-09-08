// CharacterContext.tsx (Updated CharacterProvider)
import { createContext, useState, ReactNode } from "react";

interface UpdateRaidUnContextProps {
  idRaidUn: number;
  mainCharRaidUn?: {
    name: string;
    class: string;
    token: string;
  };
  altCharRaidUn?: {
    name: string;
    class: string;
    token: string;
  };
}

interface RaidUnContextProps {
  idRaidUn: number;
  mainCharRaidUn?: {
    name: string;
    class: string;
    token: string;
  } | null;
  altCharRaidUn?: {
    name: string;
    class: string;
    token: string;
  } | null;
  UpdateContext: (props: UpdateRaidUnContextProps) => void;
}

const initialstate: RaidUnContextProps = {
  idRaidUn: 0,
  mainCharRaidUn: null,
  altCharRaidUn: null,
  UpdateContext: () => {
    return;
  },
};

export const RaidUnContext = createContext<RaidUnContextProps>(initialstate);

interface RaidUnProviderProps {
  children?: ReactNode | null | undefined;
}

const RaidUnprovider = ({ children }: RaidUnProviderProps) => {
  const [state, setState] = useState<RaidUnContextProps>(initialstate);

  const UpdateContext = (props: UpdateRaidUnContextProps) => {
    setState((prevState) => ({
      ...prevState,
      mainCharRaidUn:
        props.mainCharRaidUn !== undefined ? props.mainCharRaidUn : null,
      altCharRaidUn:
        props.altCharRaidUn !== undefined ? props.altCharRaidUn : null,
    }));
  };

  return (
    <RaidUnContext.Provider value={{ ...state, UpdateContext }}>
      {children ?? null}
    </RaidUnContext.Provider>
  );
};

export default RaidUnprovider;

// // Define interfaces for your data
// interface Character {
//   id: number;
//   mainChar?: {
//     name: string;
//     class: string;
//     token: string;
//   };
//   altChar?: {
//     name: string;
//     class: string;
//     token: string;
//   };
// }

// const initialstate: Character = {
//   id: 0,
// };
// // Define a type for the context data
// type CharacterContextData = Character[];

// // Create the context
// const CharacterContext = createContext<CharacterProps>

// interface CharacterProviderProps {
//   children: ReactNode;
// }

// const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
//   const addCharacter = (character: Character) => {
//     setCharacters((prevCharacters) => [...prevCharacters, character]);
//   };

//   const [characters, setCharacters] = useState<CharacterContextData>([
//     {
//       id: 1,
//       mainChar: {
//         name: "string;",
//         class: "string;",
//         token: "string;",
//       },
//       altChar: {
//         name: "string;",
//         class: "string;",
//         token: "string;",
//       },
//       addCharacter: AddCharacter,
//     },
//   ]);

//   return (
//     <CharacterContext.Provider value={{ characters, addCharacter }}>
//       {children}
//     </CharacterContext.Provider>
//   );
// };

// // Function to add a character to the context
// export const AddCharacterRaid1 = (characterData: Character) => {
//   const context = useContext(CharacterContext);
//   console.log(context);
//   if (context === undefined) {
//     throw new Error("useCharacter must be used within a CharacterProvider");
//   }
//   context.addCharacter(characterData);
// };

// export default CharacterProvider;
