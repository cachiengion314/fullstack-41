import React from 'react'
import { Card } from "react-bootstrap"
import './postcard.css'

function PostCard({ title, imageUrl, description, createdBy, className }) {
    return (
        <Card>
            <Card.Img variant="top" src={`${imageUrl}`} />
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