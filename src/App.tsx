import React from 'react'
import Headline from './components/Headline'
import Templates from './components/Templates/Templates'
import './index.sass'

function App() {
  return (
    <div className="App">
      <Headline
        title="code snippets"
        description="A devtool designed to comfort SIB template developers with prefabricated code-templates."
      />
      <Templates />
    </div>
  )
}

export default App
