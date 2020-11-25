import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Flash from './components/Flash'

import blogService from './services/blogs'
import loginService from './services/login'

import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorType, setErrorType ] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({author: author, url: url, title: title})
      notify(`${title} by ${author} has just been added.`, 'success')
    } catch(err) {
      if (err.response && err.response.data && err.response.data.error)
        notify(err.response.data.error, 'error')
    }
    
  }

  if (user === null) {
    return (
      <div>
      <Flash message={errorMessage} type={errorType} />
      <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
    )
  } else {
    return (
      <div>
        <Flash message={errorMessage} type={errorType} />
        <em>Logged in as {user.username} ({user.name}) <button onClick={handleLogout}>logout</button></em>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

        <h2>Add new one</h2>
        <form onSubmit={handleCreate}>
          <div>
          title
          <input type="text" value={title} name="title" onChange={({ target }) => setTitle(target.value)} />
          </div>
          
          <div>
          author
          <input type="text" value={author} name="author" onChange={({ target }) => setAuthor(target.value)} />
          </div>
          
          
          <div>
          url
          <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
          </div>
          <button type="submit">add</button>
        </form>
      </div>
    )
  }
}

export default App