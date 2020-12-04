describe('Blog app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')
  })
})

describe('Blog app 2', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/test/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function() {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#loginButton').click()
    cy.contains('Logged in as mluukkai')

    cy.contains('new blog').click()
    cy.get('#title').type('I just added a new blog')
    cy.get('#author').type('Richard G.')
    cy.get('#url').type('http://test.fr')
    cy.get('#add-blog').click()
    cy.get('.error').contains('you need to use your json creds')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  it('A blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('I just added a new blog')
    cy.get('#author').type('Richard G.')
    cy.get('#url').type('http://test.fr')
    cy.get('#add-blog').click()
    cy.contains("I just added a new blog")
  })

  it ('I can like', () => {
    cy.contains('view').click()
    cy.contains('likes 0')
    cy.get('.buttonLike').click()
    cy.contains('likes 1')
  })

  it ('I can destroy', () => {
    cy.contains('view').click()
    cy.contains('DESTROY').click()
    cy.get('.blog').should('not.exist');
  })
  // ...
})

describe('Check order', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'mluukkai', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
    cy.visit('http://localhost:3000')
  })

  it ('create 2 blog and check first has 20likes', () => {
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title: "blog1", author: "onsenfou", url: "ilapasdesite", likes: 15 },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
      }
    });
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: { title: "blog2", author: "onsenfouencoreplus", url: "ilapasdesite", likes: 20 },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
      }
    })
    cy.visit('http://localhost:3000')
    cy.contains('view').click()
    cy.contains('likes 15')
  })

})