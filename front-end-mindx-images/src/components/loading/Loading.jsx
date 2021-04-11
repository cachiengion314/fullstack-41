import React from 'react'
import { Spinner } from 'react-bootstrap'
import "./loading.css"

const Loading = ({ className }) => {
    return (
        <div className={className + " loading"}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default Loading