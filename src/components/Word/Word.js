import './Word.css';
function Word({checkIfMatch}) {
    const handleChange = (e) => {
        if(checkIfMatch(e.target.value)){
            e.target.value = '';
        }
        
    }
    return (
        <section className="Word">
            <div className="container">
                <div className="TextInput">
                    <input type="text" className="Input" onChange={handleChange} placeholder="Enter word here..."/>
                </div>
            </div>
        </section>
    )
}

export default Word
