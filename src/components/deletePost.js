import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Button, Modal} from "react-bootstrap";
import Axios from "axios";
import {Redirect} from "react-router-dom";

export default function DeletePost (props) {
    const [postDelete, setPostDelete] = useState(false);
    const deleteArticle = async () => {
        await Axios.delete(`http://localhost:3001/api/posts/delete/${props.postId}`)
            .then(function (response) {
                setPostDelete(false);


            })
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={() => {props.setShow(false)}}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton={false}>
                    <Modal.Title>Are you sure</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="justify-content-center">
                    <Button type="button" className="btn" onClick={
                        () => {
                            props.setShow(false);
                            props.setPostDeleted(true);

                            deleteArticle();
                            props.getResult();

                        }} >Yes</Button>
                    <Button type="button" className="btn btn-secondary" onClick={() => props.setShow(false)}>No</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}