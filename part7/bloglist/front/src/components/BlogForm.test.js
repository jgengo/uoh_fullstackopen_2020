import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('testing BlogForm', () => {
  test('check, that the form calls the event handler it received as props with the right details when a new blog is created.', () => {
  
    const component = render(<BlogForm />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: "Aurelien" }
    })
    fireEvent.change(author, {
      target: { value: "Auteur"}
    })
    fireEvent.change(url, {
      target: { value: "www.hive.fi" }
    })

    expect(title.value).toBe('Aurelien')
    expect(author.value).toBe('Auteur')
    expect(url.value).toBe('www.hive.fi')
  })
})