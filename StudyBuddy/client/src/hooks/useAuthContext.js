import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

//acesss authentication state and return it
export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}