import { useState, useEffect } from 'react'
import Header from './components/Header/Header';
import Text from './components/Text/Text';
import Word from './components/Word/Word';

import "./App.css";
function App() {
  const [gameOn, setGameOn] = useState(false);
  const [words] = useState([
    'word',
    'bicycle',
    'vehicle',
    'basketball',
    'vase',
    'plant',
    'flower',
    'dirt',
    'flute'
  ]);
  const [currentWord, setCurrentWord] = useState(null);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);


  }
  const checkIfMatch = (value) => {
    if(!currentWord) return;
    if(currentWord === value) {
      getRandomWord();
      return true;
    }
    return false
  }
  useEffect(() => {
    getRandomWord();
  }, []);

  return (
    <>
    <Header/>
    {gameOn
    ? <Text currentWord={currentWord}/>
    : <h1 className="GameStartHeading">Welcome To LAGS Word Guesser</h1>}
    {gameOn
    ? <Word checkIfMatch={checkIfMatch}/>
    : (
      <div className="Start">
        <button className="Btn">Start Game</button>
      </div>
    )}
    </>
  );
}

export default App;
