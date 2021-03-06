import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Button, Modal} from "react-bootstrap";
import Axios from "axios";

export default function CreatePost (props) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [created, setCreated] = useState(false);
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();

    const createPost = async () => {

        await Axios.post('http://localhost:3001/api/posts/create' ,{
            title: title,
            text: text,
            date: date
        }).then(res => {
            console.log(res)});
        props.getResult();
        setTitle('');
        setText('');
        console.log(date);
    };

    return (
        <div>
            <Button className="btn btn_secondary" onClick={() => setCreated(true)} ><i className="fas fa-plus"></i> Create Post</Button>
            <Modal
                show={created}
                onHide={() => {setCreated(false)}}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title>Create new post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="justify-content-center">
                        <Col xs={10} sm={10} lg={10} id="login-form" className="form-label form-css-label">
                            <div className="form-group">
                                <fieldset>
                                    <input type="text" className="form-control" name="title"  placeholder=" " required id="title" value={title} onChange={event => setTitle(event.target.value)} />
                                    <label htmlFor="title">
                                        Title
                                    </label>
                                </fieldset>
                            </div>
                            <div className="form-group">
                                <fieldset>
                                    <textarea className="form-control" name="text"  placeholder=" " required id="text" value={text} rows={5} onChange={event => setText(event.target.value)} />
                                    <label htmlFor="text">
                                        Text
                                    </label>
                                </fieldset>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Row className="justify-content-center">
                        <Col xs={10} sm={10} lg={10} id="login-form" className="form-label form-css-label text-center py-4">
                            <Button type="submit" className="btn mr-2" onClick={() => {setCreated(false); createPost(); }} >Submit</Button>
                            <Button type="button" className="btn btn-secondary" onClick={() => setCreated(false)}>Close</Button>
                        </Col>
                    </Row>


                </Modal.Footer>
            </Modal>
        </div>
    )

}