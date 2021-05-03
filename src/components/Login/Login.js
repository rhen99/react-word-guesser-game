import {AuthContext} from '../../context/AuthProvider';
import { useState, useContext } from 'react';
function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const { login } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if(!user.email || !user.password) {
            setError('Please fill in all fields.');
            setLoading(false);
            return
        }
        login(user)
        .then(() => {
            setLoading(false);
            window.location.reload();
        })
        .catch((err) => {
            setLoading(false);
            setError(err.message);
        });
        

    }

    const changeInput = (e) => setUser({...user, [e.target.name]: e.target.value});
    return (
        <section className="Register">
            <div className="container FormContainer">
                <form className="Form" onSubmit={handleSubmit}>
                    <h1 className="FormTitle">Log In Your Account</h1>    
                    {error && (
                        <div className="AlertError">
                            <p>{error}</p>
                        </div>
                    )}            
                    <div className="FormGroup">
                        <label>Email</label>
                        <input type="email" onChange={changeInput} name="email" className="FormInput"/>
                    </div>
                    <div className="FormGroup">
                        <label>Password</label>
                        <input type="password" onChange={changeInput} name="password" className="FormInput"/>
                    </div>
                    
                    <div className="FormGroup">
                        {!loading && <button className="Btn BtnBlock" type="submit">Log In</button>}
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Login
