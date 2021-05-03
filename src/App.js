import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import GuestRoute from './components/GuestRoute/GuestRoute';

import AuthProvider from './context/AuthProvider';

import Header from './components/Header/Header';
import Text from './components/Text/Text';
import Word from './components/Word/Word';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import EditHandle from './components/EditHandle/EditHandle';
import correct from './sfx/correct.mp3';

import "./App.css";
import HomeMenu from './components/HomeMenu/HomeMenu';

function App() {

  const interval = useRef();
  const correctRef = useRef();
  const [gameOn, setGameOn] = useState(false);
  const [time, setTime] = useState(20000);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isOver, setIsOver] = useState(false); 
  const [words] = useState([
    {
      word: "word",
      hint: "You are guessing it."
    },
    {
      word: 'bicycle',
      hint: "It has two wheels."
    },
    {
      word: "vehicle",
      hint: "It's a means of transport."
    },
    {
      word: "basketball",
      hint: "It's round and bounces when it hits the ground."
    },
    {
      word: "vase",
      hint: "It's a vessel for your flowers."
    },
    {
      word: "plant",
      hint: "It grows from dirt and eats sunlight."
    },
    {
      word: "flower",
      hint: "It's smelly."
    },
    {
      word: "dirt",
      hint: "It's not coffee."
    },
    {
      word: "flute",
      hint: "Blow on it to make a sound."
    }
  ]);
  const [currentWord, setCurrentWord] = useState(null);
  const [hint, setHint] = useState(null);
  const [displayWord, setDisplayWord] = useState(null);

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex].word);
    setHint(words[randomIndex].hint);
    setDisplayWord(shuffledWord(words[randomIndex].word));

  }
  const playCorrect = () => {
    correctRef.current.play();
    setTimeout(() => {
      correctRef.current.pause();
      correctRef.current.load();
    }, 1000);
  }
  const checkIfMatch = (value) => {
    if(!currentWord) return;
    if(currentWord === value) {
      getRandomWord();
      playCorrect();
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

  const plusTime = () => setTime(prevTime => prevTime + 5000);

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
    <Router>
      <AuthProvider>
      <Header/>
      <Switch>
        <ProtectedRoute path="/" exact>
        {gameOn
      ? (
        <>
          <Text word={displayWord} hint={hint} time={time} score={score}/>
          
          <Word checkIfMatch={checkIfMatch} plusTime={plusTime} plusScore={plusScore} isOver={isOver} restart={restart}/>
        </>
      )
      : (
         <>
         <h1 className="GameStartHeading">Welcome To LAGS Word Guesser</h1>
         <EditHandle/>
        <HomeMenu startGame={startGame}/>
         </>
      )}
      <audio ref={correctRef}>
        <source src={correct} type="audio/mpeg"></source>
      </audio>
      </ProtectedRoute>
      <GuestRoute path="/login" exact>
        <Login/>
      </GuestRoute>
      <GuestRoute path="/register" exact>
        <Register/>
      </GuestRoute>
      </Switch>
    </AuthProvider>
    </Router>
  );
}

export default App;