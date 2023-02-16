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
const createRandomizedGroupedArray = (list, overrideRandomize) => {
  const randomizedList = overrideRandomize ? list : shuffleArray(list)
  const rows = []
  for (var i = 0; i < randomizedList.length; i += GROUPING_SIZE) {
    rows.push(randomizedList.slice(i, i + GROUPING_SIZE));
  }
  return rows;
}

function App() {
  const overrideRandomize = localStorage.getItem('overrideRandomize') === '1'
  const [displayHeader, setDisplayHeader] = useState(localStorage.getItem('doNotDisplayHeader') !== '1')
  const [focusedImagePath, setFocusedImagePath] = useState()
  const [groupedImagePaths,] = useState(createRandomizedGroupedArray(images, overrideRandomize)) // Utilizing state to prevent it from repeatedly shuffling
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

  const toggleOverrideRandomize = () => {
    localStorage.setItem('overrideRandomize', overrideRandomize ? 0 : 1)
  }

  const turnOffHeader = () => {
    localStorage.setItem('doNotDisplayHeader', 1)
    setDisplayHeader(false)
  }

  const turnOnHeader = () => {
    localStorage.removeItem('doNotDisplayHeader')
    setDisplayHeader(true)
  }
  
  return (
    <div className="app">
      {displayHeader && <div id="header" className="header">
        <div className="title">ennukee ai showcase</div>
        <div className="subtitle">All imagery above was created by me using <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">Simple Diffusion</a> to run either the <a href="https://huggingface.co/WarriorMama777/OrangeMixs">AbyssOrangeMix or BloodOrangeMix</a> models. All images can be freely used by anyone, but please do note the <a href="https://huggingface.co/spaces/CompVis/stable-diffusion-license">Stable Diffusion license / terms of use</a>.</div>
        <div className="close-header"><span className="link" onClick={turnOffHeader}>Click here to remove this header.</span> You can bring it back via the link in the footer, if need be.</div>
        <div>To {overrideRandomize ? 'enable' : 'disable'} random ordering of images, <a href="/ai-showcase" onClick={toggleOverrideRandomize}>click here</a>.</div>
      </div>}
      <div id="image-container">
        {groupedImagePaths.map(group => (
          <ImageRow images={group} windowSize={windowSize} focusCallback={focusImage} />
        ))}
      </div>
      <div onClick={clearFocus} id="focused-image" class={focusedImagePath ? 'active' : 'inactive'}>
        <img src={focusedImagePath} alt="focus" />
      </div>
      {!displayHeader && <div className="footer">
        <div>All imagery above was created by me using <a href="https://github.com/AUTOMATIC1111/stable-diffusion-webui">Simple Diffusion</a> to run either the <a href="https://huggingface.co/WarriorMama777/OrangeMixs">AbyssOrangeMix or BloodOrangeMix</a> models. All images can be freely used by anyone, but please do note the <a href="https://huggingface.co/spaces/CompVis/stable-diffusion-license">Stable Diffusion license / terms of use</a>.</div>
        <div>To {overrideRandomize ? 'enable' : 'disable'} random ordering of images, <a href="/ai-showcase" onClick={toggleOverrideRandomize}>click here</a>.</div>
        <div>To restore the header, <a href="#header" onClick={turnOnHeader}>click here</a>.</div>
      </div>}
    </div>
  );
}

export default App;
