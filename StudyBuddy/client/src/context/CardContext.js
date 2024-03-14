import { createContext, useReducer} from "react";

export const CardsContext = createContext()

//reducer function to maage card states
export const cardsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CARDS':
            return {
                cards: action.payload //update state with fetched cards
            }
        case 'CREATE_CARD':
            return {
                cards: [action.payload, ...state.cards] //add new card to existing set
            }
        case 'DELETE_CARD':
            return {
                cards: state.cards.filter((c) => c._id !== action.payload._id)
            }
        default:
            return state
    }
}

//provide cards context to its children
export const CardsContextProvider = ({ children }) => {

    const [state, cardDispatch] = useReducer(cardsReducer, {
        cards: null
    })

    return(
        <CardsContext.Provider value={{...state, cardDispatch}}>
        { children }
        </CardsContext.Provider>
    )
}