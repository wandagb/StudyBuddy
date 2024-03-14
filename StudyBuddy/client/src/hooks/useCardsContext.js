import { CardsContext } from "../context/CardContext";
import { useContext } from "react";

//access cards state and return it
export const useCardsContext = () => {
    const context = useContext(CardsContext)

    if (!context) {
        throw Error("useCardsContext must be used inside a CardsContextProvider")
    }

    return context
}