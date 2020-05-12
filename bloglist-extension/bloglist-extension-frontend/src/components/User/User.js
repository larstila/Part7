import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const User = ({ user }) => {
    const allBlogs = useSelector(state => state.blogs)
    if (!user) {
        return null
    }
    const blogs = allBlogs.filter(b => b.user.username === user.username)
    console.log('blogs', blogs)



    if (!blogs) {
        return (
            <div>No added blogs</div>
        )
    }
    return (
        <div>
            <h3>
                User {user.username}
            </h3>
            <h4>added blogs</h4>
            <Table striped>

                <tbody>
                    {blogs.map(blog =>
                        <tr key={blog.id}>{blog.title}</tr>
                    )}
                </tbody>
            </Table>
        </div>

    )
}

export default User