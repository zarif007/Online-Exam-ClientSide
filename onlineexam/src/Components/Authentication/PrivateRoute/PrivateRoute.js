import React from 'react'
import { Redirect } from 'react-router';
import { Route } from 'react-router'
import useAuth from '../../../CustomHooks/useAuth'


const PrivateRoute = ({children, ...rest}) => {
    
    const {user, isLoading} = useAuth();

    if(isLoading){
        return(
            <div class=" flex justify-center items-center">
                <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    } 

    return (
        <Route
            {...rest}
            render={({ location }) =>
                user.email ?
                children : <Redirect
                    to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            ></Redirect>
        }
        ></Route>
    )
}

export default PrivateRoute
