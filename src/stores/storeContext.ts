import { createContext, useContext } from "react";
import gameStore from "./gameStore";

export const StoreContext = createContext({
    gameStore,
});

export const useStore = () => useContext(StoreContext);
