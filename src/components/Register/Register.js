import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import "./Register.css"
function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signup } = useContext(AuthContext);

    const changeInput = (e) => setUser({...user, [e.target.name]: e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if(!user.email || !user.password){
            setLoading(false);
            setError('Please fill in all fields.');
            return
        }

        if(user.password !== user.confirm_password){
            setLoading(false);
            setError('Password does not match.');
            return
        }
        signup(user)
                .then((res) => {
                    db.collection('users').doc(res.user.email).set({
                        handleName: "Player",
                        highscore: 0,
                    })
                    .then(() => window.location.reload())
                    .catch(err => setError(err.message))
                })
                .catch(err => {
                    setLoading(false);
                    setError(err.message);
                })
    }
    return (
        <section className="Register">
            <div className="container FormContainer">
                {loading ? (
                    <div className="Loading">
                        <Spinner/>
                    </div>
                ) : (
                    <form className="Form" onSubmit={handleSubmit}>
                    <h1 className="FormTitle">Create An Account</h1>
                    {error && (
                        <div className="AlertError">
                            <p>{error}</p>
                        </div>
                    )}
                    <div className="FormGroup">
                        <label>Email</label>
                        <input type="email" name="email" className="FormInput" onChange={changeInput}/>
                    </div>
                    <div className="FormGroup">
                        <label>Password</label>
                        <input type="password" name="password" className="FormInput" onChange={changeInput}/>
                    </div>
                    <div className="FormGroup">
                        <label>Confirm Password</label>
                        <input type="password" name="confirm_password" className="FormInput" onChange={changeInput}/>
                    </div>
                    <div className="FormGroup">
                        {!loading && <button className="Btn BtnBlock" type="submit">Sign Up</button>}
                    </div>
                    <p className="Redirect"><Link to="/login">Login With Your Account</Link></p>
                </form>
                )}
                
            </div>
        </section>
    )
}

export default Register
