import { useContext } from 'react';
import {AuthContext} from '../../context/AuthProvider';
function HomeMenu({startGame}) {
    const { logout } = useContext(AuthContext);
    const handleLogOut = (e) => {
        e.preventDefault();
        logout()
        .then(() => window.location.reload())
        .catch(err => console.log(err.message));
    }
    return (
        <div className="Menu">
          <div>
            <button className="Btn" onClick={startGame}>Start Game</button>
          </div>
          <div>
            <button className="Btn">Leaderboard</button>
          </div>
          <div>
            <button className="Btn" onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
    )
}

export default HomeMenu
