import React from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import ImageUploading from 'react-images-uploading'
import "./create.css"
import storage from "../../components/firebase/Firebase"
import client from "../../api"
import { AuthContext } from "../../App"

const Create = () => {
    const { user } = React.useContext(AuthContext)
    const [images, setImages] = React.useState([])
    const [form, setForm] = React.useState(
        {
            title: "",
            description: ""
        })


    const handleForm = (e) => {
        const { value, name } = e.target
        // this.setState => merge state
        // hook setState => override
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const img = images[0]
        if (img && form.title) {
            const imageUrl = await uploadFile(img.file)
            try {
                const res = await client({
                    url: "/api/posts",
                    method: "POST",
                    data: {
                        "description": form.description,
                        "title": form.title,
                        "imageUrl": imageUrl,
                        "createdBy": user._id
                    }
                })
                console.log(`res`, res)
                const doc = res.data
                if (doc.success) {
                    alert("success")
                    setForm({
                        title: "",
                        description: ""
                    })
                }
            } catch (err) {
                console.log(`err`, err)
            }
        }
    }

    const onChangeImage = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    }

    const uploadFile = (file) => {
        return new Promise((resolve, reject) => {
            const uploadTask = storage.ref().child(file.name).put(file)
            // add progress bar when uploading
            const onProgress = () => { }
            const onError = (err) => {
                return reject(err)
            }
            const onSuccess = () => {
                uploadTask
                    .snapshot
                    .ref
                    .getDownloadURL()
                    .then((downloadUrl) => resolve(downloadUrl))
            }

            uploadTask.on(`stage_changed`, onProgress, onError, onSuccess)
        })
    }

    const hiddenButton = images.length > 0
    const classHidden_UploadButton = hiddenButton ? "hidden" : ""

    React.useEffect(() => { console.log(`user`, user) })

    return (
        <Container className={"mt-3"}>
            <Row>
                <Col md={4} sm={12} xs={12} className="mb-3">
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={onChangeImage}
                        maxNumber={1}
                        dataURLKey="data_url"
                    >
                        {
                            ({
                                imageList,
                                onImageUpload,
                                onImageUpdate,
                                onImageRemove
                            }) => {
                                return (
                                    <div className="">
                                        <Button onClick={onImageUpload} className={classHidden_UploadButton}>
                                            Upload Image
                                        </Button>
                                        <div className="image-placeholder">
                                            {
                                                imageList.map((image, index) => {
                                                    return (
                                                        <div key={index} className="image-item">
                                                            <div className="image-wrapper" onClick={onImageUpdate}>
                                                                <img src={image.data_url} alt="" width="100" />
                                                            </div>
                                                            <span
                                                                style={
                                                                    {
                                                                        cursor: "pointer", width: "30px",
                                                                        height: "30px", backgroundColor: "red",
                                                                        display: "inline-block"
                                                                    }}
                                                                onClick={onImageRemove}
                                                                className="remove-btn text-white text-center"
                                                            >
                                                                X
                                                            </span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        }
                    </ImageUploading>
                </Col>
                <Col md={8} sm={12} xs={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title"
                                name="title"
                                value={form.title}
                                onChange={handleForm}
                            />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Example textarea</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                name="description"
                                value={form.description}
                                onChange={handleForm}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default Create