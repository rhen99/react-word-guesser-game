import { Redirect, Route } from 'react-router-dom'
function GuestRoute(props) {
    if(!localStorage.getItem('isAuthenticated')){
        return (
        <Route {...props}>
            {props.children}
        </Route>
        )
    }else{
        return <Redirect to="/" exact/>
    }
}

export default GuestRoute
