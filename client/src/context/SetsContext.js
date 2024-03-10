import { createContext, useReducer} from "react";

export const SetsContext = createContext()

export const setsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_SETS':
            return {
                sets: action.payload
            }
        case 'GET_SETS':
            return {
                sets: action.payload
            }
        case 'CREATE_SET':
            return {
                sets: action.payload
            }
        default:
            return state
    }
}

export const SetsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(setsReducer, {
        sets: null
    })

    return(
        <SetsContext.Provider value={{...state, dispatch}}>
        { children }
        </SetsContext.Provider>
    )
}