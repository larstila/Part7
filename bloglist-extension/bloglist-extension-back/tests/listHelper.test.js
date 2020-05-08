const listHelper = require('../utils/list_helper')

const empty = []

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
]

const listWithMultipleBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Ed',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Ed',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 1,
    __v: 0,
  },
]

describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)

    expect(result).toBe(1)
  })
})

describe('total likes', () => {
  test('when list has no blogs', () => {
    const result = listHelper.totalLikes(empty)
    expect(result).toBe(0)
  })
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('when list has multiple blogs equals the likes of sum of them', () => {
    const result = listHelper.totalLikes(listWithMultipleBlog)
    expect(result).toBe(12)
  })
})

describe('favourite blog', () => {
  test('list with no blogs', () => {
    const result = listHelper.favouriteBlog(empty)
    expect(result).toEqual(0)
  })
  test('when list has one blog it is the favourite', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('when list has multiple blogs with the most likes is the', () => {
    const result = listHelper.favouriteBlog(listWithMultipleBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

})

describe('most blogs', () => {
  const most = { author: 'Edsger W. Dijkstra', blogs: 2 }
  test.only('result with multiple blogs in the list', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlog)
    expect(result).toEqual(most)
  })
  test.only('result with empty', () => {
    const result = listHelper.mostBlogs(empty)
    expect(result).toBe(0)
  })
})

describe('most likes', () => {
  const most = { author: 'Ed', likes: 10 }
  test.only('result with multiple blogs in the list', () => {
    const result = listHelper.mostLikes(listWithMultipleBlog)
    expect(result).toEqual(most)
  })
  test.only('result with empty', () => {
    const result = listHelper.mostLikes(empty)
    expect(result).toBe(0)
  })
})