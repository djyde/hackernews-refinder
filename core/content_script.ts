import { render } from 'react-dom'
import App from './views/App'

// function renderToday(target) {
//   render(App, target)
// }

// renderToday(document.querySelector('#root'))

const el = document.createElement('div')

// el.style.position = 'fixed'
// el.style.right = '0'

document.body.appendChild(el)

render(App, el)
