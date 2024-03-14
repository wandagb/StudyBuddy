import { createContext, useReducer } from "react";
import { useEffect } from "react";

export const AuthContext = createContext()

// reducer function to manage authentication state transitions
export const authReducer = (state, action) => {
    switch(action.type){
    case 'LOGIN':
        return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

// component to provide authentication context to its children
export const AuthContextProvider = ({ children }) => {

    const[state, dispatch] = useReducer(authReducer, {
        user: null
    })
    //check for user in local storage
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch({ type: 'LOGIN', payload: user})
        }
    }, [])

// return user state and dispatch as context value 
    return ( 
        <AuthContext.Provider value ={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}