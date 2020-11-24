const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeAll(async () => {
	await User.deleteMany({});

	const myUser = {
		username: 'titus',
		password: 'I<3FINLAND',
		name: 'Jordane G.',
	};

  await api.post('/api/users')
    .send(myUser)
  
	const login = await api.post('/api/login').send({
		username: myUser.username,
		password: myUser.password,
  });
  token = login.body.token;
});


const initialBlogs = [
  {
    title: 'Facebook is not my best',
    author: 'mark kukumber',
    url: "https://mark.kukumber.fi",
    likes: 0
  },
  {
    title: 'Rusty screws',
    author: 'Elon Rust',
    url: "https://elon.rust.fi",
    likes: 15
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('field id is present', async () => {
  const resp = await api.get('/api/blogs/')
  expect(resp.body[0].id).toBeDefined()
})


test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Gerard aime Alko',
    author: 'G. Depardieu',
    url: 'http://www.gerard.depardieu.fr',
    likes: 1000
  }

  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
    'Gerard aime Alko'
  )
})


test ('a valid blog can be added with 0 likes by default', async() => {
  const newBlog = {
    title: "BananaPeeler",
    author: "Mike Tyson",
    url: "http://my.weird.job"
  }

  const res = await api
    .post('/api/blogs')
    .set('authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(res.body.likes).toBe(0)
})

test ('an invalid blog lead to 400', async () => {
  const newBlogWithoutTitle = {
    author: "mita vitua",
    url: "na"
  }

  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${token}`)
    .send(newBlogWithoutTitle)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const newBlogWithoutAuthor = {
    title: "mita vitua",
    url: "na"
  }

  await api
    .post('/api/blogs')
    .set('authorization', `bearer ${token}`)
    .send(newBlogWithoutAuthor)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test ('posting without creds leads to 403', async () => {
  const newBlog = {
    author: "Roger That",
    title: "mita vitua",
    url: "na"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})