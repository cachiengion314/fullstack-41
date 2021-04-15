import React from 'react'
import { Card } from "react-bootstrap"
import './postcard.css'
import { useHistory } from "react-router-dom"

function PostCard({ id, title, imageUrl, description, createdBy, className }) {
    const histtory = useHistory()

    const handleImgClick = () => {
        histtory.push(`/posts/${id}`)
    }

    return (
        <Card id={id}>
            <Card.Img style={{ cursor: "pointer" }} onClick={handleImgClick} variant="top" src={`${imageUrl}`} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    {createdBy}
                </small>
            </Card.Footer>
        </Card>
    )
}

export default PostCard