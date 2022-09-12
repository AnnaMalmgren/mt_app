import React from 'react'
import { useUserAPI } from '../contexts/UserContext.jsx'

const ScoreModal = ({ name, scores }) => {
  const { dispatch } = useUserAPI()
  return (
    <div className='modal-container'>
      <div className='modal-content'>
        <h5>Scores for {name}</h5>
        <div className='modal-list'>
          {scores.map((score, index) => (
            <span key={index}>{score}</span>
          ))}
        </div>
        <button
          className='button'
          onClick={() => dispatch({ type: 'RESET_ACTIVE_USER' })}
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default ScoreModal
