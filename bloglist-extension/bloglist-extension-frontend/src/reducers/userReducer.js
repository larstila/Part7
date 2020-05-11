import loginService from './../services/login'
import storage from './../utils/storage'
import {setNotification} from './notificationReducer'

const userReducer = (state = [], action) => {

    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null
        case 'GET_USER': 
            return action.data
        default: return state
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({
            username, password
        })
        storage.saveUser(user)
        dispatch({
            type: 'LOGIN',
            data: user
        })
        dispatch(setNotification(`${user.username} welcome back!`, 'success', 5))
    }
}

export const logout = () => {
    return async dispatch => {
        storage.logoutUser()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const getUser = () => {
    return async dispatch => {
        const user = storage.loadUser()
        dispatch({
            type: 'GET_USER',
            data: user
        })
    }
}


export default userReducer