import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import Create from './Create'
import { useSelector, useDispatch, connect } from 'react-redux'
import { initializeBlogs, addBlog, likeBlog, deleteBlog } from './../reducers/blogReducer'
import { setNotification } from './../reducers/notificationReducer'
import Togglable from './Togglable'

const BlogList = ({ user }) => {

    const blogs = useSelector(state => state.blogs)
    const blogFormRef = React.createRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const createBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility()
            dispatch(addBlog(blog))
            dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success', 5))
        } catch (exception) {
            console.log(exception)
        }
    }

    const handleLike = async (id) => {
        const likedBlog = blogs.find(b => b.id === id)
        dispatch(likeBlog(likedBlog))
        dispatch(setNotification(`Liked '${likedBlog.title}'!`, 'success', 5))
    }

    const handleRemove = async (id) => {
        const blogToRemove = blogs.find(b => b.id === id)
        const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
        if (ok) {
            dispatch(setNotification(`a blog '${blogToRemove.title}' by ${blogToRemove.author} was removed!`, 'success', 5))
            dispatch(deleteBlog(blogToRemove))
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
            notification: state.notification
        }
    )
}

const mapDispatchToProps = {
    setNotification,
    likeBlog,
    addBlog,
    deleteBlog
}

const ConnectedBlogList = connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogList)

export default ConnectedBlogList