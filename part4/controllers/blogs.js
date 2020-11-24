const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 } )
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)

  blog.user = user._id

  result = await blog.save()
  
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (req, response) => {
  result = await Blog.findByIdAndDelete(req.params.id)
  return response.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  result = await Blog.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {new: true}
  )
  res.json(result)
})


module.exports = blogsRouter
