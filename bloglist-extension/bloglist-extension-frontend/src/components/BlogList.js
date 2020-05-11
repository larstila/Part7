import React, {  useEffect } from 'react'
import Blog from './Blog'
import Create from './Create'
import { connect } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'
import Togglable from './Togglable'

const BlogList = (props) => {

    const blogs = props.blogs
    const user = props.user
    const blogFormRef = React.createRef()
    

    useEffect(() => {
        props.initializeBlogs()
    }, [props])

    const createBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            props.addBlog(blog)
            props.setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 5)
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLike = async (id) => {
        const likedBlog = blogs.find(b => b.id === id)
        props.likeBlog(likedBlog)
        props.setNotification(`Liked '${likedBlog.title}'!`, 'success', 5)
    }

    const handleRemove = async (id) => {
        const blogToRemove = blogs.find(b => b.id === id)
        const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
        if (ok) {
            props.setNotification(`a blog '${blogToRemove.title}' by ${blogToRemove.author} was removed!`, 'success', 5)
            props.deleteBlog(blogToRemove)
        }
    }


    const byLikes = (b1, b2) => b2.likes - b1.likes

    return (
        <div><Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <Create createBlog={createBlog} />
        </Togglable>

            {blogs.sort(byLikes).map(blog =>
                <Blog
                    key={blog.id}
                    blog={blog}
                    handleLike={handleLike}
                    handleRemove={handleRemove}
                    own={user.username === blog.user.username}
                />
            )}</div>
    )
}

const mapStateToProps = (state) => {
    return (
        {
            blogs: state.blogs,
            notification: state.notification,
            user: state.user
        }
    )
}

const mapDispatchToProps = {
    setNotification,
    likeBlog,
    addBlog,
    deleteBlog,
    initializeBlogs
}

const ConnectedBlogList = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)

export default ConnectedBlogList