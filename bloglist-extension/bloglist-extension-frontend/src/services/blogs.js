import axios from 'axios'
import storage from '../utils/storage'

const baseUrl = '/api/blogs'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` }
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = (blog) => {
  const blogToUpdate = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
  const request = axios.put(`${baseUrl}/${blog.id}`, blogToUpdate, getConfig())
  return request.then(response => response.data)
}

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, getConfig())
  return request.then(response => response.data)
}

const createComment = (id, comment) => {
  const request = axios.post(`http://localhost:3001/api/blogs/${id}/comments`, { comment }, getConfig())
  return request.then(response => response.data)
}

export default { getAll, create, update, remove, createComment }