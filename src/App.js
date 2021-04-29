import { useState, useEffect, useRef } from 'react'
import Header from './components/Header/Header';
import Text from './components/Text/Text';
import Word from './components/Word/Word';

import "./App.css";
function App() {
  const interval = useRef();
  const [gameOn, setGameOn] = useState(false);
  const [time, setTime] = useState(10000);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOver, setIsOver] = useState(false); 
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
  const [displayWord, setDisplayWord] = useState(null);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setDisplayWord(shuffledWord(words[randomIndex]));

  }
  const checkIfMatch = (value) => {
    if(!currentWord) return;
    if(currentWord === value) {
      getRandomWord();
      return true;
    }
    return false
  }
  const startGame = () => {
    setGameOn(true);
    getRandomWord();
    setIsRunning(true);
  }

  const plusScore = () => setScore(prevScore => prevScore + 1);

  const shuffledWord = word => {
        const splittedWord = word.split('');

        let wordLength = splittedWord.length, randomIndex, tempValue;

        while(wordLength){
            
            randomIndex = Math.floor(Math.random() * wordLength--);

            tempValue = splittedWord[wordLength];
            splittedWord[wordLength] = splittedWord[randomIndex];
            splittedWord[randomIndex] = tempValue;
        }
        return splittedWord.join("");
    }
  const restart = () => {
    setIsOver(false);
    setGameOn(true);
    setIsRunning(true);
    setScore(0);
    setTime(10000);
    getRandomWord();
  }
  useEffect(() => {
    if(isRunning){
      interval.current = setInterval(() => {
        if(time === 0){
          setIsRunning(false);
          setIsOver(true);
          clearInterval(interval.current);
        }else{
          setTime(prevTime => prevTime - 1000)
        }
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [isRunning, time]);
  return (
    <>
    <Header/>
    {gameOn
    ? <Text word={displayWord} time={time} score={score}/>
    : <h1 className="GameStartHeading">Welcome To LAGS Word Guesser</h1>}
    {gameOn
    ? <Word checkIfMatch={checkIfMatch} plusScore={plusScore} isOver={isOver} restart={restart}/>
    : (
      <div className="Start">
        <button className="Btn" onClick={startGame}>Start Game</button>
      </div>
    )}
    </>
  );
}

export default App;
