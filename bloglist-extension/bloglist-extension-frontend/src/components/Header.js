import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/userReducer'

const Blogs = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const handleLogout = () => {
        dispatch(logout())
      }
    return (
        <div>
    
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
    )
}

export default Blogs