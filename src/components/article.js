import React, {useEffect, useState} from "react";
import axios from "axios";
import {Col, Container, Image, Row} from "react-bootstrap";

export default function Article() {
    const [post, setPost] = useState([]);
    const getResult =  () => {
        const page =  axios.get('http://localhost:3001/ueber-mich');
        setPost(page.data);

    };
    useEffect(  () => {
        getResult();

    }, [setPost]);


    return (
        <div>
        </div>
    );
};

/*
*
*             {post.map((i, index) => {

                //const date = new Date(i.date_gmt);
                return (
                    <div key={index} className='article section'>
                        <div className='content-container' key={index}>
                            {i._embedded['wp:featuredmedia'] &&
                            <Container className="py-5" fluid="xl">
                                <Row className="modal-content-header justify-content-center">
                                    <Col lg={4} md={4} sm={8} xs={12} className="modal-content-thumbnail">
                                        <Image src={i._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url} fluid/>
                                    </Col>
                                    <Col lg={8} md={8} sm={8} xs={12} className="modal-content-text d-flex justify-content-center align-items-center">
                                        <h1>{i.title.rendered}</h1>
                                    </Col>
                                </Row>
                            </Container>
                            }
                            {i.content.rendered?<div className="modal-content-body">
                                <Container fluid="xl">
                                    <Row className='justify-content-center'>
                                        <Col xs={12} sm={10} lg={10}  dangerouslySetInnerHTML={ {__html: i.content.rendered} } />

                                    </Row>
                                </Container>
                            </div>: '' }

                        </div>

                    </div>
                )
            })}

*
* */
