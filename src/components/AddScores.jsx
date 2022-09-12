import React from 'react'
import ExcelDropzone from './ExcelDropzone'
import Form from './Form'
import { useUserAPI } from '../contexts/UserContext.jsx'
import { useFlash } from '../contexts/FlashContext.jsx'

const AddScores = () => {
  const { dispatch } = useUserAPI()
  const { createFlash } = useFlash()

  const sheetDataHasKeys = (data) =>
    data.some((obj) => Object.keys(obj).includes('name')) &&
    data.some((obj) => Object.keys(obj).includes('score'))

  const handleSheetData = (data) => {
    if (sheetDataHasKeys(data)) {
      dispatch({ type: 'ADD_USERS', payload: data })
      createFlash(true, 'Users and scores have been saved')
    } else {
      createFlash(false, 'Something went wrong')
    }
  }

  return (
    <div className='add-scores-conatiner'>
      <div>
        <h3>Add user scores</h3>
        <ExcelDropzone
          onSheetDrop={handleSheetData}
          label='Drop your file here'
        />
      </div>
      <div>
        <h3>Add a score</h3>
        <Form />
      </div>
    </div>
  )
}

export default AddScores
