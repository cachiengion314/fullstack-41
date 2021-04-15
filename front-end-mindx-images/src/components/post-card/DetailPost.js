import React from 'react'
import { Container, Row, Col, Image, InputGroup, FormControl, Button, Spinner } from 'react-bootstrap'
import Vars from '../../utility/Vars'
import { useParams } from "react-router-dom"
import { AuthContext } from "../../App"

const DetailPost = () => {
    const [postInfo, setPostInfo] = React.useState(null)
    const [commentInput, setCommentInput] = React.useState("")
    const [isPostCommentDone, setPostCommentDone] = React.useState(true)
    const { user } = React.useContext(AuthContext)

    const { id } = useParams()

    const handleFormControlChangle = (e) => {
        setCommentInput(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPostCommentDone(false)
        const succsess = await Vars.postComment(
            {
                "content": commentInput,
                "postId": postInfo._id,
                "createdBy": postInfo.createdBy._id
            }
        )
        if (succsess) {
            setCommentInput("")
            return
        }
        setPostCommentDone(false)
        console.log("Something went wrong!")
    }

    React.useEffect(() => {
        (async function () {
            await Vars.getAndSetPostInfo(setPostInfo, id)
            setPostCommentDone(true)
        })()
    }, [id, isPostCommentDone])

    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4} sm={12} xs={12} className="mb-3">
                    <Image
                        style={{ width: "100%" }}
                        src={((postInfo && postInfo.imageUrl)
                            || "https://image.flaticon.com/icons/png/512/183/183220.png")
                        }
                        rounded
                    />
                    <div>{"title: " + ((postInfo && postInfo.title) || "Empty...!")}</div>
                    <div>{"createdBy: " + ((postInfo && postInfo.createdBy.email) || "Empty...!")}</div>
                    <div>{"description: " + ((postInfo && postInfo.description) || "Empty...!")}</div>
                </Col>
                <Col md={8} sm={12} xs={12}>
                    <div className="comments-section mb-2">
                        {(
                            postInfo && postInfo.comments.length > 0 &&
                            postInfo.comments.map((elt, index) =>
                                <div key={index}>
                                    <span className="text-primary">{elt.createdBy.email + ": "}</span>
                                    <span className="text-secondary">{elt.content}</span></div>
                            )
                        )
                            || "Empty...!"
                        }
                    </div>
                    {
                        !isPostCommentDone &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    }
                    <form onSubmit={handleSubmit}>
                        {
                            ((user &&
                                <>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Comment your thought about this picture!"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            disabled={false}
                                            onChange={handleFormControlChangle}
                                            value={commentInput}
                                        />
                                        <InputGroup.Append>
                                            <Button disabled={false} variant="outline-secondary">Send</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </>
                            )
                                ||
                                <>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Comment your thought about this picture!"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            disabled={true}
                                            onChange={handleFormControlChangle}
                                            value={commentInput}
                                        />
                                        <InputGroup.Append>
                                            <Button disabled={true} variant="outline-secondary">Send</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </>
                            )
                        }
                    </form>

                </Col>
            </Row>
        </Container>
    )
}

export default DetailPost