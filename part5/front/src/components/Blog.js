import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (blog) => {
    const blogObject = blog
    blogObject.likes = blog.likes + 1

    handleLike(blogObject)
  }

  return (
    <li style={blogStyle}> 
      <em>{blog.title}</em> by <strong>{blog.author}</strong>
      <Togglable buttonLabel='view' buttonHide='hide'>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>likes {blog.likes} <button onClick={ () => addLike(blog)}>like</button></p>
        <p>Added by {blog.user.name}</p>
      </Togglable>
  </li>
)}

export default Blog