const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'HTML is easy',
    title: 'dsa',
    url: 'asdas',
    likes: 3
  },
  {
    author: 'This is easy',
    title: 'dsa',
    url: 'asdas',
    likes: 4
  },

]

const initialUsers = [
  {
    name: "Name",
    username: "root",
    password: "password"
  }
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon' })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb, initialUsers
}