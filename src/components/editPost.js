import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Button, Modal} from "react-bootstrap";
import Axios from "axios";

export default function EditPost (props) {


    const [siglePost, setSinglePost] = useState([]);

    const [titleEdit, setTitleEdit] = useState('');
    const [textEdit, setTextEdit] = useState('');
    const getPostData = async () => {
        const postData = await Axios.get(`http://localhost:3001/api/posts/singlepost/${props.postId}`);
        setSinglePost(postData.data[0]);
        setTitleEdit(postData.data[0].title);
        setTextEdit(postData.data[0].text);
    }

    useEffect(  () => {
        getPostData();
    }, [props.setPostDeleted]);

    const [created, setCreated] = useState(false);
    var myCurrentDate = new Date();
    var date = myCurrentDate.getFullYear() + '-' + (myCurrentDate.getMonth()+1) + '-' + myCurrentDate.getDate();

    const editPost = async () => {
        props.getResult();

        await Axios.post(`http://localhost:3001/api/posts/edit/${props.postId}` ,{
            title: titleEdit,
            text: textEdit,
            date: date
        }).then(res => {
            console.log(res)
        });


        console.log(date);
    };

    return (
        <div>
            <Modal
                show={props.edit}
                onHide={() => {props.setEdit(false)}}
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
                                    <input type="text" className="form-control" name="titleEdit"  placeholder=" " required id="titleEdit" value={titleEdit} onChange={event => setTitleEdit(event.target.value)} />
                                    <label htmlFor="titleEdit">
                                        Title
                                    </label>
                                </fieldset>
                            </div>
                            <div className="form-group">
                                <fieldset>
                                    <textarea className="form-control" name="textEdit"  placeholder=" " required id="textEdit" value={textEdit} rows={5} onChange={event => setTextEdit(event.target.value)} />
                                    <label htmlFor="textEdit">
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
                            <Button type="submit" className="btn mr-2" onClick={() => {
                                props.setEdit(false);
                                editPost();
                            }} >Submit</Button>
                            <Button type="button" className="btn btn-secondary" onClick={() => props.setEdit(false)}>Close</Button>
                        </Col>
                    </Row>


                </Modal.Footer>
            </Modal>
        </div>
    )

}