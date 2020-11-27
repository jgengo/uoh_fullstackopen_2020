import React from 'react'

const Flash = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (
    <div id='error' className={type}>
      <p>{message}</p>
    </div>
  )
}

export default Flash