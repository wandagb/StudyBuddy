import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null) //error state
  const [isLoading, setIsLoading] = useState(null) //loading state
  const { dispatch } = useAuthContext() //dispatch login action

  const signup = async (email, username, password) => {
    setIsLoading(true)
    setError(null)

    //send signup request to the server
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, username, password })
    })
    const json = await response.json()

    //check is response is invalid
    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }

    //successful signup
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}
