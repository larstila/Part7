import React, { useState } from 'react'
import './components.css'

const Create = ({ handleCreate }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleFormCreate = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    handleCreate(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>

      <div>
        <form name="create" onSubmit={handleFormCreate}>
          <div>
            Title:{' '}
            <input
              className="flex"
              id = 'title'
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            Author:{' '}
            <input
              className="flex"
              id = 'author'
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            Url:{' '}
            <input
              className="flex"
              type="text"
              id = 'url'
              name="url"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button id='create-button' type="submit">create</button>
        </form>
      </div>
    </div>
  )
}

export default Create
