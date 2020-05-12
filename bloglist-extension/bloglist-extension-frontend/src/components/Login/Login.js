import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../reducers/userReducer'
import { setNotification } from '../../reducers/notificationReducer'
import { useField } from './../../utils/useField'
import {  Form, Button } from 'react-bootstrap'

const Login = () => {

  const dispatch = useDispatch()
  const username = useField('username')
  const password = useField('password')

  const handleLogin =  (event) => {
    event.preventDefault()
    try {
      dispatch(login(username.value, password.value))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification('wrong username/password', 'error', 5))
    }
  }
  return (

    <div>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control {...username} />
        <Form.Label>password:</Form.Label>
        <Form.Control {...password} />
        <Button id='login-button' variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
    </div>
  )
}

export default Login
