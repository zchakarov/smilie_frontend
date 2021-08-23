import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Nav, Navbar} from "react-bootstrap";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Axios from "axios";
import jQuery from "jquery";
import {Link, Redirect, useHistory} from "react-router-dom";
const options = {
    buttons: {
        backgroundColor: 'rgba(30,30,36,0)',
        iconColor: 'deeppink',
        iconPadding: '10px',
        showAutoplayButton: false,
        showCloseButton: true,
        showDownloadButton: false,
        showFullscreenButton: false,
        showNextButton: true,
        showPrevButton: true,
        showThumbnailsButton: false,
        size: '40px'
    },
    settings: {
        autoplaySpeed: 3000,
        boxShadow: 'none',
        disableKeyboardControls: false,
        disablePanzoom: false,
        disableWheelControls: false,
        hideControlsAfter: 3000,
        lightboxTransitionSpeed: 0.3,
        lightboxTransitionTimingFunction: 'linear',
        overlayColor: 'rgba(30, 30, 30, 0.9)',
        slideAnimationType: 'fade',
        slideSpringValues: [300, 50],
        slideTransitionSpeed: 0.6,
        slideTransitionTimingFunction: 'linear',
        usingPreact: false
    },
    thumbnails: {
        thumbnailsSize: ["90px", "90px"],
        thumbnailsOpacity: 0.4
    },
    caption: {
        captionColor: "rgba(241, 191, 152, 1)"
    },
    progressBar: {
        size: "4px",
        backgroundColor: "rgba(255, 237, 225, 1)",
        fillColor: "#AF9AB2"
    }
}
export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    let history = useHistory();
    const createPost = () => {
        Axios.post('http://localhost:3001/api/createpost' ,{
            author_id: '1',
            title: title,
            text: text,
        }).then(res => {
            console.log(res)});

    };


    return (
        <div>
        <Container className="p-0" fluid>
            <Row className="section register-section m-0">
                <Col lg={6} sm={8}>
                    <h1 className="big">Create new post</h1>
                    <form id="login-form" className="form-label form-css-label">
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

                        <div className="form-group">
                            <button onClick={ (e) => {
                                createPost();
                            }} type="submit" className="btn">Submit</button>
                        </div>
                    </form>

                </Col>
            </Row>

        </Container>
            </div>
    )
}
