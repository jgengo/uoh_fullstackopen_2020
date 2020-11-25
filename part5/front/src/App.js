import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Flash from './components/Flash'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorType, setErrorType ] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort( (a, b) => a.likes > b.likes ? -1 : 1 ) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type) => {
    setErrorMessage(message)
    setErrorType(type)
    setTimeout(() => {
      setErrorMessage(null)
      setErrorType(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username: username, password: password})
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      notify('successfully logged in!', 'success')
    } catch (error) {
      notify(`${error.response.data.error}`, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
    notify('successfully logged out', 'success')
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      notify(`${blogObject.title} by ${blogObject.author} has just been added.`, 'success')
    } catch(err) {
      if (err.response && err.response.data && err.response.data.error)
        notify(err.response.data.error, 'error')
    }    
  }

  const handleLike = async (blogObject) => {
    try {
      await blogService.update(blogObject)
      setBlogs(blogs.map( blog => blog.id === blogObject.id ? blogObject : blog ))
    } catch(err) {
      if (err.response && err.response.data && err.response.data.error)
        notify(err.response.data.error, 'error')
    }
    
  }

  if (user === null) {
    return (
      <div>
      <Flash message={errorMessage} type={errorType} />

      <LoginForm 
        handleSubmit={handleLogin}
        username={username}
        handleUsernameChange={ ({target}) => setUsername(target.value) }
        password={password}
        handlePasswordChange={ ({target}) => setPassword(target.value) }
      />
    </div>
    )
  } else {
    return (
      <div>
        <Flash message={errorMessage} type={errorType} />
        <em>Logged in as {user.username} ({user.name}) <button onClick={handleLogout}>logout</button></em>
        <h2>blogs</h2>

        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={handleCreate} />
        </Togglable>

        <ul>
          {blogs.map(blog => <Blog blog={blog} handleLike={handleLike} key={blog.id} />)}
        </ul>

      </div>
    )
  }
}

export default App