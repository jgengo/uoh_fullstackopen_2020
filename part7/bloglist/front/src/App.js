import React, { useState, useEffect, useRef } from 'react'
import { connect, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Flash from './components/Flash'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

import { createNotification } from './reducers/notificationReducer'
import { initBlog, createBlog, voteFor, destroy } from './reducers/blogReducer'
import { setUser, logout } from './reducers/userReducer'

import './App.css'

const App = (props) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect( () => {
    props.initBlog()
  }, [props])

  useEffect(() => {
    if (user.username) {
      blogService.setToken(user.token)
    }
  }, [user])

  const notify = (message, type) => {
    props.createNotification({message: message, type: type}, 10)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username: username, password: password })
      props.setUser(user)
      setUsername('')
      setPassword('')
      notify('successfully logged in!', 'success')
    } catch (error) {
      notify(`${error.response.data.error}`, 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    blogService.setToken(null)
    props.logout()
    notify('successfully logged out', 'success')
  }

  const handleCreate = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      props.createBlog(blogObject)
      notify(`${blogObject.title} by ${blogObject.author} has just been added.`, 'success')
    } catch(err) {
      if (err.response && err.response.data && err.response.data.error)
        notify(err.response.data.error, 'error')
    }
  }

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you wanna delete that?'))
    {
      try {
        props.destroy(blogId)
        notify('Successfully deleted. There are worse crimes than burning books. One of them is not reading them.', 'success')
      } catch(err) {
        if (err.response && err.response.data && err.response.data.error)
          notify(err.response.data.error, 'error')
      }
    }
  }

  const handleLike = async (blogObject) => {
    props.voteFor(blogObject)
  }

  if (user.username === null) {
    return (
      <div>
        <Flash />

        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          handleUsernameChange={ ({ target }) => setUsername(target.value) }
          password={password}
          handlePasswordChange={ ({ target }) => setPassword(target.value) }
        />
      </div>
    )
  } else {
    return (
      <div>
        <Flash />
        <em>Logged in as {user.username} ({user.name}) <button onClick={handleLogout}>logout</button></em>
        <h2>blogs</h2>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={handleCreate} />
        </Togglable>

        <ul>
          {
            blogs.sort( (a, b) => a.likes > b.likes ? -1 : 1 ).map(blog =>
              <Blog
                blog={blog}
                handleLike={handleLike}
                canDelete={blog.user.username === user.username ? true : false}
                handleDelete={handleDelete}
                key={blog.id}
              />
            )
          }
        </ul>

      </div>
    )
  }
}

const mapDispatchToProps = {
  initBlog,
  createBlog,
  voteFor,
  destroy,
  setUser,
  logout,
  createNotification
}

const connectedApp = connect(null, mapDispatchToProps)(App)

export default connectedApp