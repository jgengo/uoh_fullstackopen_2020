const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  result = await blog.save()
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
