import {
    Route, 
    // eslint-disable-next-line
    Redirect
} from 'react-router-dom'

import React from 'react'

const ProtectedRoute = ({ user, children, ...props }) => {
    return (
        <Route {...props}>
            {/* {(user && children) || <Redirect to="/login" />} */}
            {children}
        </Route>
    )
}

export default ProtectedRoute