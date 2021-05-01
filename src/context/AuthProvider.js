import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
export const AuthContext = createContext();
function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const signup = user => {
        return auth.createUserWithEmailAndPassword(user.email, user.password);
    }
    const login = user => {
        return auth.signInWithEmailAndPassword(user.email, user.password);
    }

    const value = {
        currentUser,
        signup,
        login
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setLoading(false);
            if(user){
                setCurrentUser(user)
                localStorage.setItem('isAuthenticated', true);
            }else{
                setCurrentUser(null);
                localStorage.removeItem('isAuthenticated');
            }
        });
        return unsubscribe;
    })
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
