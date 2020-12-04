import React from 'react'
import { useSelector } from 'react-redux'

const Flash = () => {
  const notification = useSelector(state => state.notification)

  if (notification.message === null) {
    return null
  }

  return (
    <div id='error' className={notification.type}>
      <p>{notification.message}</p>
    </div>
  )
}

export default Flash