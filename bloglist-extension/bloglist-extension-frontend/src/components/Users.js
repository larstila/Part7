import React, {useEffect} from 'react'
import userServices from './../services/users'

const Users = () => {

    useEffect(() => {
        const users = userServices.getAll()
    }, [])

    return (
        <div>Users</div>
    )
}

export default Users