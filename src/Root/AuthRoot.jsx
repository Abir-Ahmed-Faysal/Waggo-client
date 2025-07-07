import React from 'react';
import { Outlet } from 'react-router';

const AuthRoot = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthRoot;