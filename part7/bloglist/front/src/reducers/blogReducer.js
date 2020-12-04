import blogService from '../services/blogs'


export const destroy = (blogId) => {
  return async dispatch => {
    await blogService.destroy(blogId)
    dispatch({
      type: 'DESTROY_BLOG',
      data: blogId
    })
  }
}

export const voteFor = (blogObject) => {
  return async dispatch => {
    await blogService.update(blogObject)
    dispatch({
      type: 'NEW_VOTE',
      data: blogObject
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const blog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: blog
    })
  }
}

export const initBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      return [ ...state, action.data]
    case 'NEW_VOTE':
      return state.map( blog => blog.id !== action.data.id ? blog : action.data )
    case 'DESTROY_BLOG':
      return state.filter( blog => blog.id !== action.data )
    default:
      return state 
  }
}

export default blogReducer