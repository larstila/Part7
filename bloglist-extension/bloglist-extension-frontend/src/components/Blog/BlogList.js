import React from 'react'
import CreateBlog from './CreateBlog'
import { addBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from '../Togglable'
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'



const BlogList = () => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = React.createRef()

    const createBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            await dispatch(addBlog(blog))
            dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 5))
        } catch (exception) {
            console.log(exception)
            dispatch(setNotification('Blog must have title, author and url', 'error', 5))
        }
    }

    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div><Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <CreateBlog createBlog={createBlog} />
        </Togglable>

        <i>Blogs listed by likes</i>       
            <Table striped><tbody>{blogs.sort(byLikes).map(blog =>
            <tr key={blog.id}>
            <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title} <i>by</i> {blog.author}</Link>
            </td>
            </tr>
            )}</tbody></Table></div>
    )
}

export default BlogList