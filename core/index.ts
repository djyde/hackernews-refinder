import { render } from 'react-dom'
import App from './views/App'

function renderToday(target) {
  render(App, target)
}

renderToday(document.querySelector('#root'))
