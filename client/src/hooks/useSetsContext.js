import { SetsContext } from "../context/SetsContext";
import { useContext } from "react";

export const useSetsContext = () => {
    const context = useContext(SetsContext)

    if (!context) {
        throw Error("useSetsContext must be used inside a SetsContextProvider")
    }

    return context
}