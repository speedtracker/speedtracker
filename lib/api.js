export const getFieldErrors = error => {
  if (
    !error ||
    error.status !== 400 ||
    !error.data ||
    !Array.isArray(error.data.errors)
  ) {
    return {}
  }

  return error.data.errors.reduce((errors, error) => {
    errors[error.field] = error.message

    return errors
  }, {})
}