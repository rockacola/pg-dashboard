import ReactDOM from 'react-dom'
import Spinner from './spinner'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Spinner />, div)
})
