import './App.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [joke, setJoke] = useState([''])
  const [pointer, setPointer] = useState(0)
  const [prevBtnShown, setPrevBtnShown] = useState(false)
  const [nextBtnShown, setNextBtnShown] = useState(false)

  useEffect(  () => {
    newJoke();
  }, []);

  const newJoke = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random');
    setJoke([...joke, result.data.value]);
    console.log(joke)
    if (joke.length > 1) {
      setPrevBtnShown(true);
  }
    setPointer(joke.length)
    setNextBtnShown(false)
  }

  const prevJoke = () => {
    if (pointer <= 1 ) {
      setPrevBtnShown(false)
    } else {
      setPointer(pointer -1)
      setNextBtnShown(true)
    }
    console.log(pointer)
  }

  const nextJoke = () => {
    if (pointer == joke.length -1 ) {
      setNextBtnShown(false)
    } else {
      setPointer(pointer +1)
      setPrevBtnShown(true)
    }
    console.log(pointer)

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chuck Norris App</h1>
      </header>
      <nav className="App-nav">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </nav>
      <main className="App-main">
        <div className='joke-container'>
          <h2>Chuck Norris Joke:</h2>
          <h3>{ joke[pointer] }</h3>
        </div>
        <div className="buttons">
          { prevBtnShown && 
            <button onClick={prevJoke}>Previous joke</button>
          }
          <button onClick={newJoke} className='newJoke'>Get a new joke</button>
          { nextBtnShown && 
            <button onClick={nextJoke}>Next joke</button>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
