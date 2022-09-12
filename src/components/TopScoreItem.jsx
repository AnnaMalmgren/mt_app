import React from 'react'
import { useUserAPI } from '../contexts/UserContext'

const TopScoreItem = ({ user }) => {
  const { dispatch } = useUserAPI()

  return (
    <div
      className='user-item'
      onClick={() => dispatch({ type: 'ACTIVE_USER', payload: user._id })}
    >
      <span>
        {user.name}: {user.score}
      </span>
    </div>
  )
}

export default TopScoreItem
