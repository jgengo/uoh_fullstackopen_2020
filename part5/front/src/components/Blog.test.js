import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

{/* <Blog
blog={blog}
handleLike={handleLike}
canDelete={blog.user.username === user.username ? true : false}
handleDelete={handleDelete}
key={blog.id}
/> */}

describe('testing the Blog component', () => {

  let component
  let mockHandler = jest.fn();

  beforeEach(() => {
    const blog = {
      title: 'Testing component seems really boring',
      author: 'George Michael',
      url: 'http://www.google.fr',
      likes: 10,
      user: {
        username: "jojo",
        name: "Jordane"
      }
    }

    component = render(
      <Blog blog={blog} handleLike={mockHandler} />
    )
  })

  test('testing Blog component with default', () => {
    expect(component.container).toHaveTextContent(
      'Testing component seems really boring by George Michael'
    )

    expect(component.getByText('http://www.google.fr')).not.toBeVisible()
    expect(component.getByText('likes 10')).not.toBeVisible()
  })

  test('testing Blog component when togglable clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    expect(component.getByText('http://www.google.fr')).toBeVisible()
    expect(component.getByText('likes 10')).toBeVisible()
  })

  test('testing Blog component when likes is clicked', () => {

    const button = component.container.querySelector('.buttonLike')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})