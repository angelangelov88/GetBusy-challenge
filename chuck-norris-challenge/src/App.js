import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  //I added the useState hooks in order to be able to change the states of those variables in the app
  const [joke, setJoke] = useState([])
  const [pointer, setPointer] = useState(0)
  const [prevBtnShown, setPrevBtnShown] = useState(false)
  const [nextBtnShown, setNextBtnShown] = useState(false)

  // I added the useEffect hook to make sure a joke is loaded on page load
  useEffect(  () => {
    newJoke();
  }, []);

  useEffect(() => {
    if (joke.length > 0) {
      setPointer(joke.length - 1)

    }
  }, [joke]);

  //I had to move the if statements to a useEffect hook as the pointer did not count correctly if in the function itself. I have added if statement to make sure all possible scenarios are covered and the buttons are shown/hidden accordingly
  useEffect(() => {
    if (pointer <= 0) {
      setPrevBtnShown(false);
    }
    if (pointer > 0) {
      setPrevBtnShown(true);
    }
    if (pointer >= 0 && pointer !== joke.length -1) {
      setNextBtnShown(true);
    }
    if (pointer === joke.length -1) {
      setNextBtnShown(false);
    } 
  }, [pointer, joke.length]);

  //This is the fetch function to get a joke from the API endpoint. I use it firstly on load and then on click on Get a new joke button
  const newJoke = async () => {
    const result = await axios.get('https://api.chucknorris.io/jokes/random');
    setJoke([...joke, result.data.value]);
    setNextBtnShown(false)
    console.log(joke)
    if (joke.length > 0) {
      setPrevBtnShown(true);
    }
  }
  
  //This is the function to decrement the pointer value and show the previous joke
  const prevJoke = () => {
      setPointer(pointer -1)
  }

  //This is the function to increment the pointer value and show the next joke
  const nextJoke = () => {
      setPointer(pointer +1)
  }

  return (
    <div className="App">
{/* I have added a header and navbar as per the guidelines and styled them to be visible. The sidebar gets hidden on small screens */}
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
{/* This is the main container of the joke. Depending on what is the pointer value, I show the joke accordingly */}
        <div className='joke-container'>
          <h2>Chuck Norris Joke:</h2>
          <h3>{ joke[pointer] }</h3>
        </div>
{/* These are the buttons. I have styled the Get a new joke a bit differently and it is always visible. The other 2 get hidden when not needed (for example Previous is hidden when on the first item in the jokes array) */}
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