import React, { useReducer, useContext } from 'react'
import { reducer } from '../reducers/userReducer'
import { getUserScores, getTopScores, getUserName } from '../lib/formatData'
import users from '../users'
import scores from '../scores'

const UserStateContext = React.createContext()
const UserAPIContext = React.createContext()

const initialState = {
  userData: users,
  scoreData: scores,
  activeUser: null,
}

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    state: {
      activeUserId: () => state.activeUser,
      topScores: getTopScores(state.userData, state.scoreData),
      userScores: getUserScores(state.activeUser, state.scoreData),
      userName: getUserName(state.activeUser, state.userData),
    },
  }

  return (
    <UserStateContext.Provider value={value}>
      <UserAPIContext.Provider value={{ dispatch }}>
        {children}
      </UserAPIContext.Provider>
    </UserStateContext.Provider>
  )
}

/**
 * Contains stateful user data
 * @returns {React.Context<{state: {activeUserId: () => Number, topScores: [{_id: number, name: string, score: number}],
 *  userScores: [number], userName: string |null}}>}
 */
const useUserState = () => {
  const context = useContext(UserStateContext)

  if (!context) throw new Error('useUserState called outside its provider')

  return context
}
/**
 * Conatins function to update stateful user data.
 * @returns {React.Context<React.DispatchWithoutAction>}
 */
const useUserAPI = () => {
  const context = useContext(UserAPIContext)

  if (!context) throw new Error('useUserAPI called outside its provider')

  return context
}

export { UserProvider, useUserState, useUserAPI }
