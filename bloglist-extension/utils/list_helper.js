// Load the full build.
const _ = require('lodash')

const dummy = (blogs) => {
  blogs.map((blog) => blog)
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return total
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return 0

  const maxLikes = blogs.reduce((max, blog) => {
    return blog.likes > max ? blog.likes : max
  }, 0)
  console.log(maxLikes)
  const favourite = blogs.find((blog) => blog.likes === maxLikes)
  delete favourite._id
  delete favourite.__v
  console.log(favourite)
  return favourite
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0

  let tally = _.reduce(
    blogs,
    (total, next) => {
      total[next.author] = (total[next.author] || 0) + 1
      return total
    },
    {}
  )
  console.log(tally)
  const author = Object.keys(tally).reduce((a, b) =>
    tally[a] > tally[b] ? a : b
  )
  const most = {
    author: author,
    blogs: tally[author],
  }
  console.log(most)
  return most
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0

  let tally = _.reduce(
    blogs,
    (total, next) => {
      total[next.author] = (total[next.author] || 0) + (next.likes)
      return total
    },
    {}
  )
  const author = Object.keys(tally).reduce((a, b) => tally[a] > tally[b] ? a : b)
  const most = {
    author: author,
    likes: tally[author],
  }
  console.log(most)
  return most
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
