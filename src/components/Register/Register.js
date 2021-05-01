import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useHistory } from 'react-router-dom'
import { db } from '../../firebase'

import "./Register.css"
function Register() {
    const [user, setUser] = useState({
        email: '',
        username: '',
        password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { signup } = useContext(AuthContext);

    const history = useHistory();

    const changeInput = (e) => setUser({...user, [e.target.name]: e.target.value});
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        if(!user.username || !user.email || !user.password){
            setLoading(false);
            setError('Please fill in all fields.');
            return
        }

        if(user.password !== user.confirm_password){
            setLoading(false);
            setError('Password does not match.');
            return
        }
        const docRef = db.collection('users').doc(user.username);

        docRef.get()
        .then((doc) => {
            if(doc.exists){
                setLoading(false);
                setError('This username is already taken.');
            }else{
                signup(user)
                .then(() => {
                    setLoading(false);
                    db.collection('users').doc(user.username).set({
                        email: user.email,
                        highscore: 0
                    })
                    .then(() => console.log("User Successfully Added"))
                    .catch(err => console.log(err));
                    history.push('/');

                })
                .catch(err => {
                    setLoading(false);
                    setError(err.message);
                })
            }
        })
        .catch(err => console.log(err));
    }
    return (
        <section className="Register">
            <div className="container FormContainer">
                <form className="Form" onSubmit={handleSubmit}>
                    <h1 className="FormTitle">Create An Account</h1>
                    {error && (
                        <div className="AlertError">
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="FormGroup">
                        <label>Username</label>
                        <input type="text" name="username" className="FormInput" onChange={changeInput}/>
                    </div>
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
                </form>
            </div>
        </section>
    )
}

export default Register
