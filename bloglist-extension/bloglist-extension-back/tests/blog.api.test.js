const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('./../models/blog')
let token = ''

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  const response = await api
  .post('/api/login')
  .send( {
    username: 'root',
    password: 'sekret'
  })
  token = response.body.token
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})

test('all returned blogs have id not _id ', async () => {
  const response = await api.get('/api/blogs')
   response.body.map(blog => {
     expect(blog.id).toBeDefined()
   })
})

test('can add blogs and they have correct content', async () => {
  const newBlog = {
    author: 'Some',
    title: 'fancy title',
    url: 'www.wow.fi',
    likes: 99,
  }

  console.log("token second time: " + token)
  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  expect(titles).toContain(
    'fancy title'
  )
})

test('if likes are not defined will be put as 0', async () => {
  const newBlogWithOutLikes = {
    author: 'Some',
    title: 'fancy title',
    url: 'www.wow.fi',
  }
  await api
  .post('/api/blogs')
  .set('Authorization', `bearer ${token}`)
  .send(newBlogWithOutLikes)
  .expect(200)
  .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toEqual(0)
})

test('post is not valid without title and url', async () => {
  const newBlogWithTitle = {
    author: 'Some',
    url: 'www.wow.fi',
  }

const newBlogWithOutUrl = {
  author: 'Some',
  title: 'fancy title',
}
const newBlogWithOutUrlOrTitle = {
  author: 'some'
}
await api
.post('/api/blogs')
.set('Authorization', `bearer ${token}`)
.send(newBlogWithOutUrl)
.expect(400)

await api
.post('/api/blogs')
.set('Authorization', `bearer ${token}`)
.send(newBlogWithOutUrlOrTitle)
.expect(400)

await api
.post('/api/blogs')
.set('Authorization', `bearer ${token}`)
.send(newBlogWithOutUrlOrTitle)
.expect(400)

})

test.skip('blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  await api
  .delete(`/api/blogs/${blogToDelete.id}`)
  
  .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

  const ids = blogsAtEnd.map(b => b.id)
  expect(ids).not.toContain(blogToDelete.id)
})

test('blog can be modified', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]
  const updatedBlog = ({...blogToEdit})
  updatedBlog.likes += 1
  const response = await api
  .put(`/api/blogs/${blogToEdit.id}`)
  .send(updatedBlog)
  .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toBe(blogToEdit.likes + 1)
})

afterAll(() => {
  mongoose.disconnect()
})