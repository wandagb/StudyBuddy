import { createContext, useReducer} from "react";

export const FeedbackContext = createContext()

export const feedbackReducer = (state, action) => {
    switch (action.type) {
        case 'GET_AVERAGE':
            return {
                rating: action.payload
            }
        case 'GET_COMMENTS':
            return {
                feedback: action.payload
            }
        case 'CREATE_COMMENT':
            return {
                feedback: [action.payload, ...state.feedback]
            }
        default:
            return state
    }
}

export const FeedbackContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(feedbackReducer, {
        feedback: null,
        rating: null
    })

    return(
        <FeedbackContext.Provider value={{...state, dispatch}}>
        { children }
        </FeedbackContext.Provider>
    )
}