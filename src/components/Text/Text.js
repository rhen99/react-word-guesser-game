import "./Text.css"
function Text({word, time, score}) {
    
    
    const convertToSeconds = (milliseconds) => {
        return  ((milliseconds % 60000) / 1000).toFixed(0);
    }
    return (
        <section className="Text">
            <div className="container">
                <h1 className="ShuffledWord">{word}</h1>
                <p className="ScoreBoard">
                    <span className="Score">Score: {score}</span>
                    <span className="Time">Time: {convertToSeconds(time)}</span>
                </p>
            </div>
        </section>
    )
}

export default Text
