import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
export const AuthContext = createContext();
function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [standings, setStandings] = useState();
    
    const signup = user => auth.createUserWithEmailAndPassword(user.email, user.password);
    const login = user => auth.signInWithEmailAndPassword(user.email, user.password);

    const logout = () => auth.signOut();

    const getUserData = (email) => {
        const docRef = db.collection('users').doc(email);

        docRef.get()
        .then((doc) => {
            if(doc.exists){
                setUserData(doc.data());
            }else{
                console.log('This document does not exists.');
            }
        })
        .catch(err => console.log(err.message));
    }

    const updateUserData = (identifier ,fieldName, fieldValue) => {
        const docRef = db.collection('users').doc(identifier)
        
        docRef.get()
        .then(doc => {
            if(doc.exists){
                docRef.update({
                    [fieldName]: fieldValue
                });
                return 'Handle Updated!!!'
            }else{
                console.log('Document does not exist.');
            }
        })
        .catch(err => console.log(err.message));
    }
    const getStandings = () => {
        let users = [];
        db.collection('users').orderBy('highscore', 'desc').get()
        .then((qss) => {
            qss.forEach((doc) => {
                const data = {
                    handleName: doc.data().handleName,
                    highscore: doc.data().highscore

                }
                users.push(data);
            })
            setStandings(users);
        })
        .catch(err => console.log(err.message))
    }
    const value = {
        currentUser,
        signup,
        login,
        logout,
        userData,
        updateUserData,
        standings,
        getStandings
    };
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if(user){
                setCurrentUser(user)
                localStorage.setItem('isAuthenticated', user.refreshToken);
                getUserData(user.email);
                getStandings();
            }else{
                setCurrentUser(null);
                localStorage.removeItem('isAuthenticated');
                setUserData(null);
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
