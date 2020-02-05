import React from 'react';
import {PhotoGallery} from './components';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Photo Viewer Application</h1>
      <p>A photo gallery web application.</p>
      <PhotoGallery />
    </div>
  );
}

export default App;
