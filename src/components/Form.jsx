import React, { useState } from 'react'
import { validate } from '../lib/formValidation'
import { useUserAPI } from '../contexts/UserContext'
import { useFlash } from '../contexts/FlashContext.jsx'

const Form = () => {
  const [errors, setErrors] = useState(null)
  const [formData, setFormData] = useState({ name: '', score: '' })
  const { dispatch } = useUserAPI()
  const { createFlash } = useFlash()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))

    if (errors?.name || errors?.score) {
      validate(formData, setErrors)
    }
  }

  const getValidData = () => {
    return validate(formData, setErrors)
      ? { name: formData.name.trim(), score: parseInt(formData.score.trim()) }
      : null
  }

  const submitForm = (e) => {
    e.preventDefault()
    try {
      const user = getValidData()
      if (user) {
        dispatch({ type: 'ADD_USER', payload: user })
        createFlash(true, 'User score saved', 3000)
        setFormData({ name: '', score: '' })
        setErrors(null)
      }
    } catch (err) {
      console.log(err)
      createFlash(false, 'Something went wrong', 3000)
    }
  }

  return (
    <div className='form-conatiner'>
      <form onSubmit={submitForm} autoComplete='off'>
        <div>
          <input
            name='name'
            type='text'
            placeholder='name'
            value={formData.name}
            onChange={handleChange}
          />
          {errors?.name && <span className='form-error'>{errors.name}</span>}
        </div>
        <div>
          <input
            name='score'
            type='text'
            placeholder='score'
            value={formData.score}
            onChange={handleChange}
          />
          {errors?.score && <span className='form-error'>{errors.score}</span>}
        </div>
        <button className='button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Form
