import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const useAuth = () => {

    const userStatus=useContext(AuthContext)
    return (
       userStatus
    );
};

export default useAuth;