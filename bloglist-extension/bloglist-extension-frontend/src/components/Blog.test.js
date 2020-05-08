import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    author: 'Testing author',
    title: 'Testing title',
    url: 'www.url.com',
    user: {
      username: 'tester',
      name: 'Test McTester',
    },
  }

  const user = {
    username: 'tester',
    name: 'Test McTester',
  }
  const mockHandler = jest.fn()

  test('renders content', () => {
    const component = render(
      <Blog
        user={user}
        blog={blog}
        handleLike={mockHandler}
        handleRemove={mockHandler}
      />
    )

    expect(component.container).toHaveTextContent('Testing')
  })

  test('at the start info is not visible', () => {
    const component = render(
      <Blog
        user={user}
        blog={blog}
        handleLike={mockHandler}
        handleRemove={mockHandler}
      />
    )

    const div = component.container.querySelector('.visibleInfo')

    expect(div).toHaveStyle('display: none')
  })
  test('after clicking button info is visible', () => {
    const component = render(
      <Blog
        user={user}
        blog={blog}
        handleLike={mockHandler}
        handleRemove={mockHandler}
      />
    )
    const button = component.getByText('show info')
    fireEvent.click(button)


    const div = component.container.querySelector('.visibleInfo')

    expect(div).not.toHaveStyle('display: none')
  })
  test('after cliking like twice eventHanlder is called two times', () => {
    const component = render(
      <Blog
        user={user}
        blog={blog}
        handleLike={mockHandler}
        handleRemove={mockHandler}
      />
    )
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
