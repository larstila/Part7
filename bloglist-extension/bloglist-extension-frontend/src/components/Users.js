import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getUsers } from './../reducers/usersReducer'
import { Table } from 'react-bootstrap'


const Users = (props) => {


    useEffect(() => {
        props.getUsers()
    }, [])

    const users = props.users
    console.log('users in component: ', users)
    return (
        <div>
            <h2>Users</h2>
            <Table striped>
                <tbody>
                    <tr><th>User</th><th>
                        Blogs created
                    </th></tr>
                    {users.map(user =>
                        <tr key={user.id}>
                            <td>
                                {user.name}
                            </td>
                            <td>
                                {user.blogs.length}
                            </td>
                        </tr>)}
                </tbody>
            </Table>

        </div>
    )
    return (<></>)
}

const mapStateToProps = (state) => {
    return (
        {
            users: state.users
        }
    )
}
const mapDispatchToProps = {
    getUsers
}

const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users)
export default ConnectedUsers