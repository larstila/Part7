import blogService from './../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'LIKE':
    console.log('action.data', action.data)
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
  case 'INIT_BLOGS':
    return action.data
  default: return state
  }
}

export const likeBlog = (blog) => {
  let liked = { ...blog, likes: blog.likes + 1 }
  return async dispatch => {
    const likedBlog = await blogService.update(liked, liked.id)
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const blog = await blogService.create(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: blog
    })
  }
}

export const deleteBlog = (blog) => {
  const id = blog.id
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
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