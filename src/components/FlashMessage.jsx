import React, { useState, useEffect } from 'react'
import { useFlash } from '../contexts/FlashContext.jsx'

const FlashMessage = () => {
  const { state } = useFlash()
  const [show, setShow] = useState('hidden')
  const theme = state.success ? 'flash-success' : 'flash-danger'

  useEffect(
    () => (state.display ? setShow(theme) : setShow('hidden')),
    [state.display, theme]
  )

  return (
    <div className={`flash ${show}`}>
      <span>
        {state.success ? 'Success' : 'Error'}:{'  '}
      </span>
      <span>{state.message}</span>
    </div>
  )
}

export default FlashMessage
