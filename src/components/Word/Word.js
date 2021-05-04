import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider';
import './Word.css';
function Word({checkIfMatch, plusScore, isOver, restart, plusTime, score}) {
    const { logout, updateUserData, userData, currentUser, getStandings } = useContext(AuthContext);

    const [highscore, setHighscore] = useState(`Highest Score: ${userData.highscore}`)

    const handleChange = (e) => {
        if(checkIfMatch(e.target.value)){
            e.target.value = '';
            plusScore();
            plusTime();
        }
    }
    

    const handleLogOut = (e) => {
        e.preventDefault();
        logout()
        .then(() => window.location.reload())
        .catch(err => console.log(err.message));
    }

    useEffect(() => {
        if(isOver){
            if(score > userData.highscore){
                updateUserData(currentUser.email, 'highscore', score);
                setHighscore(`New Highest Score: ${score}`);
                getStandings();
            }
        }
    }, [isOver, currentUser, score, updateUserData, userData.highscore, getStandings])
    return (
        <section className="Word">
            <div className="container">
                {isOver 
                ? (
                    <>
                        <h2 className="GameOver">{highscore}</h2>
                        <div className="Menu">
                            <div>
                                <button className="Btn" onClick={restart}>Restart Game</button>
                            </div>
                            <div>
                                <Link to="/leaderboard" className="Btn">Leaderboard</Link>
                            </div>
                            <div>
                                <button className="Btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    </>
                )
                : (
                    <>
                    <div className="TextInput">
                        <input type="text" className="Input" onChange={handleChange} autoFocus placeholder="Enter word here..."/>
                    </div>
                    <p className="HighScore">{highscore}</p>
                    </>
                )}
            </div>
        </section>
    )
}

export default Word
