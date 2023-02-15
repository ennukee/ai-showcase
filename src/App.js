import { useState, useEffect } from 'react';

import './App.css';
import images from './images';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  console.log(images[0])

  return (
    <div className="app">
      <div id="image-container">
        {images.map((image, index) => (
          <img key={index} src={image} alt={index} height={310} />
        ))}
      </div>
    </div>
  );
}

export default App;
