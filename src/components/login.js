import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Nav, Navbar} from "react-bootstrap";
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import Axios from "axios";
import jQuery from "jquery";
import {Link, Redirect} from "react-router-dom";


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
export default function Login(){
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [message, setMessage] = useState('');
    const login = () => {
        Axios.post('http://localhost:3001/api/users/login' ,{
            username: username,
            password: password,
        }).then(res => {
            setMessage(res.data.msg)})
            .catch(function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    setMessage(error.response.data.msg);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }

            });
    };

    return (
        <div>
            <Container className="p-0" fluid>
            <Row className="section login-section m-0">
                <Col lg={6} sm={8}>
                    <h1 className="big">Login</h1>
                    {message &&
                        <Redirect to='/' /> }
                    <div id="login-form" className="form-label form-css-label">
                        <div className="form-group">
                            <fieldset>
                                <input type="text" className="form-control" name="username"  placeholder=" " required id="username" value={username} onChange={event => setUsername(event.target.value)} />
                                <label htmlFor="username">
                                    Username
                                </label>
                            </fieldset>
                        </div>
                        <div className="form-group">
                            <fieldset>
                                <input className="form-control" type="password" name="password" placeholder=" " required id="password" value={password} onChange={event => setPassword(event.target.value)} />
                                <label htmlFor="password">
                                    Password
                                </label>
                            </fieldset>

                        </div>
                        <div className="form-group">
                            <button type="submit" onClick={login} className="btn btn_secondary">Submit</button>
                            <Link className="btn btn_secondary mx-2" to='/sign-up'>Register</Link>

                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
        </div>
    )
}
