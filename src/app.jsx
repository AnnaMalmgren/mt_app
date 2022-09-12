import React from 'react'
import { UserProvider } from './contexts/UserContext'
import { FlashProvider } from './contexts/FlashContext'
import AddScores from './components/AddScores'
import TopScores from './components/TopScores'
import FlashMessage from './components/FlashMessage'
import { MTRow, MTColumn } from 'mt-ui'

const App = () => {
  return (
    <UserProvider>
      <FlashProvider>
        <div className='container container--centered'>
          <FlashMessage />
          <h1 className='m-t'>Ranking App</h1>
          <MTRow>
            <MTColumn width={30}>
              <AddScores />
            </MTColumn>
            <MTColumn width={50}>
              <TopScores />
            </MTColumn>
          </MTRow>
        </div>
      </FlashProvider>
    </UserProvider>
  )
}

export default App
