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
export default function Register(){
    const [username, setUsername] = useState('');
    const [eMail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [registered, setRegistered] = useState(false);
    let history = useHistory();
    const register = () => {
        if(username && eMail && password && passwordRepeat) {
            Axios.post('http://localhost:3001/api/register' ,{
                username: username,
                email: eMail,
                password: password,
                password_repeat: passwordRepeat,
            }).then(res => {
                console.log(res)});
            setRegistered(true);
            setUsername('');
            setEmail('');
            setPassword('');
            setPasswordRepeat('');
        }

    };


    return (
        <div>
        <Container className="p-0" fluid>
            <Row className="section register-section m-0">
                <Col lg={6} sm={8}>
                    <h1 className="big">Register</h1>
                    <form id="login-form" className="form-label form-css-label">
                        <div className="form-group">
                            <fieldset>
                                <input type="username" className="form-control" name="username"  placeholder=" " required id="username" value={username} onChange={event => setUsername(event.target.value)} />
                                <label htmlFor="username">
                                    Username
                                </label>
                            </fieldset>
                        </div>
                        <div className="form-group">
                            <fieldset>
                                <input type="email" className="form-control" name="email"  placeholder=" " required id="email" value={eMail} onChange={event => setEmail(event.target.value)} />
                                <label htmlFor="email">
                                    Email address
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
                            <fieldset>
                                <input className="form-control" type="password" name="passwordRepeat" placeholder=" " required id="passwordRepeat" value={passwordRepeat} onChange={event => setPasswordRepeat(event.target.value)} />
                                <label htmlFor="passwordRepeat">
                                    Repeat Password
                                </label>
                            </fieldset>

                        </div>

                        <div className="form-group">
                            <button onClick={ (e) => {
                                register();
                            }} type="submit" className="btn">Submit</button>
                            <Link className="btn btn_secondary mx-2" to='/'>Login</Link>

                        </div>
                    </form>

                </Col>
            </Row>

        </Container>
            </div>
    )
}
