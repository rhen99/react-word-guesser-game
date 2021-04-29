import "./Text.css"
function Text({currentWord}) {
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
    return (
        <section className="Text">
            <div className="container">
                <h1 className="ShuffledWord">{currentWord && shuffledWord(currentWord)}</h1>
                <p className="ScoreBoard">
                    <span className="Score">Score: 0</span>
                    <span className="Time">Time: 0</span>
                </p>
            </div>
        </section>
    )
}

export default Text
