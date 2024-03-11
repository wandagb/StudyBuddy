import { FeedbackContext } from "../context/FeedbackContext";
import { useContext } from "react";

export const useFeedbackContext = () => {
    const context = useContext(FeedbackContext)

    if (!context) {
        throw Error("useFeedbackContext must be used inside a FeedbackContextProvider")
    }

    return context
}