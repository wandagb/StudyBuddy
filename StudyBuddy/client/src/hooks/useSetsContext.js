import { SetsContext } from "../context/SetsContext";
import { useContext } from "react";

export const useSetsContext = () => {
    const context = useContext(SetsContext) //access the sets context

    if (!context) {
        throw Error("useSetsContext must be used inside a SetsContextProvider")
    }

    return context; 
}