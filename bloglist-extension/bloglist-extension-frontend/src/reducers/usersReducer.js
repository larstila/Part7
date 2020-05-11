import userServices from './../services/users'
import storage from '../utils/storage'

const userReducer = (state = [], action) => {

    switch (action.type) {
        case 'GET_USERS': 
            return action.data
        default: return state
    }
}

export const getUsers = () => {
    return async dispatch => {
        const users = await userServices.getAll()
        dispatch({
            type: 'GET_USERS',
            data: users
        })
    }
}


export default userReducer