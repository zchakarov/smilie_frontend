import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Button, Modal} from "react-bootstrap";
import Axios from "axios";

import Post from "./post";
import CreatePost from "./createPost";
import DeletePost from "./deletePost";
import EditPost from "./editPost";
export default function Home() {
    const [posts, setPosts] = useState([]);
    const [postId, setPostId] = useState('');



    const getResult = async () => {
        const posts_list = await Axios.get('http://localhost:3001/api/posts/list');
        setPosts(posts_list.data);
    };

    useEffect(  () => {
        getResult();
    }, []);

    return (
        <div>
            <Container className="m-0 p-0 " fluid>
                <Row className="section flex-column align-items-center justify-content-start m-0 pt-5">
                    <CreatePost getResult={getResult}/>
                    {posts.map((post, index) => {
                        return (
                            <Col xs={8} sm={8} md={5} lg={5} className='post my-5' key={index}>
                                <Post post={post} postId={posts[index].id} getResult={getResult} setPostId={setPostId}/>

                            </Col>


                    )
                    })}
                </Row>

            </Container>

        </div>
    );
};
