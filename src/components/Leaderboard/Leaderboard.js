import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider'
import "./Leaderboard.css"
function Leaderboard() {
    const { standings } = useContext(AuthContext);
    return (
        <section className="Leaderboard">
            <div className="container LeaderboardContainer">
                <h1 className="LeaderboardTitle">Leaderboard</h1>
                <div><Link to="/" className="Btn">Back</Link></div>
                <div className="UserTable">
                    <p className="UserHeadings">
                       <span>#</span> 
                       <span>Handle</span> 
                       <span>Score</span> 
                    </p>
                    {standings && standings.map((standing, index) => (
                    <p className="UserStanding" key={index}>
                       <span>{index + 1}</span> 
                       <span>{standing.handleName}</span> 
                       <span>{standing.highscore}</span> 
                    </p>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Leaderboard
