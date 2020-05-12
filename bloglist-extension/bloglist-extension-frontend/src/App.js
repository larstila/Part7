import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from './components/Header'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import LoginPage from './components/Login/LoginPage'
import Notification from './components/Notification'
import UserList from './components/UserList'
import User from './components/User/User'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { getUser } from './reducers/userReducer'

import {
  Switch, Route, useRouteMatch,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(getUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const matchUser = useRouteMatch('/users/:id')
  const matchedUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const matchedBlog = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  return (
    <div>
      <h1> Blogs </h1>
      {user ?
        <>
          <Menu />
          <Notification />
          <Header />
          <Switch>
            <Route path='/users/:id'>
              <User user={matchedUser} />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/blogs/:id'>
              <Blog blog={matchedBlog} />
            </Route>
            <Route path='/blogs'>
              <BlogList />
            </Route>
            <Route path='/'>
              <BlogList />
            </Route>
          </Switch></>
        : <LoginPage />

      }</div>
  )
}

export default App
