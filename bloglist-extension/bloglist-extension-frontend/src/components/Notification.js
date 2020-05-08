import React from 'react'
import './components.css'

const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  const type = error ? 'error' : 'success'
  return <div className={type}>{message}</div>
}

export default Notification
