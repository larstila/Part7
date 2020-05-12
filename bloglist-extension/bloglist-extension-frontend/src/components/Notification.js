import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ( ) => {
  const notification = useSelector(state => state.notification)
  
  if (!notification) {
    return (
      <div role="alert"></div>
    )
  }

  const type = notification.type === 'success' ? 'alert alert-success' : 'alert alert-warning'
  return (
    <div className={type}>{notification.message}</div>
  )
}

export default Notification