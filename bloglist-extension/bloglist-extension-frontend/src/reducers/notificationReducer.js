const initialState = null
const notificationReducer = (state = initialState, action) => {

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'UNSET_NOTIFICATION':
    return null
  default: return state
  }
}

let timeout = null

export const setNotification = (message, type, seconds) => {
  return async dispatch => {
    clearTimeout(timeout)
    dispatch(set(message, type))
    timeout = setTimeout(() => {
      dispatch(unset())
    }, seconds * 1000)
  }
}

export const set = (notification, type) => {
  return {
    type: 'SET_NOTIFICATION',
    data: {message: notification, type: type}
  }
}
export const unset = () => {
  return {
    type: 'UNSET_NOTIFICATION'
  }
}
export default notificationReducer