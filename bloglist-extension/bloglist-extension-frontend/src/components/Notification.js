import React from 'react'
import { useSelector } from 'react-redux'

const Notification = ( ) => {
  const notification = useSelector(state => state.notification)
  const style = notification ? {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  } : null

  if (!notification) {
    return (
      <div style={style}></div>
    )
  }
  return (
    <div style={style}>{notification.message}</div>
  )
}

export default Notification