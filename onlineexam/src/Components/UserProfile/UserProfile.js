import React from 'react'
import useAuth from './../../CustomHooks/useAuth';

const UserProfile = () => {

    const { user } = useAuth();

    return (
        <>
            {user.uid}
        </>
    )
}

export default UserProfile
