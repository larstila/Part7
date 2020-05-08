//var chai = require('chai')
//var should = chai.should();
const create = (title, author, url) => {
    cy.get('#title').type(title)
    cy.get('#author').type(author)
    cy.get('#url').type(url)
    cy.get('#create-button').click()
}

const create1 = (title, author, url, likes, user) => {
    const blog = {
        title: title,
        author: author,
        url: url,
        likes: likes,
        user: user
    }
    cy.request('POST', 'http://localhost:3001/api/blogs', blog)
}

describe('Blog app', function () {
  let user
  let user1
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    user = {
      name: 'Tester McTest',
      username: 'tester',
      password: 'test',
    }
    user1 = {
        name: 'Test Testinen',
        username: 'tester1',
        password: 'test1',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', user1)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('Login from is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it("logging in with wrong credentials doesn't log in", function () {
      cy.contains('login').click()
      cy.get('#username').type('wrong')
      cy.get('#password').type('user')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('logging in with right credentials logs in', function () {
      cy.contains('login').click()
      cy.get('#username').type('tester')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.get('.success').contains('Login was succesfull')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('tester')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })
    it('a new blog can be created and it is added to the list', function () {
      cy.get('#visible-button').click()
      cy.get('#title').type('Testtitle')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('www.url.com')
      cy.get('#create-button').click()

      cy.contains('Testtitle - Test Author')
      cy.get('#info-visible').should('not.be.visible')
    })
    describe('Tests with blog', function () {
      beforeEach(function () {
        cy.get('#visible-button').click()
        create('Testtitle', 'Test Author', 'www.url.com')
      })
      
      it('Blog can be liked', function () {
        cy.get('#show-info-button').click()
        cy.get('#likes').should('contain', 0)
        cy.get('#like-button').click()
        cy.get('#likes').should('contain', 1)
        cy.get('#like-button').click()
        cy.get('#likes').should('contain', 2)
      })

      it('Blog can be deleded', function() {
        cy.get('#show-info-button').click()
        cy.get('#remove-button').click()
        cy.contains('tester removed "Testtitle"')
        cy.get('Testtitle').should('not.exist')
      })

      it('Blog can not be deleded by different user', function() {
          cy.get('#logout-button').click()
          cy.get('#username').type('tester1')
          cy.get('#password').type('test1')
          cy.get('#login-button').click()
          cy.get('#show-info-button').click()
          cy.get('#remove-button').should('not.exist')
      })

      it.only('Blogs are sorted by most likes', function() {

        cy.get('#show-info-button').click()

        create('second', 'author2', 'www.usr2.com')
        cy.get('#second').find('#show-info-button').click()
        cy.get('#second').find('#like-button').click()

        create('most', 'author', "www.url3.com")
        cy.get('#most').find('#show-info-button').click()
        cy.get('#most').find('#like-button').click()
        cy.get('#most').find('#show-info-button').click()
        cy.get('#most').find('#like-button').click()



        // setting all blogs visible
        cy.get('#most').find('#show-info-button').click()
        cy.get('#second').find('#show-info-button').click()
        cy.get('#Testtitle').find('#show-info-button').click()


        cy.get('#blogs').then($blogs => {
            var likes = $blogs.map($blog => $blog.likes)
            cy.wrap(likes).should("equal", likes.sort()) 
        })
      })
    })
  })
})
