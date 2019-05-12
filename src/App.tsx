import React from 'react'
import logo from './logo.svg'
import './App.css'
import { AriaHidden } from './AriaHidden'

const App: React.FC = () => {
  const [ariaHidden, setAriaHidden] = React.useState(true)

  return (
    <React.Fragment>
      <button
        onClick={() => {
          setAriaHidden(!ariaHidden)
        }}
      >
        aria-hidden={ariaHidden.toString()}
      </button>
      <AriaHidden aria-hidden={ariaHidden} as="span">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <React.Fragment>
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </React.Fragment>
          </header>
        </div>
      </AriaHidden>
      <button
        onClick={() => {
          setAriaHidden(!ariaHidden)
        }}
      >
        aria-hidden={ariaHidden.toString()}
      </button>
    </React.Fragment>
  )
}

export default App
