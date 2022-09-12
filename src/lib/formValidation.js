/**
 * Validates the form data for adding a user and a score. If any
 * errors are found, an error message is added with setErros.
 * @param {{name: string, score: number}} formData
 * @param {{} | null} setErrors
 * @returns {boolean}
 */
export const validate = (formData, setErrors) => {
  setErrors(null)
  let isValid = true

  if (!formData?.name) {
    setErrors((prev) => ({ ...prev, name: 'Please enter a name' }))
    isValid = false
  }

  if (!formData?.score) {
    setErrors((prev) => ({ ...prev, score: 'Please enter a score' }))
    isValid = false
  } else if (isNaN(parseInt(formData.score)) || formData.score < 0) {
    setErrors((prev) => ({
      ...prev,
      score: 'The score must be a positive integer',
    }))
    isValid = false
  }

  return isValid
}
