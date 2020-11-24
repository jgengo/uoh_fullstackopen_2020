const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const emptyList = []
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const biggerList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },{
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is 0' , () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('a bigger list is right', () => {
    const result = listHelper.totalLikes(biggerList)
    expect(result).toBe(20)
  })
})

describe('most likes', () => {
  const listBlog = [{
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }]
  const listBlogs = [{
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    likes: 12
  }, {
    title: "Rihanna",
    author: "Rihanna",
    likes: 11500
  }]

  
  test('with one entry', () => {
    const result = listHelper.favoriteBlog(listBlog)
    expect(result).toEqual(listBlog[0])
  })
    
  test('with two entry', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    expect(result).toEqual({
      title: "Rihanna",
      author: "Rihanna",
      likes: 11500
    })
  })



})