import { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
export const AuthContext = createContext();
function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    
    const signup = user => auth.createUserWithEmailAndPassword(user.email, user.password);
    const login = user => auth.signInWithEmailAndPassword(user.email, user.password);

    const logout = () => auth.signOut();

    const value = {
        currentUser,
        signup,
        login,
        logout
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                setCurrentUser(user)
                localStorage.setItem('isAuthenticated', user.refreshToken);
            }else{
                setCurrentUser(null);
                localStorage.removeItem('isAuthenticated');
            }
        });
        return unsubscribe;
    }, [])
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
