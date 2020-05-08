const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')




blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    username: 1,
    id: 1,
  })
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log(blog.user.toString())

  if (!(decodedToken.id ===  blog.user.toString())) {
    response.status(401).json({ error: 'wrong user' }).end()
} else {
  await Blog.findByIdAndRemove(request.params.id)
  console.log(`Deleted blog with title ${blog.title}`)
  response.status(204).end()
}
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  await Blog.findByIdAndUpdate(id, newBlog, { new: true }).then(
    (updatedBlog) => {
      response.json(updatedBlog.toJSON).end
    }
  )
})

module.exports = blogsRouter
