import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Create from './CreateBlog'

describe('<Create />', () => {

  const mockHandler = jest.fn()


  test('right infomartion is given to event handler', () => {
    const component = render(
      <Create
        handleCreate={mockHandler}
      />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(author, {
      target: { value: 'Author' }
    })
    fireEvent.change(title, {
      target: { value: 'Title' }
    })
    fireEvent.change(url, {
      target: { value: 'www.url.com' }
    })

    fireEvent.submit(form)
    expect(mockHandler.mock.calls).toHaveLength(1)
    console.log(mockHandler.mock.calls[0])
    expect(mockHandler.mock.calls[0][0]).toContain('Title')
    expect(mockHandler.mock.calls[0][1]).toContain('Author')
    expect(mockHandler.mock.calls[0][2]).toContain('www.url.com')
  })



})