import './EditHandle.css';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { db } from '../../firebase'
function EditHandle() {
    
    const { userData, updateUserData, currentUser } = useContext(AuthContext);
    const [handle, setHandle] = useState('');
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        setSuccess('');
        setError('');
        e.preventDefault();
        db.collection('users')
        .where('handleName', '==', handle).get()
        .then(qss => {
            if(qss.docs.length > 0){
                setError('This username is already taken.');
            }else{
                updateUserData(currentUser.email, 'handleName', handle)
                setSuccess('Updated Successfully!!!');
                setHandle('');
            }
        })
        .catch(err => console.log(err.message))
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="FormInline">
                <input type="text" onChange={(e) => setHandle(e.target.value)} className="FormInput" placeholder={`Handle: ${userData && userData.handleName}`} value={handle}/>
                
                <button className="Btn">Update</button>
                
            </div>
        </form>
        {success && (
                    <p className="HandleSuccess">{success}</p>
                )}
                {error && (
                    <p className="HandleError">{error}</p>
                )}
        </div>
    )
}

export default EditHandle
