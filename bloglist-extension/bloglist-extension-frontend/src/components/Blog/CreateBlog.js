import React, { useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import {useField} from './../../utils/useField'

const Create = ( props ) => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {title: title.value, author: author.value, url: url.value, comments: []}
    props.createBlog(newBlog)
  }

  return (
    <div>
      <Form onSubmit={handleNewBlog}>
      <h2>create new</h2>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control {...title} />
        <Form.Label>Author:</Form.Label>
        <Form.Control {...author} />
        <Form.Label>url:</Form.Label>
        <Form.Control {...url} />
        <Button id='create-button' variant="primary" type="submit">
          create
        </Button>
      </Form.Group>
    </Form>

    </div>
  )
}


export default Create
