import { createContext, useReducer} from "react";

export const SetsContext = createContext()

//reducer function to manage set state trnasition
export const setsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_SETS':
            return {
                sets: action.payload //update state with sets fetched for user
            }
        case 'GET_SETS':
            return {
                sets: action.payload,
                comments: action.payload.comments //update state with comments
            }
        case 'CREATE_SET':
            return {
                sets: action.payload //update state with newly created set (no cards)
            }
        case 'DELETE_SET':
            return {
                sets: state.sets.filter((s) => s._id !== action.payload._id) //remove entire set
            }
        case 'ADD_COMMENT':
            return {
                comments: [action.payload, ...state.comments] //add new comment
            }
        default:
            return state
    }
}

// provide sets context to its children
export const SetsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(setsReducer, {
        sets: null,
        comments: null
    })

    return(
        <SetsContext.Provider value={{...state, dispatch}}>
        { children }
        </SetsContext.Provider>
    )
}