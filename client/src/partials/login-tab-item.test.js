import { render, screen } from '@testing-library/react'
import LoginTabItem from './login-tab-item'

it('renders text content', () => {
  render(<LoginTabItem label="lorem" isActive={true} onClick={() => {}} />)
  const component = screen.getByText('lorem')
  expect(component).toBeInTheDocument()
})
