
import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
  case 'LIKE':
    console.log('action.data', action.data)
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const liking = (blog) => {
  const liked = { ...blog, likes: blog.likes + 1, user: {...blog.user, _id: blog.user.id} }
  return async dispatch => {
    console.log(liked)
    const likedBlog = await blogService.update(liked, liked.id)
    console.log('likedBlog', likedBlog)
    dispatch({
      type: 'LIKE',
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