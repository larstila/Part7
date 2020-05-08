const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcryptjs')

const User = require('./../models/user')

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })
  afterAll(() => {
    mongoose.connection.close()
  })
  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('content-type', /application\/json/)
  })

  test('a valid user can be added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: 'new2',
      username: 'newUser1',
      password: 'sekret',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('a  user with invalid username is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: 'name1',
      username: 'a',
      password: 'sekret',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('username')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('a  user with invalid password is not added', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: 'name1',
      username: 'UserName',
      password: 'st',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      expect(result.body.error).toContain('password')

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })



})
