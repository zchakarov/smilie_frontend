import React, {useEffect, useState} from "react";
import {Col, Container, Image, Row, Button, Modal} from "react-bootstrap";
import dateFormat from 'dateformat';
import Axios from "axios";
import EditPost from "./editPost";
import DeletePost from "./deletePost";
export default function Post (props) {
    const [likes, setLikes] = useState('');
    const [liked, setLiked] = useState([]);
    const [userId, setUserId] = useState('67');
    const [edit, setEdit] = useState(false);
    const [show, setShow] = React.useState(false);
    const [postDeleted, setPostDeleted] = useState(false);
    const getLikes = async () => {
        const post_likes = await Axios.get(`http://localhost:3001/api/posts/likes/${props.post.id}`);
        setLikes(post_likes.data[0].count);

    };
    const isLiked = async () => {
        const post_liked = await Axios.get(`http://localhost:3001/api/posts/liked`,  { params:  {userId: userId, postId: props.post.id }
        });
        setLiked(post_liked.data);

    };
    const setLike = async () => {
        await Axios.post(`http://localhost:3001/api/posts/likes`, null, { params:  {userId: userId, postId: props.post.id }
        }).then(() => {
            getLikes();
            isLiked();

        }

    )
    };

    const removeLike = async () => {
        await Axios.delete(`http://localhost:3001/api/posts/removelike/${props.post.id}`,  { params:  {userId: userId }
        }).then(() => {
            getLikes();
            isLiked();
        }

    )
    };
    useEffect(  () => {

        getLikes();
        isLiked();
    }, []);

    return (
        <div>
            <h1 className="my-3">{props.post.title}</h1>
            <p className="my-3">{props.post.text}</p>
            <h4>Likes: {likes?likes:'0'}</h4>
            <h4>{dateFormat(props.post.createdAd, "mmmm dS, yyyy")}</h4>
            {liked.length == 0 ? <Button className="btn my-3 mr-3" onClick={
                () => setLike()
            }><i className="fas fa-heart"></i></Button>:
                <Button className="btn my-3 mr-3 liked" onClick={
                    () => removeLike()
                }><i className="fas fa-heart"></i></Button>
            }
            <Button className="btn my-3 mr-3" onClick={
                () => {
                    setEdit(true);
                    props.setPostId(props.post.id);
                }
            }><i className="fas fa-pen"></i></Button>
            <Button className="btn my-3 mr-3" onClick={
                () => {
                    setShow(true);
                    props.setPostId(props.post.id);
                }
            }><i className="fas fa-trash"></i></Button>
            <EditPost postId={props.postId} edit={edit} setEdit={setEdit} setPostDeleted={setPostDeleted} getResult={props.getResult} />
            <DeletePost postId={props.postId} show={show} setShow={setShow} setPostDeleted={setPostDeleted} getResult={props.getResult} />



        </div>
    )

}