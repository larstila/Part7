import React from 'react'
import { connect } from 'react-redux'

const Notification = ( props ) => {
  const notification = props.notification
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

const mapStateToProps = (state => {
  return {
    notification: state.notification
  }
})

const ConnectedNotificaiton = connect(mapStateToProps)(Notification)

export default ConnectedNotificaiton