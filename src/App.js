import { useState, useEffect } from 'react';

import './App.css';
import images from './images';
import { ImageRow } from './components/ImageRow'

const GROUPING_SIZE = 5; // currently hardcoded, may change to dynamic in the future
const shuffleArray = (list) => {
  // Fisher-Yates shuffle algorithm
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
const createRandomizedGroupedArray = (list) => {
  const randomizedList = shuffleArray(list)
  const rows = []
  for (var i = 0; i < randomizedList.length; i += GROUPING_SIZE) {
    rows.push(randomizedList.slice(i, i + GROUPING_SIZE));
  }
  return rows;
}

function App() {
  const [focusedImagePath, setFocusedImagePath] = useState()
  const [groupedImagePaths,] = useState(createRandomizedGroupedArray(images)) // Utilizing state to prevent it from repeatedly shuffling
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

  const focusImage = (path) => {
    setFocusedImagePath(path)
  }

  const clearFocus = () => {
    setFocusedImagePath()
  }
  
  return (
    <div className="app">
      <div id="image-container">
        {groupedImagePaths.map(group => (
          <ImageRow images={group} windowSize={windowSize} focusCallback={focusImage} />
        ))}
      </div>
      <div onClick={clearFocus} id="focused-image" class={focusedImagePath ? 'active' : 'inactive'}>
        <img src={focusedImagePath} alt="focus" />
      </div>
    </div>
  );
}

export default App;
