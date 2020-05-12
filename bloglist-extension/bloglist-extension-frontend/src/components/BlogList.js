import React from 'react'
import Create from './Create'
import { addBlog } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { Link } from "react-router-dom"


const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = React.createRef()

    const createBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(addBlog(blog))
            dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 5))
        } catch (exception) {
            console.log(exception)
        }
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div><Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <Create createBlog={createBlog} />
        </Togglable>

        <i>Blogs listed by likes</i>       
            <ul>{blogs.sort(byLikes).map(blog =>
            <li key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title} <i>by</i> {blog.author}</Link>
            </li>
            )}</ul></div>
    )
}

export default BlogList