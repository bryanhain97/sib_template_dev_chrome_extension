import React from 'react';
import Headline from './components/Headline';
import Templates from './components/Templates/Templates';
import './App.sass';

function App() {
  return (
    <div className="App">
      <Headline
        title="Code-templates"
        description="A chrome devtool designed to comfort SIB template developers with prefabricated code-templates."
      />
      <Templates />
    </div>
  );
}

export default App;
