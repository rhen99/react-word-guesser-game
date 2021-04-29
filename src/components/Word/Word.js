import './Word.css';
function Word({checkIfMatch, plusScore, isOver, restart}) {
    const handleChange = (e) => {
        if(checkIfMatch(e.target.value)){
            e.target.value = '';
            plusScore();
        }
        
    }
    return (
        <section className="Word">
            <div className="container">
                {isOver 
                ? (
                    <>
                        <h2 className="GameOver">TIME'S UP!!!</h2>
                        <div className="Start">
                            <button className="Btn" onClick={restart}>Restart Game</button>
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
