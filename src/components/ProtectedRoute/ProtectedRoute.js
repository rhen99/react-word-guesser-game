import {Route, Redirect} from 'react-router-dom'
function ProtectedRoute(props) {
    if(localStorage.getItem('isAuthenticated')){
        return (
        <Route {...props}>
            {props.children}
        </Route>
        )
    }else{
        return <Redirect to="/login"/>
    }
}

export default ProtectedRoute
