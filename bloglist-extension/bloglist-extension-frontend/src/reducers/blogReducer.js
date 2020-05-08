
import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'LIKE':
    return state.map(a => a.id === action.data.id ? action.data : a)
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const liking = (blog) => {
  const liked = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const likedBlog = await blogService.update(liked, liked.id)
    console.log(likedBlog)
    dispatch({
      type: 'VOTE',
      data: likedBlog
    })
  }
}

export const adding = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    console.log(blogs.map(blog => blog))
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}
export default blogReducer