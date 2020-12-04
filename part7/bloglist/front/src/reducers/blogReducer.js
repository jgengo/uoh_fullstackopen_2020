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


  // const handleDelete = async (blogId) => {
  //   if (window.confirm('Are you sure you wanna delete that?'))
  //   {
  //     try {
  //       await blogService.destroy(blogId)
  //       setBlogs( blogs.filter ( blog => blog.id !== blogId ))
  //       notify('Successfully deleted. There are worse crimes than burning books. One of them is not reading them.', 'success')
  //     } catch(err) {
  //       if (err.response && err.response.data && err.response.data.error)
  //         notify(err.response.data.error, 'error')
  //     }
  //   }
  // }

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