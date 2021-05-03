import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import './Word.css';
function Word({checkIfMatch, plusScore, isOver, restart, plusTime}) {
    const handleChange = (e) => {
        if(checkIfMatch(e.target.value)){
            e.target.value = '';
            plusScore();
            plusTime();
        }
    }
    const { logout } = useContext(AuthContext);

    const handleLogOut = (e) => {
        e.preventDefault();
        logout()
        .then(() => window.location.reload())
        .catch(err => console.log(err.message));
    }

    return (
        <section className="Word">
            <div className="container">
                {isOver 
                ? (
                    <>
                        <h2 className="GameOver">TIME'S UP!!!</h2>
                        <div className="Menu">
                            <div>
                                <button className="Btn" onClick={restart}>Restart Game</button>
                            </div>
                            <div>
                                <button className="Btn">Leaderboard</button>
                            </div>
                            <div>
                                <button className="Btn" onClick={handleLogOut}>Log Out</button>
                            </div>
                        </div>
                    </>
                )
                : (
                    <div className="TextInput">
                        <input type="text" className="Input" onChange={handleChange} autoFocus placeholder="Enter word here..."/>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Word
