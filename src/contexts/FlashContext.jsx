import React, { useContext, useState } from 'react'

const FlashContext = React.createContext()

const initalState = {
  display: false,
  success: null,
  message: '',
}

const FlashProvider = ({ children }) => {
  const [flash, setFlash] = useState({ ...initalState })

  const showFlash = (success, message, time = 3000) => {
    setFlash((prev) => ({
      ...prev,
      display: true,
      success: success,
      message: message,
    }))

    setTimeout(() => setFlash((prev) => ({ ...initalState })), time)
  }

  const value = {
    state: { ...flash },
    createFlash: (success, message, time) => showFlash(success, message, time),
  }

  return <FlashContext.Provider value={value}>{children}</FlashContext.Provider>
}

/**
 * Contains stateful data of flash message and function to update the state.
 * @returns {React.Context<{state: {display: boolean, success: boolean, message: string}, createFlash: (success: boolean, message: string, time: number)}>}
 */
const useFlash = () => {
  const context = useContext(FlashContext)

  if (!context) throw new Error('useFlash called outside its provider')

  return context
}

export { FlashProvider, useFlash }
