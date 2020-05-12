import React from 'react'
import { addComment } from '../../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { useField } from '../../utils/useField'
import {  Form, Button } from 'react-bootstrap'

const Comment = ( {blog}) => {

    const comment = useField('comment')
    const dispatch = useDispatch()
    const handleComment = (event) => {
        event.preventDefault()
        dispatch(addComment(comment.value, blog.id))
      } 

    return (
        <div>
        <h3>Comments</h3>
        <p><i>{blog.title}</i> has {blog.comments.length} comment(s).</p>
        <Form onSubmit={handleComment}>
            <Form.Group>
                <Form.Label>Add a new comment:</Form.Label>
                <Form.Control {...comment} />
                <Button id="comment-button" variant="primary" type="submit">comment</Button>
            </Form.Group>
        </Form>
        <ul className="list-group list-group-flush">{blog.comments.map((comment, i) =>
        <li key={i} className="list-group-item">{comment}</li>
        )}</ul>
    </div>
    )
}



export default Comment