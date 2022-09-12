import React from 'react'
import TopScoreItem from './TopScoreItem'
import ScoreModal from './ScoreModal'
import { useUserState } from '../contexts/UserContext.jsx'

const TopScores = () => {
  const { state } = useUserState()

  const renderModal = () => {
    return state.activeUserId() ? (
      <ScoreModal name={state.userName} scores={state.userScores} />
    ) : null
  }

  return (
    <div className='highscore-container'>
      <h3>Score Toplist</h3>

      <div>
        {state.topScores.map((user) => {
          return <TopScoreItem key={user._id} user={user} />
        })}
      </div>

      {renderModal()}
    </div>
  )
}

export default TopScores
