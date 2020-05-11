import React from 'react'
import { useSelector } from 'react-redux'

const User = ({ user }) => {

    const allBlogs = useSelector(state => state.blogs)
    const blogs = allBlogs.filter(b => b.user.username === user.username)
    console.log('blogs', blogs)
    // const blogs = correctUser.blogs
    if (!user) {
        return null
    }

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
            <ul >
                {blogs.map(blog=> 
                    <li key={blog.id}>{blog.title}</li>
                )}
            </ul>
        </div>
    )
}

export default User