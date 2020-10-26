import React from 'react';
import BitmovinPlayer from './player';
import './App.scss';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Bitmovin player</h1>
      <BitmovinPlayer />
    </div>
  );
}

export default App;