import React from 'react'

const Notification = ({ notification }) => {

  const style = notification ? {
    border: 'solid',
    borderColor: 'red',
    padding: 10,
    borderWidth: 1
  } : null

  return (
    <div style={style}>{notification}</div>
  )
}

export default Notification