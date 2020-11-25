import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: author,
      title: title,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <h2>Add new blog</h2>

      <form onSubmit={addBlog}>
        <div>
                    title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
                    author
          <input value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
                    url
          <input value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default BlogForm